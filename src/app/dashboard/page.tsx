'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DOCS } from '@/components/dashboard/ui'
import { NodekLogo } from '@/components/NodekLogo'
import {
  NodekSection,
  DiagnosticoSection,
  InnovacionSection,
  ArquitecturaSection,
  BrechasSection,
  AlcanceSection,
  EvaluacionSection,
  ProveedoresSection,
  CierreSection,
} from '@/components/dashboard/sections'

// ── Navegación por pestañas (fases del proyecto) ───────────────────────────────
const TABS = [
  { id: 'nodek', label: 'Nodek', render: () => <NodekSection /> },
  { id: 'diagnostico', label: 'Diagnóstico', render: () => <DiagnosticoSection /> },
  { id: 'innovacion', label: 'Innovación', render: () => <InnovacionSection /> },
  { id: 'arquitectura', label: 'Arquitectura', render: () => <ArquitecturaSection /> },
  { id: 'brechas', label: 'Brechas', render: () => <BrechasSection /> },
  { id: 'alcance', label: 'Alcance', render: () => <AlcanceSection /> },
  { id: 'proveedores', label: 'Proveedores', render: () => <ProveedoresSection /> },
  { id: 'evaluacion', label: 'Evaluación', render: () => <EvaluacionSection /> },
  { id: 'cierre', label: 'Cierre', render: () => <CierreSection /> },
  { id: 'docs', label: 'Documentación', render: () => <DocsSection /> },
  { id: 'equipo', label: 'Equipo', render: () => <EquipoSection /> },
] as const

// ── Team ───────────────────────────────────────────────────────────────────────
const TEAM = [
  { name: 'Camila Primo', role: 'UX/UI', link: 'https://www.linkedin.com/in/primo-camila/', photo: '/team/camila-primo.jpg', initials: 'CP' },
  { name: 'Julieta Chinkes', role: 'Product Owner', link: 'https://www.linkedin.com/in/julieta-chinkes-48a7b126a/', photo: '/team/julieta-chinkes.jpg', initials: 'JC' },
  { name: 'Renata Belén Moreno Vera', role: 'UX/UI Designer', link: 'https://www.linkedin.com/in/renatabmv/', photo: '/team/renata-moreno.jpg', initials: 'RM' },
  { name: 'Agustina Sol Forini', role: 'Scrum Master', link: 'https://www.linkedin.com/in/agustina-sol-forini/', photo: '/team/agustina-forini.jpg', initials: 'AF' },
  { name: 'Tabatha Cesar Castaño', role: 'Product Analyst', link: 'https://www.linkedin.com/in/tabatha-cesar-95a325213/', photo: '/team/tabatha-cesar.jpg', initials: 'TC' },
  { name: 'Tiago Harari', role: 'Tech Leader', link: 'https://www.linkedin.com/in/tiagoharari/', photo: '/team/tiago-harari.jpg', initials: 'TH' },
  { name: 'Joaquín Sosa Beláustegui', role: 'Desarrollador', link: 'https://www.linkedin.com/in/joaquinsb/', photo: '/team/joaquin-sosa.jpg', initials: 'JS' },
]

// ── Documentación ──────────────────────────────────────────────────────────────
const ETAPA_NAMES: Record<number, string> = {
  1: 'Diagnóstico y análisis inicial',
  2: 'Diseño de la solución',
  3: 'Planificación e implementación',
  4: 'Evaluación y cierre',
}

type Delivery = { number: number; title: string; etapa: number; dueDate: string; links: { label: string; url: string }[] }

const DELIVERIES: Delivery[] = [
  { number: 1, etapa: 1, title: 'Presentación del caso de negocio', dueDate: '20/03/2026', links: [{ label: 'Ver documento', url: DOCS.caso }] },
  { number: 2, etapa: 1, title: 'Diagnóstico de la organización', dueDate: '27/03/2026', links: [{ label: 'Ver documento', url: DOCS.diagnostico }] },
  { number: 3, etapa: 1, title: 'Análisis de la situación actual', dueDate: '03/04/2026', links: [{ label: 'Ver documento', url: DOCS.arqOrigen }] },
  { number: 4, etapa: 2, title: 'Propuesta de mejora e innovación', dueDate: '10/04/2026', links: [{ label: 'Ver documento', url: DOCS.innovacion }] },
  { number: 5, etapa: 2, title: 'Diseño de la arquitectura objetivo', dueDate: '17/04/2026', links: [{ label: 'Ver documento', url: DOCS.arqDestino }, { label: 'Ver diagrama', url: DOCS.arqDiagrama }] },
  { number: 6, etapa: 2, title: 'Análisis de brechas', dueDate: '24/04/2026', links: [{ label: 'Ver documento', url: DOCS.brechas }, { label: 'Ver matriz', url: DOCS.matriz }] },
  { number: 7, etapa: 3, title: 'Alcance y planificación', dueDate: '01/05/2026', links: [{ label: 'Ver documento', url: DOCS.alcance }, { label: 'Ver cronograma Gantt', url: DOCS.gantt }] },
  { number: 8, etapa: 3, title: 'Análisis de mercado', dueDate: '08/05/2026', links: [{ label: 'Ver documento', url: DOCS.mercado }] },
  { number: 9, etapa: 3, title: 'Análisis de viabilidad', dueDate: '15/05/2026', links: [{ label: 'Ver documento', url: DOCS.factibilidad }, { label: 'Ver matriz RFP', url: DOCS.matrizRfp }] },
  { number: 10, etapa: 4, title: 'Evaluación de inversión', dueDate: '22/05/2026', links: [{ label: 'Ver documento', url: DOCS.evalEconomica }] },
  { number: 11, etapa: 4, title: 'Propuesta comercial', dueDate: '29/05/2026', links: [{ label: 'Ver documento', url: DOCS.propuestaComercial }] },
  { number: 12, etapa: 4, title: 'Cierre y entrega final', dueDate: '05/06/2026', links: [{ label: 'Ver documento', url: DOCS.cierre }] },
]

function DocsSection() {
  const byEtapa = DELIVERIES.reduce<Record<number, Delivery[]>>((acc, d) => {
    ;(acc[d.etapa] ??= []).push(d)
    return acc
  }, {})
  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-widest text-gold">Papeles de trabajo</p>
        <h2 className="mt-2 text-3xl font-bold text-forest sm:text-4xl">Documentación del proyecto</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted text-justify">
          Accedé a los documentos completos de cada etapa. Recomendamos recorrer primero las secciones interactivas: acá están los papeles de trabajo detallados.
        </p>
      </div>
      {([1, 2, 3, 4] as const).map((etapa) => (
        <div key={etapa}>
          <h3 className="mb-4 border-b border-forest/10 border-l-4 border-l-gold pb-2 pl-3 text-base font-semibold text-forest">
            Etapa {etapa} — {ETAPA_NAMES[etapa]}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {byEtapa[etapa]?.map((d) => (
              <div key={d.number} className="flex flex-col gap-3 rounded-xl border border-forest/10 bg-white p-4">
                <span className="text-[11px] font-bold text-muted">Doc. {String(d.number).padStart(2, '0')}</span>
                <h4 className="text-sm font-semibold leading-snug text-forest">{d.title}</h4>
                <p className="text-xs text-muted">Fecha: {d.dueDate}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {d.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-forest/25 px-2.5 py-1 text-[11px] font-medium text-forest transition-colors hover:bg-forest/5">
                      📄 {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function EquipoSection() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})
  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-widest text-gold">CaraNorte</p>
        <h2 className="mt-2 text-3xl font-bold text-forest sm:text-4xl">El equipo del proyecto</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted text-justify">Las personas de CaraNorte que trabajaron en este proyecto para Nodek.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {TEAM.map((member) => (
          <a key={member.name} href={member.link} target="_blank" rel="noreferrer noopener"
            className="group flex flex-col items-center rounded-2xl border border-forest/15 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg">
            <div className="mb-4 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-forest">
              {imgErrors[member.name] ? (
                <span className="select-none text-xl font-bold text-cream">{member.initials}</span>
              ) : (
                <img src={member.photo} alt={member.name} className="h-full w-full object-cover"
                  onError={() => setImgErrors((s) => ({ ...s, [member.name]: true }))} />
              )}
            </div>
            <p className="text-sm font-bold leading-tight text-forest">{member.name}</p>
            <p className="mt-1 text-xs text-gray-500">{member.role}</p>
            <span className="mt-3 inline-block text-xs font-medium text-forest group-hover:underline">LinkedIn ↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(0)
  const contentTopRef = useRef<HTMLDivElement>(null)
  const isFirst = useRef(true)
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (localStorage.getItem('auth') !== 'true') { router.push('/login'); return }
    setReady(true)
  }, [router])

  // Al cambiar de pestaña, subir al inicio del contenido (excepto en la carga inicial)
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }
    contentTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [active])

  // Mantener el tab activo siempre visible: centrarlo dentro de la barra al cambiar
  useEffect(() => {
    const container = tabsScrollRef.current
    const btn = tabRefs.current[active]
    if (!container || !btn) return
    const cRect = container.getBoundingClientRect()
    const bRect = btn.getBoundingClientRect()
    const delta = (bRect.left + bRect.width / 2) - (cRect.left + cRect.width / 2)
    container.scrollBy({ left: delta, behavior: 'smooth' })
  }, [active])

  const handleLogout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('email')
    router.push('/')
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-cream">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
        <p className="text-sm text-forest/60">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-forest-dark/40 bg-forest/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <button onClick={() => { setActive(0); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex cursor-pointer items-center gap-3 text-left">
            <p className="text-2xl font-extrabold leading-none tracking-tight text-cream sm:text-3xl">Cara<span className="text-gold">Norte</span></p>
            <span className="hidden h-6 w-px bg-cream/30 sm:block" />
            <p className="hidden text-xs text-cream/70 sm:block">Panel del proyecto</p>
          </button>
          <div className="flex items-center gap-4">
            <NodekLogo className="hidden h-7 w-auto object-contain sm:block" wordmarkClassName="hidden text-sm font-bold text-cream sm:block" />
            <button onClick={handleLogout}
              className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-forest-dark transition-[transform,background-color] duration-150 ease-out hover:bg-gold-dark active:scale-[0.97]">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-forest">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-gold/80">CaraNorte · Proyecto de consultoría</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-cream sm:text-5xl">
            Transformación digital para Nodek Energía
          </h1>
          <p className="mt-4 max-w-3xl text-base text-cream/75 text-justify sm:text-lg">
            Un recorrido interactivo por todo el proyecto: desde el diagnóstico de la operación hasta la propuesta tecnológica que ordena su información y habilita su próximo salto de crecimiento. Navegá por las pestañas para explorar cada etapa en profundidad.
          </p>
        </div>
      </section>

      {/* ── Tabs de fases ──────────────────────────────────────────────────── */}
      <div className="sticky top-[64px] z-40 border-b border-forest/10 bg-cream/95 backdrop-blur-md">
        <div ref={tabsScrollRef} className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nav className="flex gap-1 py-2">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[i] = el }}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-150 ${
                  active === i ? 'bg-forest text-cream' : 'text-muted hover:bg-forest/10 hover:text-forest'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Contenido de la pestaña activa ─────────────────────────────────── */}
      <div ref={contentTopRef} className="scroll-mt-32" />
      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div key={TABS[active].id} className="animate-card-in">
          {TABS[active].render()}
        </div>

        {/* Navegación anterior / siguiente */}
        <div className="mt-16 flex items-center justify-between gap-4 border-t border-forest/10 pt-6">
          <button
            onClick={() => setActive((i) => Math.max(0, i - 1))}
            disabled={active === 0}
            className="rounded-lg border border-forest/25 px-4 py-2 text-sm font-semibold text-forest transition-colors enabled:hover:bg-forest/5 disabled:opacity-30"
          >
            ← {active > 0 ? TABS[active - 1].label : 'Inicio'}
          </button>
          <span className="text-xs text-muted">{active + 1} / {TABS.length}</span>
          <button
            onClick={() => setActive((i) => Math.min(TABS.length - 1, i + 1))}
            disabled={active === TABS.length - 1}
            className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-cream transition-colors enabled:hover:bg-forest-dark disabled:opacity-30"
          >
            {active < TABS.length - 1 ? TABS[active + 1].label : 'Fin'} →
          </button>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-forest/20 bg-forest px-6 py-8 text-sm text-cream/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="text-cream/80">CaraNorte · Proyecto de transformación para Nodek Energía</span>
          <span className="opacity-60">Panel privado de cliente</span>
        </div>
      </footer>
    </div>
  )
}
