'use client'

import { Term, DOCS, SectionHeader, DocLink, DocLinks, Tech } from './ui'
import {
  OrgChart,
  ProcessMap,
  ArchMatrix,
  GapTabs,
  CriteriaDonut,
  VendorBars,
  ScenarioCards,
  ServicesAccordion,
  RankBars,
  type Gap,
} from './graphics'

// ════════════════════════════════════════════════════════════════════════════════
//  1 · NODEK
// ════════════════════════════════════════════════════════════════════════════════

const SERVICIOS = [
  {
    n: 1,
    title: 'Diagnóstico y revisión de contratos',
    items: ['Auditoría energética Nivel 1 (ahorro 5–10%)', 'Auditoría energética Nivel 2 (ahorro 10–20%)', 'Diagnóstico de contratos de energía y gas (PPA, MATER, MAT)'],
  },
  {
    n: 2,
    title: 'Monitoreo y medición inteligente',
    items: ['Medición en tiempo real', 'Gestión de contratos eléctricos y de gas', 'Automatismos y corrección de pérdidas', 'Recambio de equipos y banco de capacitores'],
  },
  {
    n: 3,
    title: 'Gestión energética con ISO 50.001',
    items: ['Implementación del Sistema de Gestión de la Energía (SGE)', 'Análisis GAP ISO 50.001', 'Certificación ISO 50.001'],
  },
  {
    n: 4,
    title: 'Neutralidad en carbono',
    items: ['Implementación de software de huella de carbono', 'Compra de bonos verdes'],
  },
]

export function NodekSection() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Sobre el cliente"
        title="¿Quién es Nodek?"
        intro="Nodek Energía es una empresa argentina de soluciones energéticas integrales. Este panel recorre, paso a paso, el proyecto de transformación digital que diseñamos junto a ellos."
      />

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-4 rounded-2xl border border-forest/10 bg-white p-6 leading-relaxed text-ink/85 text-justify">
          <p>
            Con <strong>5 años de trayectoria</strong>, Nodek brinda soluciones para optimizar el consumo energético y acompañar la transición hacia un modelo más eficiente y sostenible. Opera con empresas y organismos públicos, con sede central en <strong>CABA</strong> y operaciones en <strong>Corrientes</strong>, y lleva <strong>más de 130 proyectos completados</strong>.
          </p>
          <p>
            El proyecto se trabajó junto a su sponsor, <strong>Matías Grosso (Director Técnico-Comercial)</strong>, con foco en el cuello de botella que frenaba su crecimiento: el armado de licitaciones.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="rounded-2xl border border-forest/10 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Objetivo estratégico 1</p>
            <h3 className="mt-1.5 font-semibold text-forest">Expansión geográfica</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted text-justify">Sumar operaciones en Buenos Aires, el NOA y la Patagonia en los próximos tres años.</p>
          </div>
          <div className="rounded-2xl border border-forest/10 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Objetivo estratégico 2</p>
            <h3 className="mt-1.5 font-semibold text-forest">Proyectos de mayor escala</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted text-justify">Encarar obras de mayor envergadura, con una potencia mínima de 3 MW por proyecto.</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gold/30 bg-gold/5 px-5 py-4 text-sm leading-relaxed text-ink/85 text-justify">
        Ambos objetivos comparten un mismo requisito: para crecer, Nodek necesita <strong>ganar más licitaciones</strong> —concursos en los que las empresas compiten presentando una propuesta para obtener un contrato—. Ahí estaba el cuello de botella que dio origen a este proyecto.
      </div>

      {/* Servicios */}
      <div>
        <h3 className="text-xl font-bold text-forest">Sus servicios</h3>
        <p className="mt-1 text-sm text-muted">Tocá cada servicio para ver el detalle.</p>
        <div className="mt-5">
          <ServicesAccordion services={SERVICIOS} />
        </div>
      </div>

      {/* Organigrama */}
      <div>
        <h3 className="text-xl font-bold text-forest">Estructura organizacional</h3>
        <p className="mt-1 text-sm text-muted">El organigrama de Nodek nos ayudó a mapear responsabilidades y detectar la concentración de decisiones.</p>
        <div className="mt-5">
          <OrgChart />
        </div>
      </div>

      <DocLinks>
        <DocLink href={DOCS.caso}>Ver presentación del caso</DocLink>
      </DocLinks>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  2 · DIAGNÓSTICO
// ════════════════════════════════════════════════════════════════════════════════

const HALLAZGOS = [
  { icon: '🔗', title: 'Información dispersa en muchas apps', body: 'Google Drive, Excel, Trello, Gmail, WhatsApp, ACONPY, Smart Design, Modhub y FusionSolar operaban de forma aislada, sin una fuente única de datos confiable.' },
  { icon: '👤', title: 'Conocimiento y decisiones concentrados', body: 'Las decisiones de inversión y muchas tareas críticas recaían en el Director Técnico-Comercial. Ante una ausencia, el proceso se frenaba.' },
  { icon: '📝', title: 'Licitaciones armadas a mano', body: 'Cada propuesta se preparaba manualmente, coordinando varias áreas. Era lento y dependía de una sola persona: el principal cuello de botella.' },
  { icon: '📊', title: 'Sin datos en tiempo real', body: 'No había tableros ni reportes automáticos. El estado de los proyectos y de la cartera comercial se seguía de forma manual.' },
]

const HISTORIAS = [
  { code: 'US-01', area: 'Licitaciones y propuestas', rol: 'ofertista', quiero: 'automatizar el armado de propuestas y licitaciones, coordinando las áreas involucradas', para: 'alinearlas con el cliente y reducir los tiempos', prio: 'MUST' },
  { code: 'US-02', area: 'Preventa', rol: 'ofertista', quiero: 'automatizar campañas y medir el embudo de ventas', para: 'agilizar la conversión de oportunidades', prio: 'MUST' },
  { code: 'US-03', area: 'Gestión de proyectos', rol: 'responsable de tecnología', quiero: 'ver el estado de cada proyecto en tiempo real', para: 'anticipar desvíos', prio: 'MUST' },
  { code: 'US-04', area: 'Cadena de suministro', rol: 'líder de proyecto', quiero: 'gestionar proveedores y compras de forma centralizada', para: 'seguir el proceso de compra a entrega', prio: 'MUST' },
  { code: 'US-05', area: 'Posventa', rol: 'director técnico', quiero: 'monitorear rendimiento y generar reportes automáticos', para: 'dar valor agregado al cliente', prio: 'SHOULD' },
  { code: 'US-06', area: 'Gestión financiera', rol: 'director', quiero: 'centralizar y automatizar las finanzas', para: 'decidir con datos', prio: 'COULD' },
  { code: 'US-07', area: 'RR.HH.', rol: 'responsable de RR.HH.', quiero: 'filtrar y clasificar candidatos automáticamente', para: 'recibir solo perfiles adecuados', prio: 'COULD' },
  { code: 'US-08', area: 'Nuevos productos', rol: 'director', quiero: 'agilizar la evaluación de nuevos productos', para: 'generar ventajas competitivas', prio: "WON'T" },
]

const PRIO_MAP: Record<string, { label: string; cls: string }> = {
  MUST: { label: 'Imprescindible', cls: 'bg-forest text-white' },
  SHOULD: { label: 'Deseable', cls: 'bg-gold text-forest-dark' },
  COULD: { label: 'Opcional', cls: 'bg-forest/10 text-forest' },
  "WON'T": { label: 'Más adelante', cls: 'bg-gray-200 text-gray-600' },
}

export function DiagnosticoSection() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Etapa 1 · Diagnóstico"
        title="Nuestro diagnóstico"
        intro={
          <>
            Entrevistamos a cada área para entender cómo trabaja Nodek por dentro. A eso se lo llama{' '}
            <Term def="Una mirada profunda de la organización: cómo se toman las decisiones, dónde se concentra el conocimiento y qué tan ordenados están sus procesos." href={DOCS.diagnostico}>diagnóstico organizacional</Term>.
          </>
        }
      />

      <p className="max-w-3xl leading-relaxed text-ink/85 text-justify">
        El hallazgo central: <strong>la operación de Nodek crecía más rápido que su organización interna</strong>. La información vivía repartida en herramientas que no se comunicaban entre sí, y los procesos clave dependían de pocas personas.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {HALLAZGOS.map((item) => (
          <div key={item.title} className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-5">
            <span className="mt-0.5 shrink-0 text-2xl leading-none">{item.icon}</span>
            <div>
              <h3 className="font-semibold text-forest">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted text-justify">{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa de procesos */}
      <div>
        <h3 className="text-xl font-bold text-forest">Mapa de procesos de Nodek</h3>
        <p className="mt-1 max-w-3xl text-sm text-muted text-justify">
          Ordenamos toda la operación en tres niveles —estratégicos, operativos y de apoyo— para ver de un vistazo cómo funciona la empresa de punta a punta.
        </p>
        <div className="mt-5">
          <ProcessMap />
        </div>
      </div>

      {/* Historias de usuario */}
      <div>
        <h3 className="text-xl font-bold text-forest">Lo que pidió cada área</h3>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted text-justify">
          Registramos cada necesidad como una{' '}
          <Term def="Una frase en el idioma de quien la pide, con el formato: Como [rol], quiero [algo], para [un beneficio]." href={DOCS.diagnostico}>historia de usuario</Term>{' '}
          y las priorizamos con el método{' '}
          <Term def="Clasifica pedidos por urgencia: Must (imprescindible), Should (deseable), Could (opcional) y Won't (más adelante)." href={DOCS.diagnostico}>MoSCoW</Term>.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {HISTORIAS.map((us) => {
            const prio = PRIO_MAP[us.prio]
            return (
              <div key={us.code} className="flex flex-col gap-2 rounded-xl border border-forest/10 bg-white p-4">
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

      {/* CMM */}
      <div className="rounded-2xl border border-forest/15 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-gold">Madurez organizacional</p>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink/85 text-justify">
          Para medir qué tan ordenada estaba la empresa usamos la escala{' '}
          <Term def="Capability Maturity Model: un termómetro de madurez con 5 niveles, del 1 (caótico) al 5 (optimizado)." href={DOCS.diagnostico}>CMM</Term>.
          Nodek estaba en el <strong>Nivel 2 (repetible)</strong>.
        </p>
        <div className="mt-5 grid grid-cols-5 gap-2">
          {[
            { n: 1, l: 'Inicial' },
            { n: 2, l: 'Repetible' },
            { n: 3, l: 'Definido' },
            { n: 4, l: 'Gestionado' },
            { n: 5, l: 'Optimizado' },
          ].map((lvl) => (
            <div key={lvl.n} className={`rounded-lg p-3 text-center ${lvl.n === 2 ? 'bg-forest text-cream ring-2 ring-gold' : 'bg-cream text-muted'}`}>
              <p className="text-lg font-extrabold">{lvl.n}</p>
              <p className="text-[10px] font-medium leading-tight">{lvl.l}</p>
            </div>
          ))}
        </div>
      </div>

      <DocLinks>
        <DocLink href={DOCS.diagnostico}>Ver diagnóstico completo</DocLink>
        <DocLink href={DOCS.arqOrigen}>Ver situación actual</DocLink>
      </DocLinks>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  3 · INNOVACIÓN
// ════════════════════════════════════════════════════════════════════════════════

const PROCESO_ACTUAL = [
  'Llega una licitación',
  'El ofertista lee cientos de páginas de pliego',
  'Busca información en documentos dispersos',
  'Revisa experiencias de proyectos anteriores',
  'Calcula costos manualmente',
  'Arma la propuesta',
]

const PROBLEMAS = [
  { icon: '⏱️', t: 'Consumo elevado de tiempo', d: 'Cada propuesta insume días de trabajo manual.' },
  { icon: '👤', t: 'Dependencia de las personas', d: 'Todo el conocimiento vive en quien arma la propuesta.' },
  { icon: '📈', t: 'Dificultad para escalar', d: 'Sin poder preparar más propuestas, no se puede crecer.' },
]

const IA_FUENTES = [
  { t: 'ERP de la empresa', items: ['Catálogo y costos', 'Proveedores', 'Experiencias previas', 'Capacidad operativa', 'Condiciones comerciales'] },
  { t: 'Licitación', items: ['Pliego', 'Anexos', 'Circulares', 'Consultas y respuestas'] },
  { t: 'Internet', items: ['Competidores'] },
]

const IA_MODULOS = [
  { icon: '📄', t: 'Análisis del pliego' },
  { icon: '📊', t: 'Estimación de competencia' },
  { icon: '✍️', t: 'Generación de propuesta' },
  { icon: '✅', t: 'Estimación de adjudicación' },
]

const IMPACTO = [
  { icon: '⚙️', t: 'Mayor eficiencia operativa', d: 'Automatización del armado de licitaciones y reducción de tiempos administrativos.' },
  { icon: '🚀', t: 'Escalabilidad para crecer', d: 'Procesos documentados que no dependen de personas clave, habilitando la expansión geográfica y proyectos de mayor escala.' },
  { icon: '📊', t: 'Decisiones basadas en datos', d: 'Dashboards en tiempo real de la cartera comercial, los proyectos y la rentabilidad.' },
  { icon: '🏆', t: 'Más licitaciones ganadas', d: 'Con IA, participar en hasta 3× más licitaciones con el mismo equipo.' },
]

export function InnovacionSection() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Etapa 2 · Innovación"
        title="Del problema a la solución"
        intro="El corazón de la propuesta es una idea innovadora. Pero para entenderla, primero hay que ver el problema que resuelve."
      />

      {/* Proceso actual */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-forest/15 bg-white p-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <h3 className="text-lg font-bold text-forest">El proceso actual</h3>
          </div>
          <ol className="mt-4 flex flex-col gap-2.5">
            {PROCESO_ACTUAL.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest/10 text-xs font-bold text-forest">{i + 1}</span>
                <span className="text-sm leading-relaxed text-ink/85">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚨</span>
            <h3 className="text-lg font-bold text-forest">Los problemas</h3>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {PROBLEMAS.map((p) => (
              <div key={p.t} className="flex gap-3 rounded-xl bg-white p-4">
                <span className="text-xl">{p.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-forest">{p.t}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted text-justify">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* La solución: IA */}
      <div className="rounded-2xl bg-forest p-6 text-cream sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gold">La innovación</p>
        <h3 className="mt-2 text-2xl font-bold">Un agente de IA para licitaciones</h3>
        <p className="mt-3 max-w-3xl leading-relaxed text-cream/80 text-justify">
          Combina{' '}
          <Term onDark def="Una IA que redacta: a partir del pliego genera un borrador de propuesta y detecta qué requisitos faltan cubrir." href={DOCS.innovacion}>IA generativa</Term>{' '}y{' '}
          <Term onDark def="Una IA que estima: predice la probabilidad de ganar cada licitación e identifica competidores probables." href={DOCS.innovacion}>IA predictiva</Term>{' '}
          para preparar más propuestas, de mejor calidad, sin depender de una sola persona.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          {/* Fuentes de conocimiento */}
          <div className="rounded-xl bg-forest-dark/40 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gold">Fuentes de conocimiento</p>
            <div className="flex flex-col gap-3">
              {IA_FUENTES.map((f) => (
                <div key={f.t} className="rounded-lg bg-cream/95 p-3">
                  <p className="text-xs font-bold text-forest">{f.t}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {f.items.map((it) => (
                      <span key={it} className="rounded bg-forest/10 px-1.5 py-0.5 text-[10px] font-medium text-forest">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Módulos de inteligencia */}
          <div className="rounded-xl bg-forest-dark/40 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gold">Módulos de inteligencia</p>
            <div className="grid grid-cols-2 gap-2">
              {IA_MODULOS.map((m) => (
                <div key={m.t} className="flex flex-col items-center gap-1.5 rounded-lg bg-cream/95 p-3 text-center">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-[11px] font-semibold leading-tight text-forest">{m.t}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 grid gap-2">
              <div className="rounded-lg border border-gold/40 bg-forest-dark/60 px-3 py-2 text-center text-[11px] font-semibold text-cream">
                🗂️ Base de conocimiento vectorial (RAG)
              </div>
              <div className="rounded-lg border border-gold/40 bg-forest-dark/60 px-3 py-2 text-center text-[11px] font-semibold text-cream">
                ⚙️ Motor de reglas y plantillas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impacto en objetivos */}
      <div>
        <h3 className="text-xl font-bold text-forest">Impacto en los objetivos estratégicos de Nodek</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACTO.map((im) => (
            <div key={im.t} className="rounded-2xl border border-forest/10 bg-white p-5">
              <span className="text-3xl">{im.icon}</span>
              <h4 className="mt-3 text-sm font-bold text-forest">{im.t}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted text-justify">{im.d}</p>
            </div>
          ))}
        </div>
      </div>

      <DocLinks>
        <DocLink href={DOCS.innovacion}>Ver documento de innovación</DocLink>
      </DocLinks>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  4 · ARQUITECTURA
// ════════════════════════════════════════════════════════════════════════════════

const ARQ_ESTRATEGICOS = {
  titulo: 'Procesos estratégicos y de evaluación',
  color: 'bg-forest',
  rows: [
    { proceso: 'Planificación estratégica y crecimiento', apps: ['Google Drive', 'Office 365'] },
    { proceso: 'Desarrollo de nuevos productos y servicios', apps: ['Gmail', 'Google Drive'] },
    { proceso: 'Gestión comercial y desarrollo de negocio', apps: ['Gmail', 'Google Drive', 'Trello', 'WhatsApp'] },
    { proceso: 'Evaluación y control de gestión', apps: ['Google Drive', 'Office 365'] },
  ],
  cloud: ['Office 365', 'Trello', 'Google Drive'],
}

const ARQ_OPERATIVOS = {
  titulo: 'Procesos operativos',
  color: 'bg-forest-light',
  rows: [
    { proceso: 'Relevamiento y diagnóstico energético', apps: ['Gmail', 'Google Drive', 'Office 365', 'Modhub', 'FusionSolar'] },
    { proceso: 'Diseño de la propuesta técnica', apps: ['Google Drive', 'Office 365', 'Smart Design'] },
    { proceso: 'Instalación', apps: ['Gmail', 'Google Drive', 'Trello', 'WhatsApp'] },
    { proceso: 'Puesta en marcha', apps: ['Google Drive', 'Trello', 'Modhub', 'FusionSolar'] },
    { proceso: 'Mantenimiento', apps: ['Gmail', 'Modhub', 'FusionSolar', 'WhatsApp'] },
  ],
  cloud: ['FusionSolar', 'Modhub', 'Trello'],
}

const ARQ_APOYO = {
  titulo: 'Procesos de apoyo',
  color: 'bg-gold-dark',
  rows: [
    { proceso: 'Gestión comercial (pre / post venta, licitación)', apps: ['Gmail', 'Trello', 'Office 365', 'WhatsApp', 'Modhub', 'FusionSolar'] },
    { proceso: 'Compras', apps: ['Gmail', 'Trello', 'Office 365', 'WhatsApp'] },
    { proceso: 'Administración y finanzas', apps: ['aconpy.com'] },
    { proceso: 'R.R.H.H.', apps: ['LinkedIn'] },
    { proceso: 'Logística', apps: ['Gmail', 'Google Drive', 'Trello', 'Office 365', 'WhatsApp'] },
  ],
  cloud: ['Google Drive', 'Modhub', 'FusionSolar', 'Trello', 'Office 365', 'aconpy.com'],
}

const ARQ_DIMENSIONES = [
  { icon: '⚙️', t: 'Arquitectura de negocio', d: 'Alta dependencia de procesos manuales, decisiones centralizadas y baja automatización. WhatsApp y correo como canales informales de coordinación.' },
  { icon: '🗄️', t: 'Arquitectura de datos', d: 'Información fragmentada entre múltiples plataformas, sin una única fuente de verdad ni trazabilidad completa del negocio.' },
  { icon: '🧩', t: 'Arquitectura de aplicaciones', d: 'Más de ocho herramientas (Drive, Office 365, Trello, Modhub, FusionSolar, ACONPY, etc.) operando de forma aislada, sin sincronización entre sí.' },
  { icon: '☁️', t: 'Arquitectura tecnológica', d: 'Infraestructura limitada para sostener el crecimiento proyectado y habilitar información en tiempo real.' },
]

export function ArquitecturaSection() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Etapa 2 · Arquitectura empresarial"
        title="Cómo trabaja Nodek hoy (y cómo debería)"
        intro={
          <>
            Dibujamos su{' '}
            <Term def="El mapa completo de cómo funciona una empresa: procesos, información, aplicaciones y tecnología, y cómo se conectan." href={DOCS.arqOrigen}>arquitectura empresarial</Term>{' '}
            actual para entender la base, y luego diseñamos la arquitectura destino.
          </>
        }
      />

      {/* Dimensiones */}
      <div>
        <h3 className="text-xl font-bold text-forest">Las cuatro dimensiones de la arquitectura base</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {ARQ_DIMENSIONES.map((d) => (
            <div key={d.t} className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-5">
              <span className="text-2xl">{d.icon}</span>
              <div>
                <h4 className="font-semibold text-forest">{d.t}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted text-justify">{d.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Matriz aplicación / datos-tecnología */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-forest">Arquitectura de aplicaciones (origen)</h3>
          <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">Situación actual · Origen</span>
        </div>
        <p className="mt-1 max-w-3xl text-sm text-muted text-justify">Para cada proceso, qué aplicaciones se usan y dónde viven los datos.</p>
        <div className="mt-5 flex flex-col gap-4">
          <ArchMatrix block={ARQ_ESTRATEGICOS} />
          <ArchMatrix block={ARQ_OPERATIVOS} />
          <ArchMatrix block={ARQ_APOYO} />
        </div>
      </div>

      {/* Origen → Destino */}
      <div className="rounded-2xl border border-forest/15 bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wide">
          <span className="rounded-full bg-forest/10 px-4 py-1.5 text-forest">Arquitectura origen</span>
          <span className="text-2xl text-gold">→</span>
          <span className="rounded-full bg-forest px-4 py-1.5 text-cream">Arquitectura destino</span>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-forest/10 bg-cream p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600">Antes</p>
            <h4 className="mt-1 font-semibold text-forest">Herramientas sueltas</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted text-justify">
              14 procesos sostenidos por más de ocho aplicaciones que no se hablan entre sí. Cada área maneja su propia información, generando inconsistencias, duplicaciones y puntos ciegos.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Google Drive', 'Office 365', 'Trello', 'Gmail', 'WhatsApp', 'Modhub', 'FusionSolar', 'aconpy.com'].map((t) => (
                <Tech key={t} name={t} />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-forest/20 bg-forest/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-forest">Después</p>
            <h4 className="mt-1 font-semibold text-forest">Un ERP como columna vertebral</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink/85 text-justify">
              Un{' '}
              <Term def="Sistema único de gestión que reúne clientes, proyectos, compras y finanzas en un solo lugar." href={DOCS.arqDestino}>ERP</Term>{' '}
              en modalidad{' '}
              <Term def="Software que se usa por internet, sin instalar ni mantener servidores propios." href={DOCS.arqDestino}>SaaS</Term>{' '}
              centraliza la información. Las apps de energía (Modhub, FusionSolar) e IoT se integran vía API, y sobre esa base se conecta la IA para licitaciones.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['ERP (Odoo)', 'API', 'IA', 'FusionSolar', 'Modhub'].map((t) => (
                <Tech key={t} name={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <DocLinks>
        <DocLink href={DOCS.arqOrigen}>Ver arquitectura origen</DocLink>
        <DocLink href={DOCS.arqDestino}>Ver arquitectura destino</DocLink>
        <DocLink href={DOCS.arqDiagrama}>Ver diagrama</DocLink>
      </DocLinks>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  5 · BRECHAS
// ════════════════════════════════════════════════════════════════════════════════

const GAPS: Gap[] = [
  {
    tab: 'Centralización de datos',
    icon: '🗄️',
    titulo: 'Centralización de datos',
    fase: 'Proyecto 1 · ERP',
    brecha: 'La información del negocio vive dispersa en Drive, Trello, ACONPY, Excel y correo, sin una fuente única ni trazabilidad.',
    propuesta: 'Migrar toda la información al ERP propuesto e integrar los SaaS de energía solar e IoT (Modhub, FusionSolar), Gmail y WhatsApp vía API.',
  },
  {
    tab: 'Gestión comercial',
    icon: '📈',
    titulo: 'Gestión comercial y leads',
    fase: 'Proyecto 1 · ERP',
    brecha: 'El seguimiento de leads, campañas y oportunidades es manual, sin métricas de conversión ni embudo de ventas.',
    propuesta: 'Implementar el módulo de ventas / CRM del ERP con seguimiento de leads, campañas automatizadas y métricas de conversión.',
  },
  {
    tab: 'KPIs y visibilidad',
    icon: '📊',
    titulo: 'Visibilidad y KPIs',
    fase: 'Proyecto 1 · ERP',
    brecha: 'No hay tableros ni reportes en tiempo real: el estado de proyectos y la cartera se siguen a mano.',
    propuesta: 'Dashboards con KPIs en tiempo real (ROI, ahorro, proyección) alimentados desde Modhub y FusionSolar integrados al ERP.',
  },
  {
    tab: 'Compras',
    icon: '📦',
    titulo: 'Compras y trazabilidad',
    fase: 'Proyecto 1 · ERP',
    brecha: 'La gestión de proveedores y órdenes de compra está descentralizada, sin trazabilidad de materiales por proyecto.',
    propuesta: 'Gestión centralizada de proveedores y órdenes de compra, con trazabilidad de materiales y entregas integrada al módulo de proyectos.',
  },
  {
    tab: 'Seguridad',
    icon: '🔐',
    titulo: 'Seguridad y gobierno',
    fase: 'Proyecto 1 · ERP',
    brecha: 'No existen roles, permisos definidos ni políticas de respaldo de la información.',
    propuesta: 'Definir roles y permisos con un sistema de autenticación, más políticas de protección y respaldo de datos.',
  },
  {
    tab: 'Portal del cliente',
    icon: '🌐',
    titulo: 'Portal del cliente',
    fase: 'Proyecto 1 · ERP',
    brecha: 'El cliente no tiene visibilidad del avance de su proyecto.',
    propuesta: 'Integrar la información del ERP con el sitio web para que el cliente consulte en tiempo real su proyecto: consumo energético, rendimiento, ROI.',
  },
  {
    tab: 'IA para licitaciones',
    icon: '🤖',
    titulo: 'Automatización con IA',
    fase: 'Proyecto 2 · IA',
    brecha: 'El armado de licitaciones es totalmente manual y depende de una sola persona.',
    propuesta: 'Implementar una IA que se integre vía API con el ERP para armar propuestas comerciales y completar licitaciones automáticamente.',
  },
]

export function BrechasSection() {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="Etapa 2 · Análisis de brechas"
        title="La distancia entre el hoy y el destino"
        intro={
          <>
            Con una{' '}
            <Term def="Una tabla que compara, punto por punto, cómo está la empresa hoy contra cómo querría estar." href={DOCS.brechas}>matriz de brechas</Term>{' '}
            medimos qué capacidades le faltan a Nodek. Recorré cada brecha y su propuesta de evolución.
          </>
        }
      />

      <GapTabs gaps={GAPS} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border-l-4 border-l-forest border-y border-r border-forest/15 bg-white p-5">
          <span className="text-xs font-bold uppercase tracking-wide text-gold">Proyecto 1</span>
          <h4 className="mt-1 font-bold text-forest">Implementación del ERP e integración de interfaces</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted text-justify">
            Módulos de CRM, proyectos, compras, contabilidad y visualizaciones, con integración interna (ERP) y externa (web para clientes). Resuelve seis de las siete brechas.
          </p>
        </div>
        <div className="rounded-2xl border-l-4 border-l-gold border-y border-r border-forest/15 bg-white p-5">
          <span className="text-xs font-bold uppercase tracking-wide text-gold">Proyecto 2</span>
          <h4 className="mt-1 font-bold text-forest">Implementación de IA para licitaciones</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted text-justify">
            Una IA integrada vía API con el ERP para armar propuestas y completar licitaciones. Es la segunda fase, que se apoya en los datos ya ordenados por el ERP.
          </p>
        </div>
      </div>

      <DocLinks>
        <DocLink href={DOCS.brechas}>Ver análisis de brechas</DocLink>
        <DocLink href={DOCS.matriz}>Ver matriz de brechas</DocLink>
      </DocLinks>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  6 · ALCANCE
// ════════════════════════════════════════════════════════════════════════════════

const INCLUYE = [
  'Propuesta de las soluciones tecnológicas',
  'Recomendación de proveedores',
  'Evaluación económica del ERP',
  'Diseño de la arquitectura destino',
  'Análisis de brechas y escenarios',
]

const NO_INCLUYE = [
  'La implementación técnica de la solución (instalación, configuración, pruebas)',
  'La contratación de licencias, servicios o productos',
  'La configuración o migración de los sistemas actuales del cliente',
  'La capacitación interna en herramientas o procesos',
  'La planificación operativa o técnica detallada de la implementación',
  'El seguimiento post-proyecto (soporte, mantenimiento o supervisión)',
]

const SAAS = ['Almacenamiento en la nube', 'Escalabilidad para la expansión geográfica', 'Acceso remoto desde cualquier ubicación', 'Menor costo de infraestructura']
const MODULAR = ['Implementación por etapas', 'Menor riesgo operativo', 'Adaptación progresiva de los usuarios', 'Validación y ajustes continuos']

const ESCENARIOS = [
  { n: 1, title: 'On-Premises + Big Bang', pros: ['Control total'], contras: ['Costos altísimos, requiere equipo interno', 'Riesgo elevado y poco viable para una PyME'] },
  { n: 2, title: 'On-Premises + Modular', pros: ['Implementación gradual'], contras: ['Inversión y mantenimiento muy altos', 'Requiere personal técnico especializado'] },
  { n: 3, title: 'SaaS + Big Bang', pros: ['Implementación rápida', 'Sin infraestructura propia'], contras: ['Cambio abrupto y resistencia elevada', 'Riesgo de interrupciones'] },
  { n: 4, title: 'SaaS + Modular', pros: ['Bajo costo inicial', 'Adopción gradual del personal', 'Sin servidores propios', 'Escalable y de bajo riesgo'], contras: ['Dependencia de la conectividad', 'Personalización moderada'], selected: true },
]

export function AlcanceSection() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Etapa 3 · Alcance"
        title="Qué incluye (y qué no) el proyecto"
        intro="Definimos con claridad los límites del proyecto para que el cliente y la consultora tengan la misma expectativa."
      />

      {/* Dos etapas */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-forest/15 bg-white p-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-sm font-bold text-cream">1</span>
          <h3 className="mt-3 font-bold text-forest">Implementación del ERP</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted text-justify">Una fuente centralizada de datos con cuatro módulos:</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {['Ventas', 'Proyectos', 'Finanzas', 'Compras'].map((m) => (
              <span key={m} className="rounded-lg bg-cream px-3 py-2 text-center text-xs font-semibold text-forest">{m}</span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-forest/15 bg-white p-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-forest-dark">2</span>
          <h3 className="mt-3 font-bold text-forest">Agente de IA para licitaciones</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted text-justify">
            Sobre los datos históricos ya centralizados por el ERP, se implementa el agente de IA que automatiza el armado de propuestas y licitaciones.
          </p>
        </div>
      </div>

      {/* Incluye / No incluye */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
          <h3 className="flex items-center gap-2 font-bold text-forest"><span className="text-emerald-600">✓</span> Sí incluye</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {INCLUYE.map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">✓</span>
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
          <h3 className="flex items-center gap-2 font-bold text-forest"><span className="text-red-500">✕</span> No incluye</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {NO_INCLUYE.map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-600">✕</span>
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SaaS vs Modular */}
      <div>
        <h3 className="text-xl font-bold text-forest">Por qué SaaS y por qué modular</h3>
        <p className="mt-1 max-w-3xl text-sm text-muted text-justify">Recomendamos implementar la solución en la nube y por etapas. Cada enfoque aporta lo suyo:</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-forest/15 bg-white p-6">
            <h4 className="text-2xl font-extrabold text-gold">SaaS</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SAAS.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-ink/85"><span className="text-forest">●</span>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-forest/15 bg-white p-6">
            <h4 className="text-2xl font-extrabold text-forest">Modular</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {MODULAR.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-ink/85"><span className="text-gold-dark">●</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Escenarios */}
      <div>
        <h3 className="text-xl font-bold text-forest">Escenarios de implementación evaluados</h3>
        <p className="mt-1 max-w-3xl text-sm text-muted text-justify">Combinamos dónde corre la solución (servidores propios o nube) con cómo se despliega (de golpe o por partes).</p>
        <div className="mt-5">
          <ScenarioCards scenarios={ESCENARIOS} />
        </div>
      </div>

      <DocLinks>
        <DocLink href={DOCS.alcance}>Ver documento de alcance</DocLink>
        <DocLink href={DOCS.gantt}>Ver cronograma Gantt</DocLink>
      </DocLinks>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  7 · EVALUACIÓN
// ════════════════════════════════════════════════════════════════════════════════

const CRITERIOS = [
  { label: 'Funcional', pct: 40, color: '#1a4a38', desc: 'Cobertura de módulos: ventas, gestión de proyectos, compras, finanzas y dashboards de KPIs.' },
  { label: 'Técnico', pct: 25, color: '#e8bb4b', desc: 'Modalidad 100% SaaS cloud, SLA, seguridad (MFA/SSO) y APIs para integrar IoT y sistemas externos.' },
  { label: 'Económico', pct: 20, color: '#2a6b52', desc: 'Costo total de propiedad: licencias, implementación, capacitación y escalabilidad futura.' },
  { label: 'Proveedor', pct: 15, color: '#c9a030', desc: 'Trayectoria, capacidad, certificados y soporte post-implementación.' },
]

const VENDOR_BARS = [
  { criterio: 'Funcional (40%)', a: 38.0, b: 14.0, max: 40 },
  { criterio: 'Técnico (25%)', a: 24.6, b: 19.8, max: 25 },
  { criterio: 'Económico (20%)', a: 18.3, b: 7.6, max: 20 },
  { criterio: 'Proveedor (15%)', a: 12.9, b: 11.5, max: 15 },
]

const TANGO_BRECHAS = [
  { t: 'Funcional', d: 'Sin módulo de gestión de clientes estructurado, portal de clientes ni gestión de proyectos suficiente.' },
  { t: 'Técnico', d: 'Menor capacidad de integración vía API con FusionSolar / IA.' },
  { t: 'Económico', d: 'Mayor costo de licenciamiento y menor escalabilidad.' },
]

export function EvaluacionSection() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Etapa 4 · Factibilidad"
        title="Cómo evaluamos y elegimos"
        intro={
          <>
            Salimos al mercado con un{' '}
            <Term def="Request for Information: una consulta abierta al mercado para conocer proveedores y preseleccionar candidatos." href={DOCS.mercado}>RFI</Term>{' '}
            y luego un{' '}
            <Term def="Request for Proposal: el pedido formal de propuesta a los finalistas, para compararlos en detalle." href={DOCS.factibilidad}>RFP</Term>{' '}
            con un modelo de evaluación objetivo de cuatro criterios ponderados.
          </>
        }
      />

      {/* Criterios */}
      <div className="rounded-2xl border border-forest/15 bg-white p-6 sm:p-8">
        <h3 className="text-xl font-bold text-forest">Criterios de evaluación</h3>
        <p className="mt-1 text-sm text-muted">Ponderación para la selección del proveedor de ERP.</p>
        <div className="mt-6">
          <CriteriaDonut criterios={CRITERIOS} />
        </div>
      </div>

      {/* Odoo vs Tango */}
      <div>
        <h3 className="text-xl font-bold text-forest">Comparativa final: Odoo vs. Tango Nube</h3>
        <p className="mt-1 max-w-3xl text-sm text-muted text-justify">
          De cuatro soluciones evaluadas, los dos finalistas fueron Tango Nube y Odoo. Puntaje ponderado sobre 100:
        </p>
        <div className="mt-5">
          <VendorBars aName="Odoo" bName="Tango" aTotal={93.8} bTotal={52.9} bars={VENDOR_BARS} />
        </div>

        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/40 p-6">
          <h4 className="font-bold text-forest">Brechas críticas de Tango Nube</h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {TANGO_BRECHAS.map((b) => (
              <div key={b.t} className="rounded-xl bg-white p-4">
                <p className="text-sm font-semibold text-red-600">{b.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted text-justify">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs recomendación */}
      <div className="rounded-2xl bg-forest p-6 text-cream sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gold">Proveedor recomendado</p>
        <h3 className="mt-2 text-2xl font-bold">Odoo Enterprise, implementado por Adhoc SRL</h3>
        <p className="mt-3 max-w-3xl leading-relaxed text-cream/80 text-justify">
          Pesó su cobertura completa —clientes, proyectos, compras, contabilidad y portal—, su adecuación a una empresa sin área de sistemas, y su menor{' '}
          <Term onDark def="Costo Total de Propiedad (TCO): todo lo que cuesta tener y usar la solución durante 3 años (licencias, implementación, soporte)." href={DOCS.evalEconomica}>costo total a 3 años</Term>.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Puntaje obtenido', value: '93,8/100' },
            { label: 'Costo total a 3 años', value: '~USD 9.946' },
            { label: 'Ahorro vs. Tango', value: '53%' },
            { label: 'Licencia anual', value: 'USD 1.962' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-forest-dark/40 p-4 text-center">
              <p className="text-xl font-extrabold text-gold">{kpi.value}</p>
              <p className="mt-0.5 text-[11px] text-cream/70">{kpi.label}</p>
            </div>
          ))}
        </div>
      </div>

      <DocLinks>
        <DocLink href={DOCS.mercado}>Ver análisis de mercado (RFI)</DocLink>
        <DocLink href={DOCS.factibilidad}>Ver factibilidad</DocLink>
        <DocLink href={DOCS.evalEconomica}>Ver evaluación económica</DocLink>
        <DocLink href={DOCS.matrizRfp}>Ver matriz RFP</DocLink>
      </DocLinks>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  8 · PROVEEDORES
// ════════════════════════════════════════════════════════════════════════════════

type Proveedor = {
  name: string
  cat: string
  modalidad: string
  tco: string
  cobertura: string
  adecuacion: number
  estado: 'ELEGIDO' | 'FINALISTA' | 'DESCARTADO'
  fortalezas: string[]
  debilidades: string[]
  veredicto: string
}

const PROVEEDORES: Proveedor[] = [
  {
    name: 'Odoo Enterprise',
    cat: 'ERP integral · SaaS modular',
    modalidad: 'SaaS (nube)',
    tco: '~USD 9.946',
    cobertura: '6/6 · 100%',
    adecuacion: 90,
    estado: 'ELEGIDO',
    fortalezas: [
      'Cobertura completa: CRM, proyectos, compras, contabilidad y portal de clientes',
      '100% SaaS, sin servidores ni área de sistemas propia',
      'APIs abiertas para integrar FusionSolar, Modhub e IoT',
      'Implementación por etapas y partner local (Adhoc SRL, Gold Partner)',
    ],
    debilidades: ['La personalización avanzada requiere partner', 'Curva de aprendizaje inicial en algunos módulos'],
    veredicto: 'Mejor relación cobertura/costo y el que mejor se adapta a una PyME sin área de sistemas.',
  },
  {
    name: 'Tango Nube',
    cat: 'Gestión contable-comercial · SaaS',
    modalidad: 'SaaS (nube)',
    tco: '~USD 21.200',
    cobertura: '3/6 · 50%',
    adecuacion: 74,
    estado: 'FINALISTA',
    fortalezas: [
      'Muy fuerte en contabilidad y facturación',
      'Amplia adopción y soporte en el mercado local',
      'Modalidad SaaS, sin infraestructura propia',
    ],
    debilidades: [
      'Sin CRM/gestión de clientes estructurada ni portal de clientes',
      'Gestión de proyectos limitada',
      'Integración vía API más acotada (FusionSolar / IA)',
      'Mayor costo de licenciamiento que Odoo',
    ],
    veredicto: 'Finalista viable, pero pierde en cobertura funcional e integración frente a Odoo.',
  },
  {
    name: 'SAP S/4HANA',
    cat: 'ERP enterprise',
    modalidad: 'On-premise / cloud privada',
    tco: '~USD 95.000+',
    cobertura: '6/6 · 100%',
    adecuacion: 52,
    estado: 'DESCARTADO',
    fortalezas: [
      'Cobertura funcional total, de nivel enterprise',
      'Robustez y escalabilidad para grandes volúmenes',
      'Ecosistema, analítica y soporte global',
    ],
    debilidades: [
      'Costo de licenciamiento e implementación prohibitivo para una PyME',
      'Requiere un equipo técnico dedicado',
      'Tiempos de implementación largos',
      'Sobredimensionado para la operación actual de Nodek',
    ],
    veredicto: 'Excelente producto, pero inviable económica y operativamente en esta etapa. Descartado en preselección.',
  },
  {
    name: 'Xubio',
    cat: 'Contabilidad en la nube · SaaS',
    modalidad: 'SaaS (nube)',
    tco: '~USD 6.800',
    cobertura: '2/6 · 33%',
    adecuacion: 56,
    estado: 'DESCARTADO',
    fortalezas: [
      'La opción más económica',
      'Simple y rápido de adoptar',
      'Adecuado para facturación y contabilidad básica',
    ],
    debilidades: [
      'No cubre gestión de proyectos, compras ni CRM',
      'Sin portal de clientes ni dashboards avanzados',
      'No resuelve el núcleo del problema de Nodek',
    ],
    veredicto: 'Buena herramienta contable, pero no es un ERP integral. Descartado por cobertura insuficiente.',
  },
]

const ESTADO_STYLE: Record<string, string> = {
  ELEGIDO: 'bg-forest text-cream',
  FINALISTA: 'bg-gold text-forest-dark',
  DESCARTADO: 'bg-gray-200 text-gray-600',
}

// Matriz de preselección (RFI)
type RFICell = 'si' | 'parcial' | 'no'
const RFI_COLS = ['Modalidad SaaS', 'Cobertura funcional', 'Viabilidad económica', 'Integración / APIs', 'Soporte local']
const RFI_ROWS: { name: string; cells: RFICell[]; pasa: boolean }[] = [
  { name: 'Odoo Enterprise', cells: ['si', 'si', 'si', 'si', 'si'], pasa: true },
  { name: 'Tango Nube', cells: ['si', 'parcial', 'parcial', 'parcial', 'si'], pasa: true },
  { name: 'SAP S/4HANA', cells: ['parcial', 'si', 'no', 'si', 'si'], pasa: false },
  { name: 'Xubio', cells: ['si', 'no', 'si', 'parcial', 'parcial'], pasa: false },
]

function RFIMark({ v }: { v: RFICell }) {
  const map = {
    si: { ch: '✓', cls: 'bg-emerald-100 text-emerald-700' },
    parcial: { ch: '◐', cls: 'bg-amber-100 text-amber-700' },
    no: { ch: '✕', cls: 'bg-red-100 text-red-600' },
  }[v]
  return <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${map.cls}`}>{map.ch}</span>
}

const TCO_BARS = [
  { label: 'SAP S/4HANA', value: 95000, display: '~USD 95.000+', color: '#dc2626', note: 'Costo prohibitivo para una PyME' },
  { label: 'Tango Nube', value: 21200, display: '~USD 21.200', color: '#c9a030' },
  { label: 'Odoo Enterprise', value: 9946, display: '~USD 9.946', color: '#1a4a38', winner: true, note: 'Menor costo entre las soluciones con cobertura completa' },
  { label: 'Xubio', value: 6800, display: '~USD 6.800', color: '#9ca3af', note: 'Barato, pero sin cobertura suficiente' },
]

const COBERTURA_BARS = [
  { label: 'Odoo Enterprise', value: 100, display: '100% · 6/6', color: '#1a4a38', winner: true },
  { label: 'SAP S/4HANA', value: 100, display: '100% · 6/6', color: '#2a6b52', note: 'Cubre todo, pero sobredimensionado' },
  { label: 'Tango Nube', value: 50, display: '50% · 3/6', color: '#c9a030' },
  { label: 'Xubio', value: 33, display: '33% · 2/6', color: '#9ca3af' },
]

const ADECUACION_BARS = [
  { label: 'Odoo Enterprise', value: 90, display: '90 / 100', color: '#1a4a38', winner: true },
  { label: 'Tango Nube', value: 74, display: '74 / 100', color: '#c9a030', note: 'Avanza al RFP' },
  { label: 'Xubio', value: 56, display: '56 / 100', color: '#9ca3af', note: 'Descartado: cobertura insuficiente' },
  { label: 'SAP S/4HANA', value: 52, display: '52 / 100', color: '#9ca3af', note: 'Descartado: inviabilidad económica' },
]

export function ProveedoresSection() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Etapa 3 · Benchmarking"
        title="Cómo evaluamos a cada proveedor"
        intro="La selección se hizo en dos etapas y con criterios objetivos, no por preferencia. Primero un relevamiento amplio del mercado (RFI) para preseleccionar, y luego una evaluación detallada (RFP) de los finalistas."
      />

      {/* Funnel */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { n: '4', t: 'Soluciones evaluadas', d: 'Odoo, Tango Nube, SAP S/4HANA y Xubio', cls: 'bg-white border-forest/15' },
          { n: '2', t: 'Finalistas (RFI)', d: 'Odoo y Tango Nube pasan al RFP', cls: 'bg-gold/10 border-gold/40' },
          { n: '1', t: 'Elegido (RFP)', d: 'Odoo Enterprise, con 93,8/100', cls: 'bg-forest text-cream border-forest' },
        ].map((s, i) => (
          <div key={s.t} className={`relative rounded-2xl border p-5 ${s.cls}`}>
            <p className={`text-4xl font-extrabold ${i === 2 ? 'text-gold' : 'text-forest'}`}>{s.n}</p>
            <p className={`mt-1 text-sm font-bold ${i === 2 ? 'text-cream' : 'text-forest'}`}>{s.t}</p>
            <p className={`mt-1 text-xs leading-relaxed ${i === 2 ? 'text-cream/75' : 'text-muted'}`}>{s.d}</p>
          </div>
        ))}
      </div>

      {/* Matriz de preselección RFI */}
      <div>
        <h3 className="text-xl font-bold text-forest">Etapa 1 · Matriz de preselección (RFI)</h3>
        <p className="mt-1 max-w-3xl text-sm text-muted text-justify">
          Filtramos las soluciones según cinco criterios de viabilidad. La cobertura funcional y la viabilidad económica actuaron como criterios excluyentes.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-forest/15 bg-white">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-forest/10 bg-cream">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted">Proveedor</th>
                {RFI_COLS.map((c) => (
                  <th key={c} className="px-3 py-3 text-center text-[11px] font-bold uppercase tracking-wide text-muted">{c}</th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-muted">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {RFI_ROWS.map((r) => (
                <tr key={r.name} className="border-b border-forest/10 last:border-0">
                  <td className="px-4 py-3 font-semibold text-forest">{r.name}</td>
                  {r.cells.map((c, i) => (
                    <td key={i} className="px-3 py-3 text-center"><RFIMark v={c} /></td>
                  ))}
                  <td className="px-4 py-3 text-center">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${r.pasa ? 'bg-forest text-cream' : 'bg-gray-200 text-gray-600'}`}>
                      {r.pasa ? 'Avanza' : 'Descartado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-[11px] font-medium text-muted">
          <span className="flex items-center gap-1.5"><RFIMark v="si" /> Cumple</span>
          <span className="flex items-center gap-1.5"><RFIMark v="parcial" /> Parcial</span>
          <span className="flex items-center gap-1.5"><RFIMark v="no" /> No cumple</span>
        </div>
      </div>

      {/* Gráficos comparativos */}
      <div>
        <h3 className="text-xl font-bold text-forest">Los números detrás de la decisión</h3>
        <p className="mt-1 max-w-3xl text-sm text-muted text-justify">
          Tres lentes que explican por qué avanzaron Odoo y Tango: costo total, cobertura funcional y un índice de adecuación a las necesidades de Nodek.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <RankBars items={TCO_BARS} max={95000} caption="Costo total de propiedad a 3 años (TCO)" />
          <RankBars items={COBERTURA_BARS} max={100} caption="Cobertura de los 6 módulos requeridos" />
        </div>
        <div className="mt-4">
          <RankBars items={ADECUACION_BARS} max={100} caption="Índice de adecuación a Nodek (preselección RFI)" />
        </div>
        <p className="mt-3 rounded-lg border border-forest/10 bg-cream px-4 py-3 text-xs leading-relaxed text-muted text-justify">
          <strong className="text-forest">Nota metodológica:</strong> SAP obtuvo la máxima cobertura funcional, pero su costo (10× el de Odoo) y su complejidad de implementación lo hicieron inviable para una PyME sin área de sistemas. Xubio fue el más económico, pero cubre apenas un tercio de los módulos requeridos. Por eso, pese a sus fortalezas puntuales, ambos quedaron fuera antes del RFP.
        </p>
      </div>

      {/* Fichas por proveedor */}
      <div>
        <h3 className="text-xl font-bold text-forest">Ficha de cada proveedor evaluado</h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {PROVEEDORES.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-6 ${p.estado === 'ELEGIDO' ? 'border-forest bg-forest/[0.04] ring-1 ring-forest' : 'border-forest/15 bg-white'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-lg font-bold text-forest">{p.name}</h4>
                  <p className="text-xs text-muted">{p.cat}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${ESTADO_STYLE[p.estado]}`}>{p.estado}</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { l: 'Modalidad', v: p.modalidad },
                  { l: 'TCO 3 años', v: p.tco },
                  { l: 'Cobertura', v: p.cobertura },
                ].map((m) => (
                  <div key={m.l} className="rounded-lg bg-cream p-2.5 text-center">
                    <p className="text-[13px] font-bold leading-tight text-forest">{m.v}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{m.l}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">Fortalezas</p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {p.fortalezas.map((f) => (
                      <li key={f} className="flex gap-1.5 text-xs leading-snug text-ink/80"><span className="text-emerald-600">✓</span>{f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-red-600">Debilidades</p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {p.debilidades.map((d) => (
                      <li key={d} className="flex gap-1.5 text-xs leading-snug text-ink/80"><span className="text-red-500">✕</span>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-4 border-t border-forest/10 pt-3 text-xs leading-relaxed text-ink/75 text-justify">
                <span className="font-semibold text-forest">Veredicto: </span>{p.veredicto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RFP final */}
      <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gold">Etapa 2 · RFP</p>
        <h3 className="mt-2 text-xl font-bold text-forest">Cara a cara final: Odoo vs. Tango Nube</h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink/85 text-justify">
          Los dos finalistas pasaron a una evaluación ponderada sobre los cuatro criterios (funcional 40%, técnico 25%, económico 20%, proveedor 15%). Odoo se impuso <strong>93,8 a 52,9</strong>, con ventaja en los cuatro criterios y de forma decisiva en cobertura funcional y costo. El detalle completo, con el puntaje por criterio, está en la sección{' '}
          <span className="font-semibold text-forest">Evaluación</span>.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3">
            <span className="text-3xl font-extrabold text-forest">93,8</span>
            <div>
              <p className="text-sm font-bold text-forest">Odoo</p>
              <p className="text-[11px] text-emerald-700">Elegido</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3">
            <span className="text-3xl font-extrabold text-muted">52,9</span>
            <div>
              <p className="text-sm font-bold text-forest">Tango Nube</p>
              <p className="text-[11px] text-muted">Finalista</p>
            </div>
          </div>
        </div>
      </div>

      <DocLinks>
        <DocLink href={DOCS.mercado}>Ver análisis de mercado (RFI)</DocLink>
        <DocLink href={DOCS.factibilidad}>Ver factibilidad (RFP)</DocLink>
        <DocLink href={DOCS.propuestaComercial}>Ver propuesta comercial</DocLink>
      </DocLinks>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  9 · CIERRE
// ════════════════════════════════════════════════════════════════════════════════

const LOGROS = [
  'Entender en profundidad los procesos y dificultades operativas actuales de Nodek.',
  'Diseñar una arquitectura destino clara, realista y escalable.',
  'Evaluar de manera objetiva las mejores soluciones del mercado.',
  'Seleccionar la alternativa más sólida en términos funcionales, técnicos y económicos.',
]

const CONSIDERACIONES = [
  { icon: '🔍', q: '¿Qué oportunidades de mejora detectamos?', a: 'Una fuerte fragmentación de la información y dependencia de personas clave, con procesos manuales que afectan la trazabilidad y la escalabilidad.' },
  { icon: '💡', q: '¿Cuál fue la solución propuesta?', a: 'Una arquitectura integrada sobre un ERP SaaS que centraliza la operación, más una IA para licitaciones en una segunda fase.' },
  { icon: '✅', q: '¿Por qué es viable?', a: 'Implementación en la nube y por etapas, con bajo costo inicial y adopción gradual, adecuada a una PyME sin área de sistemas.' },
  { icon: '🚀', q: '¿Qué impacto esperamos?', a: 'Más licitaciones ganadas, decisiones basadas en datos y una organización preparada para su expansión geográfica y de escala.' },
]

export function CierreSection() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="Etapa 4 · Cierre"
        title="Conclusiones del proyecto"
        intro="A modo de cierre, presentamos las conclusiones generales del proyecto de transformación realizado para Nodek Energía."
      />

      <div className="rounded-2xl border border-forest/15 bg-white p-6 sm:p-8">
        <h3 className="font-bold text-forest">El proyecto permitió:</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {LOGROS.map((l) => (
            <li key={l} className="flex items-start gap-3 text-ink/85">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">✓</span>
              {l}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border-l-4 border-l-forest bg-cream p-5 text-forest">
          <p className="leading-relaxed text-justify">
            <strong>Odoo Enterprise representa la solución óptima para digitalizar Nodek</strong> y acompañar su crecimiento futuro, ofreciendo orden, trazabilidad y una base tecnológica sostenible, con un costo total accesible para la compañía.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-forest">Consideraciones finales</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {CONSIDERACIONES.map((c) => (
            <div key={c.q} className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-5">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <h4 className="font-semibold text-forest">{c.q}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted text-justify">{c.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DocLinks>
        <DocLink href={DOCS.cierre}>Ver documento de cierre</DocLink>
      </DocLinks>
    </div>
  )
}
