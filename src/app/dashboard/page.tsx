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

// Links de Drive por entregable (uno o más archivos por entrega)
const TEMPLATE_LINKS: Record<number, { label: string; url: string }[]> = {
  1: [
    { label: 'Ver template (Word)', url: 'https://drive.google.com/file/d/1q8vTac7gpQotI8-dI-D8YsXIbJmZUHRA/view' },
    { label: 'Ver template (PDF)', url: 'https://drive.google.com/file/d/1_SWGHuKXWyvcNVFtPRVvFVT-V36pfGrJ/view' },
  ],
  2: [{ label: 'Ver template →', url: 'https://drive.google.com/file/d/1H0kqxDLkD6FjJIi7Yc9Rlav155FtpBli/view' }],
  3: [{ label: 'Ver template →', url: 'https://drive.google.com/file/d/1pnbL0jbBNlT8BJJiO8_B53rUKESk4pwG/view' }],
  4: [{ label: 'Ver template →', url: 'https://drive.google.com/file/d/1J6Lw8bSkjiWqw8yp7TDPtxeOVRLIPR_s/view' }],
  5: [
    { label: 'Ver template (Word)', url: 'https://drive.google.com/file/d/1U8wlvDndxy9aSsLwEQ7HAk6Eza6N7WwT/view' },
    { label: 'Ver template (PNG)', url: 'https://drive.google.com/file/d/1D4K8R131H83eBuKXRX3GNda5xfNKM14U/view' },
  ],
  6: [
    { label: 'Ver template (Word)', url: 'https://drive.google.com/file/d/1CMtgpPHMyOO-sdg2zdkZVkWV9uyD29A5/view' },
    { label: 'Ver template (Excel)', url: 'https://drive.google.com/file/d/1C_VSgxqj9wArtktDCnKxoi3tgyJecNyM/view' },
  ],
  7: [
    { label: 'Ver template (Word)', url: 'https://drive.google.com/file/d/1UVS_BWJgsmDgTRCsftc6TDdG-SJAzuaD/view' },
    { label: 'Ver template (Gantt)', url: 'https://drive.google.com/file/d/1tOs5rduqIUdNVWRLaxeEp8VtHl4UQ92J/view' },
  ],
  8: [{ label: 'Ver template →', url: 'https://drive.google.com/file/d/1RqL2u_8_R52FcgRwIxzYLRNqxkzSLqIJ/view' }],
  9: [
    { label: 'Ver template (Word)', url: 'https://drive.google.com/file/d/1zstOgKiEfltZ4Bfk7fvIwtTFiK0EpeG5/view' },
    { label: 'Ver template (Excel)', url: 'https://drive.google.com/file/d/1kN9rg8Fv73RuH9Clo7kWfU9T4ZT6DI2B/view' },
  ],
  10: [{ label: 'Ver template (Word v2)', url: 'https://drive.google.com/file/d/1rRse2n8hcejsv97RVSSy5CJfKSKaQ2rn/view' }],
  11: [{ label: 'Ver template →', url: 'https://drive.google.com/file/d/1b8qzExtKN25JRFIuZkPIDalwJng9J916/view' }],
  12: [{ label: 'Ver template →', url: 'https://drive.google.com/file/d/1LHu0B4zsV4kcmn7IN8cjrUaoyyAmdc22/view' }],
}

// Descripción del contenido de cada entregable (subtítulo de la card)
const DELIVERY_DESC: Record<number, string> = {
  1: "Perfil de Nodek Energía: industria, facturación, equipo, identidad organizacional y diagnóstico inicial de oportunidades de mejora.",
  2: "Relevamiento de procesos, requerimientos por área y evaluación del nivel de madurez organizacional y tecnológica de Nodek.",
  3: "Mapa de procesos, aplicaciones y flujos de información actuales de Nodek: situación as-is en sus cuatro dimensiones TOGAF.",
  4: "Propuesta de sistema de IA generativa y predictiva para automatizar la detección y preparación de licitaciones.",
  5: "Estado to-be de Nodek: procesos mejorados, arquitectura de datos centralizada, stack SaaS y plan de transición incremental.",
  6: "Comparación entre arquitectura origen y destino: brechas por dimensión, escenarios de implementación y priorización.",
  7: "WBS, Gantt, matriz de stakeholders y radar chart que delimitan el alcance, cronograma y actores clave del proyecto.",
  8: "RFI de cuatro proveedores ERP (SAP, Odoo, Tango, Xubio) y selección de Odoo Enterprise y Tango Nube como finalistas.",
  9: "Matriz RFP con 4 dimensiones ponderadas (Funcional 40%, Técnico 25%, Económico 20%, Proveedor 15%) aplicada a los dos finalistas.",
  10: "Análisis de CAPEX/OPEX y CTP a 3 años: Odoo (~USD 9.946) vs. Tango Nube (~USD 21.060). ROI proyectado de Fase 1 y Fase 2.",
  11: "Gap analysis de Odoo Enterprise (93,8/100): brechas de cobertura, plan de acción correctivo y valoración del proveedor seleccionado.",
  12: "Presentación final, resumen ejecutivo y archivo interactivo del proyecto para Nodek Energía.",
}

// Resumen ampliado de cada entregable (modal "Ver detalle"), 2 párrafos
const DELIVERY_DETAIL: Record<number, string[]> = {
  1: [
    "Nodek Energía es una PyME argentina de 10 empleados con 5 años en el mercado, especializada en energía solar, movilidad eléctrica e ingeniería eléctrica. Su facturación ronda el millón de dólares anuales y opera principalmente en el segmento B2B con soluciones llave en mano.",
    "El equipo de CaraNorte identificó cuatro oportunidades de mejora: automatización de licitaciones, CRM con seguimiento de leads, herramienta de selección de personal, y mejora del seguimiento post-venta. Estas problemáticas sentaron las bases del proyecto de transformación digital.",
  ],
  2: [
    "El relevamiento detectó que Nodek opera con herramientas desconectadas (Trello, WhatsApp, Gmail, Excel, ACONPY) sin integración entre sí. El nivel de madurez CMM se evaluó en transición entre Nivel 1 y Nivel 2: procesos parcialmente documentados y dependencia de conocimiento individual en roles clave.",
    "Las principales brechas identificadas fueron: falta de trazabilidad en la gestión comercial, ausencia de visibilidad en tiempo real de proyectos, gestión de compras sin órdenes formales y concentración de decisiones en el director técnico.",
  ],
  3: [
    "El mapa de procesos actual (as-is) cubre tres capas: procesos estratégicos (planificación, desarrollo comercial), procesos operativos (relevamiento, diseño, instalación, puesta en marcha, mantenimiento) y procesos de apoyo (compras, administración, RRHH, logística). Las aplicaciones en uso incluyen Google Workspace, Trello, WhatsApp, ACONPY, Modhub y FusionSolar/Huawei.",
    "La arquitectura de TI origen está fragmentada: sin servidor central, sin base de datos unificada y con datos críticos dispersos en planillas y chats. Esta situación impide la trazabilidad end-to-end y limita la escalabilidad operativa.",
  ],
  4: [
    "La propuesta de innovación consiste en un sistema de IA en dos capas: IA generativa (GPT/RAG) para analizar pliegos y generar borradores de propuestas técnicas, e IA predictiva para identificar licitaciones relevantes y estimar probabilidades de adjudicación. El marco utilizado fue Doblin's 10 Types of Innovation, posicionando la solución como innovación de proceso y de producto.",
    "Se proyecta que el sistema permitirá a Nodek pasar de 3-5 licitaciones mensuales a 10-15, reduciendo el tiempo de elaboración por propuesta entre un 50% y 70%, con referencias de mercado en iLicitaciones y Komorebi AI.",
  ],
  5: [
    "La arquitectura destino (to-be) propone centralizar la operación en un ERP SaaS modular que integre CRM, gestión de proyectos, compras, contabilidad con localización argentina y portal de clientes. Los procesos mejorados incluyen gestión comercial con pipeline estructurado, armado de licitaciones asistido por IA y seguimiento de instalaciones con dashboards en tiempo real.",
    "La infraestructura elimina los servidores on-premise y adopta un modelo 100% cloud, compatible con la ausencia de área IT interna en Nodek. La transición se planifica en dos fases: Fase 1 (ERP) y Fase 2 (sistema de IA para licitaciones).",
  ],
  6: [
    "La matriz de brechas compara la arquitectura origen y destino en cuatro dimensiones TOGAF: negocio, datos, aplicaciones y tecnología. Las brechas críticas identificadas son: gestión comercial sin CRM, proyectos sin visibilidad integrada, compras sin órdenes formales y ausencia de dashboards ejecutivos.",
    "Se evaluaron tres escenarios de implementación (conservador, moderado y ambicioso) y se seleccionó el escenario moderado: implementación del ERP en Fase 1 con integración de FusionSolar, dejando el sistema de IA para Fase 2.",
  ],
  7: [
    "El alcance define la implementación del ERP (Fase 1) como objeto del proyecto, excluyendo explícitamente el sistema de IA para licitaciones (Fase 2). El WBS estructura el trabajo en 11 bloques desde el relevamiento inicial hasta el cierre. El Gantt proyecta 12 semanas de ejecución con hitos por sprint.",
    "La matriz de stakeholders identifica como actores clave al director técnico-comercial (sponsor), el responsable de proyectos y el equipo de administración. El gráfico araña evidencia las dimensiones de mayor brecha: gestión de proyectos y CRM.",
  ],
  8: [
    "Se relevaron cuatro soluciones ERP: SAP S/4HANA (descartado por costo y complejidad para una PyME de 10 personas), Xubio (descartado por alcance exclusivamente contable), Tango Nube y Odoo Enterprise. Los dos finalistas fueron seleccionados por su cobertura funcional, adecuación al mercado argentino y viabilidad económica para el perfil de Nodek.",
    "El RFI reveló que Odoo supera a Tango en CRM estructurado, portal de clientes y capacidad de integración vía API REST, mientras que Tango tiene mayor arraigo local en el segmento contable y de compras.",
  ],
  9: [
    "La Matriz RFP evalúa a los dos finalistas en cuatro dimensiones ponderadas: Funcional (40%), Técnico (25%), Económico (20%) y Proveedor (15%). Cada dimensión se desagrega en categorías y subcategorías con justificación del ponderador y escala de cumplimiento del 0 al 4.",
    "Odoo Enterprise obtuvo 93,8/100 frente a 52,9/100 de Tango Nube. La mayor diferencia se registró en el aspecto Funcional (40/40 vs. 14/40), donde Odoo cubre CRM, Proyectos, Compras, Inventario, Contabilidad y Portal de clientes de forma nativa.",
  ],
  10: [
    "El análisis de CTP a 3 años muestra que Odoo Enterprise (~USD 9.946) representa un ahorro del 53% frente a Tango Nube (~USD 21.060). La diferencia principal es el licenciamiento: USD 1.962/año (Odoo, 15 usuarios) vs. USD 6.000/año (Tango, 5 usuarios concurrentes). El mayor costo de implementación de Odoo se recupera desde el primer año completo de operación.",
    "El ROI proyectado de Fase 1 contempla ahorro en horas administrativas, reducción de errores por datos duplicados y mejora en conversión comercial. La Fase 2 (IA) proyecta un incremento de licitaciones presentadas de 3-5 a 10-15 por mes, con reducción del 50-70% en el tiempo de elaboración de propuestas.",
  ],
  11: [
    "El análisis de brechas de Odoo Enterprise identificó tres gaps menores: integración con FusionSolar/Modhub (resuelta con desarrollo one-time de USD 1.500), preparación de API para la Fase 2 de IA (incluida en el presupuesto del partner) y curva de adopción del equipo (mitigada con capacitación incluida en la propuesta de Adhoc SRL).",
    "La valoración del proveedor seleccionado (Adhoc SRL, Gold Partner de Odoo) destacó su experiencia en PyMEs de servicios en Argentina y la estructura de soporte post-implementación, factores críticos dado que Nodek no cuenta con área IT interna.",
  ],
  12: [
    "El cierre del proyecto integra tres entregables: presentación final (20 minutos), resumen ejecutivo (máx. 5 páginas) y archivo interactivo del proyecto en formato web. La presentación final recorre las 8 secciones de la agenda: consultora, caso, diagnóstico, arquitectura, RFI, RFP, evaluación económica y conclusiones.",
    "La recomendación final del equipo CaraNorte es la adopción de Odoo Enterprise implementado por Adhoc SRL como ERP de Fase 1, con hoja de ruta hacia el sistema de IA para licitaciones en Fase 2, proyectado como el mayor diferenciador competitivo de Nodek en el mediano plazo.",
  ],
}

// Badge de estado (único, esquina superior derecha de cada card).
// "Entregado" y "Vencido" no se muestran (devuelven null).
function statusBadge(status: string): { label: string; className: string } | null {
  if (status === 'submitted' || status === 'approved') return null
  if (status === 'rejected') {
    return { label: 'Rechazado', className: 'bg-red-100 text-red-600' }
  }
  return { label: 'Pendiente', className: 'bg-cream text-forest border border-forest/30' }
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
  const [modalDelivery, setModalDelivery] = useState<Delivery | null>(null)

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

  // Cerrar el modal con la tecla Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalDelivery(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
      {/* Navbar (mismo estilo que la landing) */}
      <header className="sticky top-0 z-50 border-b border-forest-dark/40 bg-forest/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer text-left"
          >
            <p className="text-2xl font-extrabold tracking-tight text-cream">Cara<span className="text-gold">Norte</span></p>
            <p className="text-xs text-cream/60">Panel de cliente</p>
          </button>
          <div className="flex items-center gap-4">
            {empresaNombre && (
              <span className="hidden text-sm text-cream/70 sm:block">{empresaNombre}</span>
            )}
            <span className="hidden text-sm text-cream/70 sm:block">{email}</span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-forest-dark transition hover:bg-gold-dark"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Cabecera del cliente (banda verde a todo el ancho) */}
      {client ? (
        <section className="bg-forest">
          <div className="mx-auto max-w-6xl px-8 py-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Cliente activo</p>
            <h1 className="mt-2 text-4xl font-bold text-white">{client.name}</h1>
            {client.description && <p className="mt-2 text-sm text-white/70">{client.description}</p>}
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-xl border border-forest/15 bg-white p-6">
            <p className="text-muted">No se encontró el cliente. Verificá que el schema de Supabase esté aplicado.</p>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-10">
        {/* Épicas */}
        {([1, 2, 3, 4] as const).map(epic => (
          <section key={epic}>
            <h2 className="mb-4 border-b border-b-forest/10 border-l-4 border-l-gold pb-2 pl-3 text-xl font-semibold text-forest">
              {EPIC_NAMES[epic]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deliveriesByEpic[epic].map(delivery => {
                const sub = submissionByDelivery[delivery.id]
                const status = sub?.status ?? 'pending'
                const badge = statusBadge(status)
                const templates = TEMPLATE_LINKS[delivery.number] ?? []

                return (
                  <div
                    key={delivery.id}
                    className="flex h-full flex-col gap-3 rounded-2xl border border-forest/15 bg-white p-5 transition-shadow duration-200 hover:shadow-md"
                  >
                    {/* Número + badge de estado */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-muted">
                        {String(delivery.number).padStart(2, '0')}
                      </span>
                      {badge && (
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.className}`}>
                          {badge.label}
                        </span>
                      )}
                    </div>

                    {/* Título */}
                    <h3 className="font-semibold leading-snug text-forest">{delivery.title}</h3>

                    {/* Descripción del contenido del entregable */}
                    <p className="flex-1 text-sm leading-relaxed text-gray-500">
                      {DELIVERY_DESC[delivery.number] ?? delivery.expected_result}
                    </p>

                    {/* Botones */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setModalDelivery(delivery)}
                        className="rounded-md bg-forest px-3 py-1.5 text-xs font-medium text-white transition hover:bg-forest-dark"
                      >
                        Ver detalle
                      </button>
                      {templates.map((t) => (
                        <a
                          key={t.url}
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-forest/40 px-3 py-1.5 text-center text-xs font-medium text-forest transition hover:bg-forest/5"
                        >
                          {t.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </main>

      {/* Modal "Ver detalle" */}
      {modalDelivery && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setModalDelivery(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl sm:p-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalDelivery(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 text-2xl leading-none text-forest/60 transition hover:text-forest"
            >
              ×
            </button>
            <h3 className="pr-8 text-lg font-semibold text-forest">{modalDelivery.title}</h3>
            <div className="mt-4 flex flex-col gap-3">
              {(DELIVERY_DETAIL[modalDelivery.number] ?? []).map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-gray-600">{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
