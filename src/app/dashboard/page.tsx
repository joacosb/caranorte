'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Delivery = {
  id: string
  number: number
  title: string
  epic: number
  expected_result: string
  template_path: string | null
  due_date: string | null
}

type Submission = {
  delivery_id: string
  status: 'pending' | 'submitted' | 'approved' | 'rejected'
  file_url: string | null
  notes: string | null
  submitted_at: string | null
}

type Client = {
  id: string
  name: string
  slug: string
  description: string | null
}

const EPIC_NAMES: Record<number, string> = {
  1: 'Épica 1 — Diagnóstico y Arquitectura Origen',
  2: 'Épica 2 — Innovación y Arquitectura Destino',
  3: 'Épica 3 — Planificación y Factibilidad',
  4: 'Épica 4 — Evaluación y Cierre',
}

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-forest/10 text-forest',
  submitted: 'bg-blue-100 text-blue-700',
  approved:  'bg-emerald-100 text-emerald-700',
  rejected:  'bg-red-100 text-red-700',
}

const TEMPLATES_URL = 'https://economicasuba-my.sharepoint.com/:f:/g/personal/29id33012909_campus_economicas_uba_ar/IgBf9lLv958yTI9Lfd7c0oHXAQKp3gnDEhEHOOaxYv6L1mc?e=7rcrOY'

function DeadlineBadge({ dueDate, status }: { dueDate: string | null; status: string }) {
  if (!dueDate) return null

  const isDelivered = status === 'submitted' || status === 'approved'
  if (isDelivered) {
    return <span className="text-xs text-emerald-600 font-medium">✓ Entregado</span>
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate + 'T00:00:00')
  const diffDays = Math.round((due.getTime() - today.getTime()) / 86400000)

  if (diffDays < 0) {
    return <span className="text-xs text-red-600 font-medium">Vencido</span>
  }
  if (diffDays === 0) {
    return <span className="text-xs text-gold-dark font-medium">Vence hoy</span>
  }
  return (
    <span className="text-xs text-muted">
      {diffDays} {diffDays === 1 ? 'día' : 'días'} restantes
    </span>
  )
}

export default function DashboardPage() {
  const [client, setClient] = useState<Client | null>(null)
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [empresaNombre, setEmpresaNombre] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setEmail(user.email ?? '')
      const empresaGuardada = localStorage.getItem('empresa')
      if (empresaGuardada) setEmpresaNombre(empresaGuardada)

      // Cliente activo: Kodek (visible para todo el equipo y profesores)
      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('slug', 'kodek')
        .single()

      if (clientData) setClient(clientData)

      // Las 12 entregas fijas
      const { data: deliveriesData } = await supabase
        .from('deliveries')
        .select('*')
        .order('number')
      setDeliveries(deliveriesData ?? [])

      // Submissions del cliente
      if (clientData) {
        const { data: subsData } = await supabase
          .from('submissions')
          .select('delivery_id, status, file_url, notes, submitted_at')
          .eq('client_id', clientData.id)
        setSubmissions(subsData ?? [])
      }

      setLoading(false)
    }
    load()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const submissionByDelivery = useMemo(() => {
    const map: Record<string, Submission> = {}
    submissions.forEach(s => { map[s.delivery_id] = s })
    return map
  }, [submissions])

  const deliveriesByEpic = useMemo(() => {
    const map: Record<number, Delivery[]> = { 1: [], 2: [], 3: [], 4: [] }
    deliveries.forEach(d => { map[d.epic]?.push(d) })
    return map
  }, [deliveries])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-forest animate-pulse">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Header */}
      <header className="border-b border-forest-dark/40 bg-forest px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="text-left cursor-pointer"
  >
    <p className="text-xl font-extrabold tracking-tight text-cream">Cara<span className="text-gold">Norte</span></p>
    <p className="text-xs text-cream/70">Panel de cliente</p>
  </button>
          <div className="flex items-center gap-4">
            {empresaNombre && (
              <span className="hidden text-sm text-gold sm:block">{empresaNombre}</span>
            )}
            <span className="hidden text-sm text-cream/70 sm:block">{email}</span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-cream/40 px-3 py-1.5 text-sm text-cream/90 transition hover:border-gold hover:text-gold"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-10">
        {/* Cliente */}
        <section>
          {client ? (
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold">Cliente activo</p>
              <h1 className="mt-1 text-3xl font-bold text-forest">{client.name}</h1>
              {client.description && <p className="mt-1 text-muted">{client.description}</p>}
            </div>
          ) : (
            <div className="rounded-xl border border-forest/15 bg-white p-6">
              <p className="text-muted">No se encontró el cliente. Verificá que el schema de Supabase esté aplicado.</p>
            </div>
          )}
        </section>

        {/* Épicas */}
        {([1, 2, 3, 4] as const).map(epic => (
          <section key={epic}>
            <h2 className="text-lg font-bold text-forest border-b border-forest/20 pb-2 mb-4">
              {EPIC_NAMES[epic]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deliveriesByEpic[epic].map(delivery => {
                const sub = submissionByDelivery[delivery.id]
                const status = sub?.status ?? 'pending'
                const templateUrl = TEMPLATES_URL

                const card = (
                  <div className={`rounded-2xl border bg-white p-5 flex flex-col gap-3 h-full transition-all duration-200 ${
                    templateUrl
                      ? 'border-forest/15 hover:border-gold hover:shadow-lg cursor-pointer'
                      : 'border-forest/15'
                  }`}>
                    {/* Número + estado */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-muted">
                        {String(delivery.number).padStart(2, '0')}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[status]}`}>
                        {status === 'pending' ? 'Pendiente'
                          : status === 'submitted' ? 'Entregado'
                          : status === 'approved' ? 'Aprobado'
                          : 'Rechazado'}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="font-semibold text-forest leading-snug">{delivery.title}</h3>

                    {/* Resultado esperado */}
                    <p className="text-xs text-muted leading-relaxed flex-1">{delivery.expected_result}</p>

                    {/* Footer: fecha + días */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-forest/10">
                      {delivery.due_date && (
                        <span className="text-xs text-muted">
                          {new Date(delivery.due_date + 'T00:00:00').toLocaleDateString('es-AR', {
                            day: '2-digit', month: '2-digit', year: 'numeric'
                          })}
                        </span>
                      )}
                      <DeadlineBadge dueDate={delivery.due_date} status={status} />
                    </div>

                    {/* Link hint */}
                    {templateUrl && (
                      <p className="text-xs text-gold-dark group-hover:text-gold">
                        Ver template →
                      </p>
                    )}
                  </div>
                )

                return templateUrl ? (
                  <a
                    key={delivery.id}
                    href={templateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col"
                  >
                    {card}
                  </a>
                ) : (
                  <div key={delivery.id} className="flex flex-col">
                    {card}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
