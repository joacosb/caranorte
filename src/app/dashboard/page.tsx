'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// ── Static data ───────────────────────────────────────────────────────────────

const TEAM = [
  { name: 'Camila Primo', role: 'UX/UI', link: 'https://www.linkedin.com/in/primo-camila/', photo: '/team/camila-primo.jpg', initials: 'CP' },
  { name: 'Julieta Chinkes', role: 'Product Owner', link: 'https://www.linkedin.com/in/julieta-chinkes-48a7b126a/', photo: '/team/julieta-chinkes.jpg', initials: 'JC' },
  { name: 'Renata Belén Moreno Vera', role: 'UX/UI Designer', link: 'https://www.linkedin.com/in/renatabmv/', photo: '/team/renata-moreno.jpg', initials: 'RM' },
  { name: 'Agustina Sol Forini', role: 'Scrum Master', link: 'https://www.linkedin.com/in/agustina-sol-forini/', photo: '/team/agustina-forini.jpg', initials: 'AF' },
  { name: 'Tabatha Cesar Castaño', role: 'Product Analyst', link: 'https://www.linkedin.com/in/tabatha-cesar-95a325213/', photo: '/team/tabatha-cesar.jpg', initials: 'TC' },
  { name: 'Tiago Harari', role: 'Tech Leader', link: 'https://www.linkedin.com/in/tiagoharari/', photo: '/team/tiago-harari.jpg', initials: 'TH' },
  { name: 'Joaquín Sosa Beláustegui', role: 'Desarrollador', link: 'https://www.linkedin.com/in/joaquinsb/', photo: '/team/joaquin-sosa.jpg', initials: 'JS' },
]

type Delivery = {
  number: number
  title: string
  etapa: number
  dueDate: string
  links: { label: string; url: string }[]
}

const DELIVERIES: Delivery[] = [
  {
    number: 1, etapa: 1, title: 'Presentación del caso de negocio', dueDate: '20/03/2026',
    links: [
      { label: 'Ver documento (PDF)', url: 'https://drive.google.com/file/d/1_SWGHuKXWyvcNVFtPRVvFVT-V36pfGrJ/view' },
    ],
  },
  {
    number: 2, etapa: 1, title: 'Diagnóstico de la organización', dueDate: '27/03/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1H0kqxDLkD6FjJIi7Yc9Rlav155FtpBli/view' }],
  },
  {
    number: 3, etapa: 1, title: 'Análisis de la situación actual', dueDate: '03/04/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1pnbL0jbBNlT8BJJiO8_B53rUKESk4pwG/view' }],
  },
  {
    number: 4, etapa: 2, title: 'Propuesta de mejora e innovación', dueDate: '10/04/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1J6Lw8bSkjiWqw8yp7TDPtxeOVRLIPR_s/view' }],
  },
  {
    number: 5, etapa: 2, title: 'Diseño de la arquitectura objetivo', dueDate: '17/04/2026',
    links: [
      { label: 'Ver documento', url: 'https://drive.google.com/file/d/1U8wlvDndxy9aSsLwEQ7HAk6Eza6N7WwT/view' },
      { label: 'Ver diagrama', url: 'https://drive.google.com/file/d/1D4K8R131H83eBuKXRX3GNda5xfNKM14U/view' },
    ],
  },
  {
    number: 6, etapa: 2, title: 'Análisis de brechas', dueDate: '24/04/2026',
    links: [
      { label: 'Ver documento', url: 'https://drive.google.com/file/d/1CMtgpPHMyOO-sdg2zdkZVkWV9uyD29A5/view' },
      { label: 'Ver matriz', url: 'https://drive.google.com/file/d/1C_VSgxqj9wArtktDCnKxoi3tgyJecNyM/view' },
    ],
  },
  {
    number: 7, etapa: 3, title: 'Alcance y planificación', dueDate: '01/05/2026',
    links: [
      { label: 'Ver documento', url: 'https://drive.google.com/file/d/1UVS_BWJgsmDgTRCsftc6TDdG-SJAzuaD/view' },
      { label: 'Ver cronograma Gantt', url: 'https://drive.google.com/file/d/1tOs5rduqIUdNVWRLaxeEp8VtHl4UQ92J/view' },
    ],
  },
  {
    number: 8, etapa: 3, title: 'Análisis de mercado', dueDate: '08/05/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1RqL2u_8_R52FcgRwIxzYLRNqxkzSLqIJ/view' }],
  },
  {
    number: 9, etapa: 3, title: 'Análisis de viabilidad', dueDate: '15/05/2026',
    links: [
      { label: 'Ver documento', url: 'https://drive.google.com/file/d/1zstOgKiEfltZ4Bfk7fvIwtTFiK0EpeG5/view' },
      { label: 'Ver matriz RFP', url: 'https://drive.google.com/file/d/1kN9rg8Fv73RuH9Clo7kWfU9T4ZT6DI2B/view' },
    ],
  },
  {
    number: 10, etapa: 4, title: 'Evaluación de inversión', dueDate: '22/05/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1rRse2n8hcejsv97RVSSy5CJfKSKaQ2rn/view' }],
  },
  {
    number: 11, etapa: 4, title: 'Propuesta comercial', dueDate: '29/05/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1b8qzExtKN25JRFIuZkPIDalwJng9J916/view' }],
  },
  {
    number: 12, etapa: 4, title: 'Cierre y entrega final', dueDate: '05/06/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1LHu0B4zsV4kcmn7IN8cjrUaoyyAmdc22/view' }],
  },
]

const ETAPA_NAMES: Record<number, string> = {
  1: 'Diagnóstico y análisis inicial',
  2: 'Diseño de la solución',
  3: 'Planificación e implementación',
  4: 'Evaluación y cierre',
}

const NAV_SECTIONS = [
  { id: 'cliente', label: 'Sobre Nodek' },
  { id: 'diagnostico', label: 'Diagnóstico' },
  { id: 'propuesta', label: 'Propuesta' },
  { id: 'ejecucion', label: 'Ejecución' },
  { id: 'evaluacion', label: 'Evaluación' },
  { id: 'documentacion', label: 'Documentación' },
  { id: 'equipo', label: 'Equipo' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [activeSection, setActiveSection] = useState('cliente')
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (localStorage.getItem('auth') !== 'true') { router.push('/login'); return }
    setReady(true)
  }, [router])

  useEffect(() => {
    if (!ready) return
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target) }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ready])

  useEffect(() => {
    if (!ready) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id) })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ready])

  const handleLogout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('email')
    router.push('/login')
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
        <p className="text-sm text-forest/60">Cargando...</p>
      </div>
    )
  }

  const deliveriesByEtapa = DELIVERIES.reduce<Record<number, Delivery[]>>((acc, d) => {
    if (!acc[d.etapa]) acc[d.etapa] = []
    acc[d.etapa].push(d)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-cream text-ink">

      {/* ── Main nav ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-forest-dark/40 bg-forest/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex cursor-pointer items-center gap-3 text-left"
          >
            <p className="text-3xl font-extrabold leading-none tracking-tight text-cream">Cara<span className="text-gold">Norte</span></p>
            <span className="hidden h-6 w-px bg-cream/30 sm:block" />
            <p className="hidden text-xs text-cream/70 sm:block">Panel del proyecto</p>
          </button>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-cream/70 sm:block">Nodek Energía</span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-forest-dark transition-[transform,background-color] duration-150 ease-out hover:bg-gold-dark active:scale-[0.97]"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* ── Section nav ───────────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-40 border-b border-forest/10 bg-cream/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl overflow-x-auto px-6">
          <nav className="flex gap-1 py-2">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                  activeSection === s.id
                    ? 'bg-forest text-white'
                    : 'text-muted hover:bg-forest/10 hover:text-forest'
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-forest">
        <div className="mx-auto max-w-6xl px-8 py-14 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-gold/80">CaraNorte · Proyecto de consultoría</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-cream sm:text-5xl">
            Proyecto de transformación digital<br className="hidden sm:block" /> para Nodek Energía
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cream/75">
            Acompañamos a Nodek en el desarrollo de una propuesta integral de transformación digital que potencie su operación y crecimiento.
          </p>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-6 py-14 flex flex-col gap-20">

        {/* ── Sobre Nodek ─────────────────────────────────────────────────── */}
        <section id="cliente" className="scroll-mt-36">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Sobre el cliente</p>
          <h2 className="mt-2 text-3xl font-bold text-forest" data-reveal="left">¿Quién es Nodek?</h2>
          <div className="mt-6 max-w-3xl flex flex-col gap-5 text-ink/85 leading-relaxed" data-reveal="left" style={{ transitionDelay: '100ms' }}>
            <p>
              Nodek Energía es una PyME argentina fundada hace cinco años, especializada en soluciones de{' '}
              <strong>energía solar, movilidad eléctrica e ingeniería eléctrica</strong>. Con un equipo de 10 personas y una facturación anual cercana al millón de dólares, opera principalmente en el segmento B2B ofreciendo proyectos llave en mano a empresas y organismos públicos.
            </p>
            <p>
              El pedido inicial fue claro: <em>"Necesitamos ordenar la casa antes de seguir creciendo."</em> Nuestro trabajo fue transformar ese diagnóstico en un plan concreto, fundamentado y ejecutable.
            </p>
          </div>
        </section>

        {/* ── Nuestro diagnóstico ─────────────────────────────────────────── */}
        <section id="diagnostico" className="scroll-mt-36 rounded-2xl border border-forest/10 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Etapa 1</p>
          <h2 className="mt-2 text-3xl font-bold text-forest" data-reveal="right">Nuestro diagnóstico</h2>
          <p className="mt-2 text-muted" data-reveal="right" style={{ transitionDelay: '80ms' }}>
            Lo que encontramos al analizar la organización en profundidad.
          </p>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink/85" data-reveal="right" style={{ transitionDelay: '120ms' }}>
            Al inicio del proyecto, Nodek enfrentaba un desafío concreto: su operación crecía más rápido que su infraestructura interna. Los procesos centrales —gestión comercial, seguimiento de proyectos, compras y administración— estaban distribuidos en herramientas desconectadas (Trello, WhatsApp, Gmail, Excel), lo que generaba pérdida de información, demoras y decisiones basadas en datos incompletos.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal="right" style={{ transitionDelay: '160ms' }}>
            {[
              {
                icon: '🔗',
                title: 'Herramientas desconectadas',
                body: 'Trello, WhatsApp, Gmail, Excel y ACONPY operaban de forma aislada. La información crítica del negocio vivía en chats y planillas sin trazabilidad.',
              },
              {
                icon: '👤',
                title: 'Concentración de conocimiento',
                body: 'Las decisiones técnicas y comerciales dependían de una o dos personas clave. Ante una ausencia, el proceso se detenía.',
              },
              {
                icon: '📦',
                title: 'Sin gestión estructurada de compras',
                body: 'Las compras se realizaban sin órdenes formales ni seguimiento. El inventario y los proveedores se gestionaban informalmente.',
              },
              {
                icon: '📊',
                title: 'Sin visibilidad en tiempo real',
                body: 'No había dashboards ni reportes automáticos. El seguimiento del estado de proyectos y la cartera comercial se hacía manualmente.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border border-forest/10 bg-cream p-4">
                <span className="mt-0.5 text-2xl leading-none shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-forest">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8" data-reveal="right" style={{ transitionDelay: '200ms' }}>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Lo que escuchamos en las entrevistas</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { role: 'CEO', story: 'Necesito saber qué está pasando en todos los proyectos sin tener que llamar a cada uno para preguntarles.' },
                { role: 'Responsable comercial', story: 'Pierdo oportunidades porque no tengo un registro de con quién hablé ni en qué etapa quedamos. Todo está en el WhatsApp.' },
                { role: 'Jefe de operaciones', story: 'Compro materiales que ya tenemos en stock porque no sé qué hay disponible. No hay un lugar donde mirar.' },
              ].map(({ role, story }) => (
                <div key={role} className="rounded-xl border border-forest/10 bg-cream p-4">
                  <p className="text-sm leading-relaxed text-ink/80 italic">&ldquo;{story}&rdquo;</p>
                  <p className="mt-3 text-xs font-semibold text-forest">— {role}, Nodek</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-forest/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted max-w-xl">
              La madurez organizacional se evaluó usando la escala CMM (Capability Maturity Model), un modelo internacional de cinco niveles que mide qué tan sistemáticos y repetibles son los procesos de una organización. Nodek se encontraba en transición entre el Nivel 1 (ad hoc) y el Nivel 2 (procesos básicos): procedimientos parcialmente documentados con alta dependencia de conocimiento individual en roles clave.
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a href="https://drive.google.com/file/d/1H0kqxDLkD6FjJIi7Yc9Rlav155FtpBli/view" target="_blank" rel="noopener noreferrer"
                className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
                Ver diagnóstico completo →
              </a>
              <a href="https://drive.google.com/file/d/1pnbL0jbBNlT8BJJiO8_B53rUKESk4pwG/view" target="_blank" rel="noopener noreferrer"
                className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
                Ver análisis situación actual →
              </a>
            </div>
          </div>
        </section>

        {/* ── La propuesta ────────────────────────────────────────────────── */}
        <section id="propuesta" className="scroll-mt-36">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Etapa 2</p>
          <h2 className="mt-2 text-3xl font-bold text-forest" data-reveal="left">¿Qué propusimos transformar?</h2>
          <p className="mt-2 max-w-2xl text-muted" data-reveal="left" style={{ transitionDelay: '80ms' }}>
            El camino desde el diagnóstico hasta la solución atravesó cinco etapas de diseño progresivo.
          </p>

          <div className="mt-8 flex flex-col gap-4" data-reveal="left" style={{ transitionDelay: '160ms' }}>
            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">01</span>
              <div>
                <h3 className="font-semibold text-forest">Innovación identificada</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  La oportunidad de innovación surgió de la brecha entre cómo operaba Nodek y cómo debería operar para sostener su crecimiento. La innovación propuesta no fue solo tecnológica: fue la decisión de pasar de un modelo reactivo y personalista a uno estructurado, con datos centralizados y procesos repetibles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">02</span>
              <div>
                <h3 className="font-semibold text-forest">Arquitectura actual de Nodek</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Relevamos la arquitectura empresarial existente: cinco herramientas desconectadas (Trello, WhatsApp, Gmail, Excel y ACONPY) que operaban sin integración entre sí. Cada área gestionaba su propia información, lo que generaba inconsistencias, duplicaciones y puntos ciegos en la operación.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">03</span>
              <div>
                <h3 className="font-semibold text-forest">Arquitectura destino</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Diseñamos la arquitectura objetivo: una plataforma única que integre la gestión de clientes, proyectos, compras, inventario y contabilidad. La visión contempla también una segunda fase con inteligencia artificial aplicada al proceso de licitaciones, sobre un modelo 100% cloud que no requiere infraestructura interna.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">04</span>
              <div>
                <h3 className="font-semibold text-forest">Análisis de brechas</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  El análisis de brechas mide la distancia entre la arquitectura actual y la arquitectura destino: qué capacidades faltan, qué procesos deben rediseñarse y qué tecnología debe incorporarse. Fue en esta etapa donde quedó en evidencia la necesidad central del proyecto: <strong>Nodek no contaba con ningún sistema que centralizara la información del negocio</strong>. Esa brecha era la raíz de la mayoría de los problemas identificados en el diagnóstico.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">05</span>
              <div>
                <h3 className="font-semibold text-forest">Alcance del proyecto</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Con las brechas identificadas, definimos qué se implementa en la Fase 1 (plataforma de gestión integrada con módulo de gestión de clientes, proyectos, compras e inventario), qué entra en la Fase 2 (inteligencia artificial para licitaciones) y qué queda fuera del alcance actual. El alcance fue documentado con entregables y criterios de aceptación concretos acordados con el equipo directivo de Nodek.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-6" data-reveal="left" style={{ transitionDelay: '200ms' }}>
            <h3 className="font-semibold text-forest">Impacto esperado en los objetivos estratégicos de Nodek</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Escalabilidad operativa', body: 'Procesos documentados y automatizados que no dependen de personas clave, habilitando el crecimiento sin caos interno.' },
                { label: 'Decisiones basadas en datos', body: 'Dashboards en tiempo real con visibilidad sobre la cartera comercial, el estado de proyectos y la rentabilidad por cliente.' },
                { label: 'Mayor capacidad licitatoria', body: 'Con inteligencia artificial en la Fase 2, Nodek podría participar en hasta tres veces más licitaciones con el mismo equipo.' },
              ].map((impact) => (
                <div key={impact.label} className="rounded-xl bg-white p-4 border border-forest/10">
                  <h4 className="text-sm font-semibold text-forest">{impact.label}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{impact.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" data-reveal="left" style={{ transitionDelay: '240ms' }}>
            <a href="https://drive.google.com/file/d/1J6Lw8bSkjiWqw8yp7TDPtxeOVRLIPR_s/view" target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver propuesta de mejora →
            </a>
            <a href="https://drive.google.com/file/d/1U8wlvDndxy9aSsLwEQ7HAk6Eza6N7WwT/view" target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver arquitectura objetivo →
            </a>
            <a href="https://drive.google.com/file/d/1CMtgpPHMyOO-sdg2zdkZVkWV9uyD29A5/view" target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver análisis de brechas →
            </a>
          </div>
        </section>

        {/* ── Cómo lo ejecutamos ──────────────────────────────────────────── */}
        <section id="ejecucion" className="scroll-mt-36 rounded-2xl border border-forest/10 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Etapa 3</p>
          <h2 className="mt-2 text-3xl font-bold text-forest" data-reveal="right">Cómo lo ejecutamos</h2>
          <p className="mt-2 text-muted" data-reveal="right" style={{ transitionDelay: '80ms' }}>
            Planificamos el proyecto en cuatro etapas, con entregables concretos, fechas y responsables definidos en cada una.
          </p>

          <div className="relative mt-10" data-reveal="right" style={{ transitionDelay: '160ms' }}>
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[1.25rem] hidden border-t-2 border-dashed border-gold/40 sm:block" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-5">
              {[
                {
                  n: '01',
                  title: 'Diagnóstico y análisis',
                  detail: 'Relevamiento de procesos, evaluación de madurez organizacional y mapeo de la situación actual.',
                },
                {
                  n: '02',
                  title: 'Diseño de la solución',
                  detail: 'Propuesta de arquitectura objetivo, análisis de brechas y estrategia de transformación.',
                },
                {
                  n: '03',
                  title: 'Planificación e implementación',
                  detail: 'Alcance detallado, análisis de mercado, selección de proveedor y evaluación de viabilidad.',
                },
                {
                  n: '04',
                  title: 'Evaluación y cierre',
                  detail: 'Análisis económico, propuesta comercial final y presentación de cierre del proyecto.',
                },
              ].map((step) => (
                <div key={step.n} className="relative flex flex-row items-start gap-4 rounded-2xl border border-forest/10 bg-cream p-4 sm:flex-col sm:gap-2 sm:p-5">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-cream text-sm font-bold sm:h-8 sm:w-8 sm:text-xs">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest text-sm">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-forest/10 pt-6" data-reveal="right" style={{ transitionDelay: '240ms' }}>
            <a href="https://drive.google.com/file/d/1UVS_BWJgsmDgTRCsftc6TDdG-SJAzuaD/view" target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver documento de alcance →
            </a>
            <a href="https://drive.google.com/file/d/1tOs5rduqIUdNVWRLaxeEp8VtHl4UQ92J/view" target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver cronograma Gantt →
            </a>
          </div>
        </section>

        {/* ── Evaluación económica ────────────────────────────────────────── */}
        <section id="evaluacion" className="scroll-mt-36">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Etapa 4</p>
          <h2 className="mt-2 text-3xl font-bold text-forest" data-reveal="left">Evaluación económica y viabilidad</h2>
          <p className="mt-2 max-w-2xl text-muted" data-reveal="left" style={{ transitionDelay: '80ms' }}>
            Evaluamos cuatro alternativas de sistema de gestión y seleccionamos la mejor opción para el perfil y el presupuesto de Nodek.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3" data-reveal="left" style={{ transitionDelay: '160ms' }}>
            <div className="col-span-1 sm:col-span-2 rounded-2xl border border-forest/15 bg-white p-6">
              <h3 className="font-semibold text-forest">Proveedor seleccionado: Odoo Enterprise</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Tras evaluar SAP S/4HANA, Xubio, Tango Nube y Odoo Enterprise, el equipo recomendó <strong>Odoo Enterprise implementado por Adhoc SRL</strong> (Gold Partner). La decisión se basó en su cobertura funcional completa —gestión de clientes, proyectos, compras, contabilidad y portal nativo— y en su adecuación al perfil de una empresa sin área IT interna.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Puntaje obtenido', value: '93,8/100' },
                  { label: 'Costo total a 3 años', value: '~USD 9.946' },
                  { label: 'Ahorro vs. alternativa', value: '53%' },
                  { label: 'Recupero de inversión', value: 'Año 1' },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-xl bg-cream p-3 text-center">
                    <p className="text-lg font-bold text-forest">{kpi.value}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-forest/15 bg-white p-6">
              <h3 className="font-semibold text-forest">Fase 2: IA para licitaciones</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Con el sistema de gestión como base, la segunda fase introduce inteligencia artificial para automatizar la detección y preparación de licitaciones.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {[
                  { label: 'Licitaciones actuales / mes', value: '3–5', highlight: false },
                  { label: 'Proyección con IA / mes', value: '10–15', highlight: true },
                  { label: 'Reducción en tiempo de elaboración', value: '50–70%', highlight: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted text-xs">{row.label}</span>
                    <span className={`font-semibold text-sm ${row.highlight ? 'text-emerald-700' : 'text-forest'}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" data-reveal="left" style={{ transitionDelay: '220ms' }}>
            <a href="https://drive.google.com/file/d/1rRse2n8hcejsv97RVSSy5CJfKSKaQ2rn/view" target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver evaluación de inversión →
            </a>
            <a href="https://drive.google.com/file/d/1kN9rg8Fv73RuH9Clo7kWfU9T4ZT6DI2B/view" target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver matriz de selección →
            </a>
            <a href="https://drive.google.com/file/d/1b8qzExtKN25JRFIuZkPIDalwJng9J916/view" target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver propuesta comercial →
            </a>
          </div>
        </section>

        {/* ── Documentación ───────────────────────────────────────────────── */}
        <section id="documentacion" className="scroll-mt-36 rounded-2xl border border-forest/10 bg-white p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-forest" data-reveal="right">Documentación del proyecto</h2>
          <p className="mt-2 text-muted" data-reveal="right" style={{ transitionDelay: '80ms' }}>
            Accedé a los documentos de trabajo y papeles de cada etapa.
          </p>

          <div className="mt-8 flex flex-col gap-10" data-reveal="right" style={{ transitionDelay: '160ms' }}>
            {([1, 2, 3, 4] as const).map((etapa) => (
              <div key={etapa}>
                <h3 className="mb-4 border-b border-forest/10 border-l-4 border-l-gold pb-2 pl-3 text-base font-semibold text-forest">
                  Etapa {etapa} — {ETAPA_NAMES[etapa]}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {deliveriesByEtapa[etapa]?.map((delivery) => (
                    <div
                      key={delivery.number}
                      className="flex flex-col gap-3 rounded-xl border border-forest/10 bg-cream p-4"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-[11px] font-bold text-muted">Doc. {String(delivery.number).padStart(2, '0')}</span>
                      </div>
                      <h4 className="text-sm font-semibold leading-snug text-forest">{delivery.title}</h4>
                      <p className="text-xs text-muted">Fecha: {delivery.dueDate}</p>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {delivery.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-forest/25 px-2.5 py-1 text-[11px] font-medium text-forest hover:bg-forest/5 transition-colors"
                          >
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

          <p className="mt-8 rounded-lg border border-forest/10 bg-cream px-4 py-3 text-xs text-muted">
            Los documentos enlazados corresponden a los papeles de trabajo detallados de cada etapa. Para cualquier consulta sobre el contenido, contactar al equipo CaraNorte.
          </p>
        </section>

        {/* ── Equipo ──────────────────────────────────────────────────────── */}
        <section id="equipo" className="scroll-mt-36">
          <h2 className="text-3xl font-bold text-forest" data-reveal="left">El equipo del proyecto</h2>
          <p className="mt-2 text-muted" data-reveal="left" style={{ transitionDelay: '80ms' }}>
            Las personas de CaraNorte que trabajaron en este proyecto.
          </p>
          <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" data-reveal="left" style={{ transitionDelay: '160ms' }}>
            {TEAM.map((member) => (
              <a
                key={member.name}
                href={member.link}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col items-center rounded-2xl border border-forest/15 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-forest flex items-center justify-center shrink-0 mb-4">
                  {imgErrors[member.name] ? (
                    <span className="text-xl font-bold text-cream select-none">{member.initials}</span>
                  ) : (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={() => setImgErrors((s) => ({ ...s, [member.name]: true }))}
                    />
                  )}
                </div>
                <p className="text-sm font-bold text-forest leading-tight">{member.name}</p>
                <p className="mt-1 text-xs text-gray-500">{member.role}</p>
                <span className="mt-3 inline-block text-xs font-medium text-forest group-hover:underline">LinkedIn ↗</span>
              </a>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-forest/20 bg-forest px-6 py-8 text-sm text-cream/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="text-cream/80">CaraNorte · Proyecto de transformación para Nodek Energía</span>
          <span className="opacity-60">Panel privado de cliente</span>
        </div>
      </footer>

    </div>
  )
}
