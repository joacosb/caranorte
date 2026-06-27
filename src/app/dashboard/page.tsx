'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// ── Links a los documentos de trabajo (Google Drive) ───────────────────────────
const DOCS = {
  caso: 'https://drive.google.com/file/d/1Bgl5hF1eRC4swFiIbeBxK2edNOnG3K_O/view',
  diagnostico: 'https://drive.google.com/file/d/1FWhLmoOVwH5u1f8MP0iV7Bwcq9-1IYJ3/view',
  arqOrigen: 'https://drive.google.com/file/d/1BMTcMNQc1840Mp2xvVhQNOIJRj-49NhU/view',
  innovacion: 'https://drive.google.com/file/d/1gHOiWZLshjmLEKbWJtjtW_7kDjEOIubo/view',
  arqDestino: 'https://drive.google.com/file/d/1fEL3E4Z9JWYw-zvgWcCPZRmcheMG5wGz/view',
  brechas: 'https://drive.google.com/file/d/1HEQ3EqduOQ-kZ-xcdWEdQT2QGtlK0oMR/view',
  alcance: 'https://drive.google.com/file/d/16GCHuQ6kY1-44zt8ihgOBAWJzCkNK2Zc/view',
  mercado: 'https://drive.google.com/file/d/1x_O45p2JA4J5QUP6kgjN2ZFuSR5lZ54U/view',
  factibilidad: 'https://drive.google.com/file/d/1lKhG9pnU5v6YfbmauyivJKpk5lqgEgn1/view',
  evalEconomica: 'https://drive.google.com/file/d/11blAIWRGa66i9Dv3BTrf_HWWopEi7oRO/view',
  propuestaComercial: 'https://drive.google.com/file/d/1QXw_UEIFqxCoGoCNycGRjtYp3suafaQ-/view',
  cierre: 'https://drive.google.com/file/d/11NePQLoEcNaROd_eS5qJxkLAMb6pjsQG/view',
}

// ── Término técnico con explicación al pasar el mouse + link al documento ───────
function Term({ children, def, href }: { children: ReactNode; def: string; href?: string }) {
  const content = (
    <span className="font-semibold text-blue-600 decoration-blue-400 decoration-dotted underline underline-offset-2">
      {children}
    </span>
  )
  return (
    <span className="group relative inline-block">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-forest-dark">
          {content}
        </a>
      ) : (
        content
      )}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg bg-forest-dark px-3 py-2 text-xs font-normal leading-relaxed text-cream opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100"
      >
        {def}
        {href && <span className="mt-1.5 block font-semibold text-gold">Ver documento →</span>}
      </span>
    </span>
  )
}

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
      { label: 'Ver documento (PDF)', url: 'https://drive.google.com/file/d/1Bgl5hF1eRC4swFiIbeBxK2edNOnG3K_O/view' },
    ],
  },
  {
    number: 2, etapa: 1, title: 'Diagnóstico de la organización', dueDate: '27/03/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1FWhLmoOVwH5u1f8MP0iV7Bwcq9-1IYJ3/view' }],
  },
  {
    number: 3, etapa: 1, title: 'Análisis de la situación actual', dueDate: '03/04/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1BMTcMNQc1840Mp2xvVhQNOIJRj-49NhU/view' }],
  },
  {
    number: 4, etapa: 2, title: 'Propuesta de mejora e innovación', dueDate: '10/04/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1gHOiWZLshjmLEKbWJtjtW_7kDjEOIubo/view' }],
  },
  {
    number: 5, etapa: 2, title: 'Diseño de la arquitectura objetivo', dueDate: '17/04/2026',
    links: [
      { label: 'Ver documento', url: 'https://drive.google.com/file/d/1fEL3E4Z9JWYw-zvgWcCPZRmcheMG5wGz/view' },
      { label: 'Ver diagrama', url: 'https://drive.google.com/file/d/1D4K8R131H83eBuKXRX3GNda5xfNKM14U/view' },
    ],
  },
  {
    number: 6, etapa: 2, title: 'Análisis de brechas', dueDate: '24/04/2026',
    links: [
      { label: 'Ver documento', url: 'https://drive.google.com/file/d/1HEQ3EqduOQ-kZ-xcdWEdQT2QGtlK0oMR/view' },
      { label: 'Ver matriz', url: 'https://drive.google.com/file/d/1C_VSgxqj9wArtktDCnKxoi3tgyJecNyM/view' },
    ],
  },
  {
    number: 7, etapa: 3, title: 'Alcance y planificación', dueDate: '01/05/2026',
    links: [
      { label: 'Ver documento', url: 'https://drive.google.com/file/d/16GCHuQ6kY1-44zt8ihgOBAWJzCkNK2Zc/view' },
      { label: 'Ver cronograma Gantt', url: 'https://drive.google.com/file/d/1tOs5rduqIUdNVWRLaxeEp8VtHl4UQ92J/view' },
    ],
  },
  {
    number: 8, etapa: 3, title: 'Análisis de mercado', dueDate: '08/05/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1x_O45p2JA4J5QUP6kgjN2ZFuSR5lZ54U/view' }],
  },
  {
    number: 9, etapa: 3, title: 'Análisis de viabilidad', dueDate: '15/05/2026',
    links: [
      { label: 'Ver documento', url: 'https://drive.google.com/file/d/1lKhG9pnU5v6YfbmauyivJKpk5lqgEgn1/view' },
      { label: 'Ver matriz RFP', url: 'https://drive.google.com/file/d/1kN9rg8Fv73RuH9Clo7kWfU9T4ZT6DI2B/view' },
    ],
  },
  {
    number: 10, etapa: 4, title: 'Evaluación de inversión', dueDate: '22/05/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/11blAIWRGa66i9Dv3BTrf_HWWopEi7oRO/view' }],
  },
  {
    number: 11, etapa: 4, title: 'Propuesta comercial', dueDate: '29/05/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/1QXw_UEIFqxCoGoCNycGRjtYp3suafaQ-/view' }],
  },
  {
    number: 12, etapa: 4, title: 'Cierre y entrega final', dueDate: '05/06/2026',
    links: [{ label: 'Ver documento', url: 'https://drive.google.com/file/d/11NePQLoEcNaROd_eS5qJxkLAMb6pjsQG/view' }],
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
          <p className="mt-4 max-w-2xl text-lg text-cream/75 text-justify">
            Acompañamos a Nodek en el análisis de su operación y en el diseño de una propuesta tecnológica que ordene su información y habilite su próximo salto de crecimiento.
          </p>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-6 py-14 flex flex-col gap-20">

        {/* ── Sobre Nodek ─────────────────────────────────────────────────── */}
        <section id="cliente" className="scroll-mt-36">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Sobre el cliente</p>
          <h2 className="mt-2 text-3xl font-bold text-forest" data-reveal="left">¿Quién es Nodek?</h2>
          <div className="mt-6 max-w-3xl flex flex-col gap-5 text-ink/85 leading-relaxed text-justify" data-reveal="left" style={{ transitionDelay: '100ms' }}>
            <p>
              Nodek Energía es una empresa argentina con <strong>5 años de trayectoria</strong> que brinda soluciones energéticas integrales para optimizar el consumo y acompañar la transición hacia un modelo más eficiente y sostenible. Opera principalmente con empresas y organismos públicos, con sede central en <strong>CABA</strong> y operaciones en <strong>Corrientes</strong>, y lleva <strong>más de 130 proyectos completados</strong>.
            </p>
            <p>
              Sus cinco líneas de servicio son <strong>eficiencia energética, energía solar, movilidad eléctrica, ingeniería eléctrica y almacenamiento</strong>. El proyecto se trabajó junto a su sponsor, <strong>Matías Grosso (Director Técnico-Comercial)</strong>.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal="left" style={{ transitionDelay: '160ms' }}>
            <div className="rounded-xl border border-forest/10 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gold">Objetivo estratégico 1</p>
              <h3 className="mt-2 font-semibold text-forest">Expansión geográfica</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 text-justify">
                Sumar operaciones en Buenos Aires, el Noroeste argentino (NOA) y la Patagonia dentro de los próximos tres años.
              </p>
            </div>
            <div className="rounded-xl border border-forest/10 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gold">Objetivo estratégico 2</p>
              <h3 className="mt-2 font-semibold text-forest">Proyectos de mayor escala</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 text-justify">
                Encarar obras de mayor envergadura, con una potencia mínima de 3 MW por proyecto.
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted text-justify" data-reveal="left" style={{ transitionDelay: '200ms' }}>
            Ambos objetivos comparten un mismo requisito: para crecer, Nodek necesita <strong>ganar más licitaciones</strong> (concursos en los que las empresas compiten presentando una propuesta para obtener un contrato). Y ahí estaba el cuello de botella que dio origen a este proyecto.
          </p>
        </section>

        {/* ── Nuestro diagnóstico ─────────────────────────────────────────── */}
        <section id="diagnostico" className="scroll-mt-36 rounded-2xl border border-forest/10 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Etapa 1</p>
          <h2 className="mt-2 text-3xl font-bold text-forest" data-reveal="right">Nuestro diagnóstico</h2>
          <p className="mt-2 text-muted text-justify" data-reveal="right" style={{ transitionDelay: '80ms' }}>
            Entrevistamos a las distintas áreas de Nodek para entender, más allá de lo visible, cómo trabaja la empresa por dentro. A eso se lo llama{' '}
            <Term def="Una mirada profunda de la organización: no solo sus números, sino cómo se toman las decisiones, dónde se concentra el conocimiento y qué tan ordenados están sus procesos." href={DOCS.diagnostico}>diagnóstico organizacional</Term>.
          </p>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink/85 text-justify" data-reveal="right" style={{ transitionDelay: '120ms' }}>
            El hallazgo central: la operación de Nodek crecía más rápido que su organización interna. La información del negocio vivía repartida en muchas herramientas que no se comunicaban entre sí, y los procesos más importantes dependían de la experiencia de pocas personas clave.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal="right" style={{ transitionDelay: '160ms' }}>
            {[
              {
                icon: '🔗',
                title: 'Información dispersa en muchas apps',
                body: 'Google Drive, Excel, Trello, Gmail, WhatsApp, ACONPY, Smart Design, Modhub y FusionSolar operaban de forma aislada, sin una fuente única de datos confiable.',
              },
              {
                icon: '👤',
                title: 'Conocimiento y decisiones concentrados',
                body: 'Las decisiones de inversión y muchas tareas críticas (incluso la búsqueda de personal) recaían en el Director Técnico-Comercial. Ante una ausencia, el proceso se frenaba.',
              },
              {
                icon: '📝',
                title: 'Licitaciones armadas a mano',
                body: 'Cada propuesta para una licitación se preparaba manualmente, coordinando varias áreas. Era lento y dependía de una sola persona: el principal cuello de botella.',
              },
              {
                icon: '📊',
                title: 'Sin datos en tiempo real',
                body: 'No había tableros ni reportes automáticos. El estado de los proyectos y de la cartera comercial se seguía de forma manual, con información incompleta.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border border-forest/10 bg-cream p-4">
                <span className="mt-0.5 text-2xl leading-none shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-forest">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600 text-justify">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10" data-reveal="right" style={{ transitionDelay: '200ms' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Lo que pidió cada área</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink/85 text-justify">
              Registramos cada necesidad como una{' '}
              <Term def="Una forma simple de anotar lo que necesita cada persona, en su propio idioma y con el formato: Como [rol], quiero [algo], para [un beneficio]." href={DOCS.diagnostico}>historia de usuario</Term>: una frase en el idioma de quien la pide. Luego las ordenamos por prioridad con el método{' '}
              <Term def="Método para clasificar pedidos según su urgencia: Must (imprescindible), Should (deseable), Could (opcional) y Won't (queda para más adelante)." href={DOCS.diagnostico}>MoSCoW</Term>.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { code: 'US-01', area: 'Licitaciones y propuestas', rol: 'ofertista', quiero: 'automatizar el armado de propuestas y licitaciones, coordinando las áreas involucradas', para: 'alinearlas con el cliente y reducir los tiempos de elaboración', prio: 'MUST' },
                { code: 'US-02', area: 'Preventa', rol: 'ofertista', quiero: 'automatizar campañas, registrar las interacciones con interesados y medir el embudo de ventas', para: 'agilizar la conversión de oportunidades', prio: 'MUST' },
                { code: 'US-03', area: 'Gestión de proyectos', rol: 'responsable de tecnología y proyectos', quiero: 'ver el estado de cada proyecto en tiempo real', para: 'tener visibilidad del avance y anticipar desvíos', prio: 'MUST' },
                { code: 'US-04', area: 'Cadena de suministro', rol: 'líder de proyecto', quiero: 'gestionar proveedores y compras de forma centralizada', para: 'seguir el proceso desde la compra hasta la entrega', prio: 'MUST' },
                { code: 'US-05', area: 'Posventa', rol: 'director técnico', quiero: 'monitorear el rendimiento y generar reportes automáticos con indicadores clave', para: 'dar valor agregado al cliente y reducir el armado de informes', prio: 'SHOULD' },
                { code: 'US-06', area: 'Gestión financiera', rol: 'director', quiero: 'centralizar y automatizar las finanzas con seguimiento del flujo de caja', para: 'tomar decisiones basadas en datos', prio: 'COULD' },
                { code: 'US-07', area: 'Búsqueda de empleados', rol: 'responsable de RR.HH.', quiero: 'filtrar y clasificar candidatos automáticamente', para: 'recibir solo los perfiles adecuados al puesto', prio: 'COULD' },
                { code: 'US-08', area: 'Nuevos productos y servicios', rol: 'director', quiero: 'agilizar la evaluación y propuesta de nuevos productos', para: 'generar ventajas competitivas', prio: "WON'T" },
              ].map((us) => {
                const prioMap: Record<string, { label: string; cls: string }> = {
                  MUST: { label: 'Imprescindible', cls: 'bg-forest text-white' },
                  SHOULD: { label: 'Deseable', cls: 'bg-gold text-forest-dark' },
                  COULD: { label: 'Opcional', cls: 'bg-forest/10 text-forest' },
                  "WON'T": { label: 'Más adelante', cls: 'bg-gray-200 text-gray-600' },
                }
                const prio = prioMap[us.prio]
                return (
                  <div key={us.code} className="flex flex-col gap-2 rounded-xl border border-forest/10 bg-cream p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold tracking-wide text-muted">{us.code} · {us.area}</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${prio.cls}`}>{prio.label}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-ink/80 text-justify">
                      <span className="font-semibold text-forest">Como</span> {us.rol}, <span className="font-semibold text-forest">quiero</span> {us.quiero} <span className="font-semibold text-forest">para</span> {us.para}.
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-forest/10 pt-6 sm:flex-row sm:items-center sm:justify-between" data-reveal="right" style={{ transitionDelay: '240ms' }}>
            <p className="text-sm text-muted max-w-xl text-justify">
              Para medir qué tan ordenada estaba la empresa usamos la escala{' '}
              <Term def="Capability Maturity Model: un termómetro de madurez con 5 niveles, del 1 (procesos caóticos) al 5 (procesos optimizados), que mide qué tan sistemáticos y repetibles son los procesos de una organización." href={DOCS.diagnostico}>CMM</Term>. Nodek estaba en el <strong>Nivel 2 (repetible)</strong>: procesos básicos y parcialmente documentados, pero con fuerte dependencia del conocimiento de cada persona.
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a href={DOCS.diagnostico} target="_blank" rel="noopener noreferrer"
                className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
                Ver diagnóstico completo →
              </a>
              <a href={DOCS.arqOrigen} target="_blank" rel="noopener noreferrer"
                className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
                Ver situación actual →
              </a>
            </div>
          </div>
        </section>

        {/* ── La propuesta ────────────────────────────────────────────────── */}
        <section id="propuesta" className="scroll-mt-36">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Etapa 2</p>
          <h2 className="mt-2 text-3xl font-bold text-forest" data-reveal="left">¿Qué propusimos transformar?</h2>
          <p className="mt-2 max-w-2xl text-muted text-justify" data-reveal="left" style={{ transitionDelay: '80ms' }}>
            Del diagnóstico a la solución recorrimos cinco pasos: primero la idea innovadora, después el mapa de cómo trabaja Nodek hoy y cómo debería trabajar, qué falta para llegar y, por último, qué incluye exactamente nuestro proyecto.
          </p>

          <div className="mt-8 flex flex-col gap-4" data-reveal="left" style={{ transitionDelay: '160ms' }}>
            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">01</span>
              <div>
                <h3 className="font-semibold text-forest">La innovación: inteligencia artificial para licitaciones</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 text-justify">
                  Como el cuello de botella era el armado manual de licitaciones, la idea central fue automatizarlo con{' '}
                  <Term def="Una IA que redacta: a partir del pliego de la licitación genera un borrador de propuesta y detecta qué requisitos faltan cubrir." href={DOCS.innovacion}>inteligencia artificial generativa</Term>{' '}y{' '}
                  <Term def="Una IA que estima: predice la probabilidad de ganar cada licitación e identifica los competidores probables, para decidir en cuáles conviene invertir esfuerzo." href={DOCS.innovacion}>predictiva</Term>. Así Nodek puede preparar más propuestas, de mejor calidad y sin depender de una sola persona. Esta innovación es el destino; pero antes hay que ordenar los datos que la alimentan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">02</span>
              <div>
                <h3 className="font-semibold text-forest">Cómo trabaja Nodek hoy</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 text-justify">
                  Dibujamos su{' '}
                  <Term def="El mapa completo de cómo funciona una empresa: sus procesos, su información, las aplicaciones que usa y la tecnología que la soporta, y cómo se conectan entre sí." href={DOCS.arqOrigen}>arquitectura empresarial</Term>{' '}actual: 14 procesos sostenidos por más de ocho herramientas que no se hablan entre sí (Google Drive, Excel, Trello, Gmail, WhatsApp, ACONPY, Smart Design, Modhub y FusionSolar). Cada área manejaba su propia información, generando inconsistencias, duplicaciones y puntos ciegos en la operación.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">03</span>
              <div>
                <h3 className="font-semibold text-forest">Cómo debería trabajar</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 text-justify">
                  Diseñamos la arquitectura destino alrededor de un{' '}
                  <Term def="Sistema único de gestión que reúne en un solo lugar clientes, proyectos, compras y finanzas, en lugar de tenerlo todo repartido en herramientas sueltas." href={DOCS.arqDestino}>ERP</Term>{' '}en modalidad{' '}
                  <Term def="Software que se usa por internet, sin instalar ni mantener servidores propios: ideal porque Nodek no tiene área de sistemas." href={DOCS.arqDestino}>SaaS</Term>, con módulos de clientes, proyectos, compras, finanzas y tableros de indicadores. Sobre esa base de datos ordenada se conecta, en una segunda fase, la IA para licitaciones. Todo en la nube, sin infraestructura propia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">04</span>
              <div>
                <h3 className="font-semibold text-forest">Qué falta para llegar</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 text-justify">
                  Con una{' '}
                  <Term def="Una tabla que compara, punto por punto, cómo está la empresa hoy contra cómo querría estar, para ver con claridad qué capacidades faltan." href={DOCS.brechas}>matriz de brechas</Term>{' '}medimos la distancia entre el presente y el destino. Quedó en evidencia la necesidad central del proyecto: <strong>Nodek no contaba con ningún sistema que centralizara la información del negocio</strong>. Esa única brecha era la raíz de casi todos los problemas del diagnóstico.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-forest/15 bg-white p-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-forest">05</span>
              <div>
                <h3 className="font-semibold text-forest">Qué incluye (y qué no) este proyecto</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 text-justify">
                  Definimos con claridad el{' '}
                  <Term def="Los límites del proyecto: qué cosas SÍ hace y, sobre todo, qué cosas NO hace, para que el cliente y la consultora tengan la misma expectativa." href={DOCS.alcance}>alcance</Term>. Nuestro trabajo como consultora <strong>recomienda</strong> la solución: incluye la propuesta tecnológica, la preselección de proveedores y las recomendaciones para implementarla. <strong>No</strong> incluye la implementación en sí, el desarrollo de software a medida ni el soporte posterior: eso queda a cargo de Nodek y del proveedor que elija. La IA de licitaciones se planifica como una segunda fase futura.
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
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600 text-justify">{impact.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" data-reveal="left" style={{ transitionDelay: '240ms' }}>
            <a href={DOCS.innovacion} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver innovación →
            </a>
            <a href={DOCS.arqDestino} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver arquitectura destino →
            </a>
            <a href={DOCS.brechas} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver matriz de brechas →
            </a>
            <a href={DOCS.alcance} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver alcance →
            </a>
          </div>
        </section>

        {/* ── Cómo lo ejecutamos ──────────────────────────────────────────── */}
        <section id="ejecucion" className="scroll-mt-36 rounded-2xl border border-forest/10 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Etapa 3</p>
          <h2 className="mt-2 text-3xl font-bold text-forest" data-reveal="right">Cómo lo ejecutamos</h2>
          <p className="mt-2 text-muted text-justify" data-reveal="right" style={{ transitionDelay: '80ms' }}>
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
                    <p className="mt-1 text-xs leading-relaxed text-gray-500 text-justify">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-forest/15 bg-cream p-5" data-reveal="right" style={{ transitionDelay: '200ms' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Cómo conviene implementarlo</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/85 text-justify">
              Evaluamos cuatro formas de poner en marcha la solución (en servidores propios o en la nube; de golpe o por partes) y recomendamos hacerlo <strong>en la nube y por etapas</strong>. La nube, porque Nodek no tiene área de sistemas; por etapas, porque permite empezar por lo más crítico, validar resultados y que el equipo se adapte de a poco, reduciendo riesgos y resistencia al cambio.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-forest/10 pt-6" data-reveal="right" style={{ transitionDelay: '240ms' }}>
            <a href={DOCS.alcance} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver documento de alcance →
            </a>
            <a href={DOCS.brechas} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver escenarios de implementación →
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
          <p className="mt-2 max-w-2xl text-muted text-justify" data-reveal="left" style={{ transitionDelay: '80ms' }}>
            Salimos al mercado con un{' '}
            <Term def="Request for Information: una consulta abierta al mercado para conocer qué proveedores existen y preseleccionar candidatos, sin comprometerse a contratar." href={DOCS.mercado}>RFI</Term>{' '}para preseleccionar proveedores, y luego un{' '}
            <Term def="Request for Proposal: el pedido formal de propuesta a los finalistas, para compararlos en detalle y elegir uno." href={DOCS.factibilidad}>RFP</Term>{' '}para comparar a los dos finalistas en detalle.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3" data-reveal="left" style={{ transitionDelay: '160ms' }}>
            <div className="col-span-1 sm:col-span-2 rounded-2xl border border-forest/15 bg-white p-6">
              <h3 className="font-semibold text-forest">Proveedor recomendado: Odoo Enterprise</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 text-justify">
                De cuatro soluciones evaluadas (SAP S/4HANA, Xubio, Tango Nube y Odoo) los finalistas fueron Tango Nube y Odoo. Tras comparar funcionalidad, técnica, proveedor y costo, recomendamos <strong>Odoo Enterprise implementado por Adhoc SRL</strong> (Gold Partner). Pesó su cobertura completa —clientes, proyectos, compras, contabilidad y portal— su adecuación a una empresa sin área de sistemas, y su menor{' '}
                <Term def="Costo Total de Propiedad (TCO): no solo lo que sale comprarlo, sino todo lo que cuesta tenerlo y usarlo durante 3 años (licencias, implementación, soporte, etc.)." href={DOCS.evalEconomica}>costo total a 3 años</Term>.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Puntaje obtenido', value: '93,8/100' },
                  { label: 'Costo total a 3 años', value: '~USD 9.946' },
                  { label: 'Ahorro vs. Tango Nube', value: '53%' },
                  { label: 'Licencia anual', value: 'USD 1.962' },
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
              <p className="mt-3 text-sm leading-relaxed text-gray-600 text-justify">
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
            <a href={DOCS.mercado} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver análisis de mercado (RFI) →
            </a>
            <a href={DOCS.evalEconomica} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver evaluación económica →
            </a>
            <a href={DOCS.propuestaComercial} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/5 transition-colors">
              Ver propuesta comercial →
            </a>
          </div>
        </section>

        {/* ── Documentación ───────────────────────────────────────────────── */}
        <section id="documentacion" className="scroll-mt-36 rounded-2xl border border-forest/10 bg-white p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-forest" data-reveal="right">Documentación del proyecto</h2>
          <p className="mt-2 text-muted text-justify" data-reveal="right" style={{ transitionDelay: '80ms' }}>
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

          <p className="mt-8 rounded-lg border border-forest/10 bg-cream px-4 py-3 text-xs text-muted text-justify">
            Los documentos enlazados corresponden a los papeles de trabajo detallados de cada etapa. Para cualquier consulta sobre el contenido, contactar al equipo CaraNorte.
          </p>
        </section>

        {/* ── Equipo ──────────────────────────────────────────────────────── */}
        <section id="equipo" className="scroll-mt-36">
          <h2 className="text-3xl font-bold text-forest" data-reveal="left">El equipo del proyecto</h2>
          <p className="mt-2 text-muted text-justify" data-reveal="left" style={{ transitionDelay: '80ms' }}>
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
