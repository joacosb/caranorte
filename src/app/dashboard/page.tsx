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

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  submitted: 'Entregado',
  approved: 'Aprobado',
  rejected: 'Rechazado',
}

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-zinc-700 text-zinc-300',
  submitted: 'bg-blue-800/60 text-blue-200',
  approved:  'bg-emerald-800/60 text-emerald-200',
  rejected:  'bg-red-800/60 text-red-200',
}

export default function DashboardPage() {
  const [client, setClient] = useState<Client | null>(null)
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setEmail(user.email ?? '')

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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-cyan-300 animate-pulse">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-white">CaraNorte SAS</p>
            <p className="text-xs text-cyan-300">Panel de cliente</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-zinc-400 sm:block">{email}</span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
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
              <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">Cliente activo</p>
              <h1 className="mt-1 text-3xl font-bold text-white">{client.name}</h1>
              {client.description && <p className="mt-1 text-zinc-400">{client.description}</p>}
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
              <p className="text-zinc-400">Tu usuario no está vinculado a ningún cliente aún. Contactá al equipo de CaraNorte.</p>
            </div>
          )}
        </section>

        {/* Épicas */}
        {([1, 2, 3, 4] as const).map(epic => (
          <section key={epic}>
            <h2 className="text-lg font-bold text-cyan-200 border-b border-zinc-800 pb-2 mb-4">
              {EPIC_NAMES[epic]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deliveriesByEpic[epic].map(delivery => {
                const sub = submissionByDelivery[delivery.id]
                const status = sub?.status ?? 'pending'
                return (
                  <div
                    key={delivery.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-zinc-500 shrink-0">
                        {String(delivery.number).padStart(2, '0')}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[status]}`}>
                        {STATUS_LABELS[status]}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white leading-snug">{delivery.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{delivery.expected_result}</p>
                    {sub?.submitted_at && (
                      <p className="text-xs text-zinc-500">
                        Entregado: {new Date(sub.submitted_at).toLocaleDateString('es-AR')}
                      </p>
                    )}
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
