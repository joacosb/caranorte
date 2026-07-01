'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { Tech } from './ui'

// ════════════════════════════════════════════════════════════════════════════════
//  ORGANIGRAMA NODEK
// ════════════════════════════════════════════════════════════════════════════════

function OrgBox({ name, role, accent }: { name: string; role: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center shadow-sm ${
        accent
          ? 'border-gold bg-gold/15'
          : 'border-forest/15 bg-white'
      }`}
    >
      <p className="text-xs font-bold leading-tight text-forest">{name}</p>
      <p className="mt-0.5 text-[10px] leading-tight text-muted">{role}</p>
    </div>
  )
}

export function OrgChart() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-forest/10 bg-cream p-6">
      <div className="min-w-[760px]">
        {/* Director */}
        <div className="flex justify-center">
          <div className="w-56">
            <OrgBox name="Pablo Grosso" role="Director General" accent />
          </div>
        </div>
        <div className="mx-auto my-3 h-5 w-px bg-forest/25" />

        {/* Línea de responsables */}
        <div className="relative">
          <div className="absolute left-[10%] right-[10%] top-0 border-t border-forest/25" />
          <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
            {/* Columna 1 */}
            <div className="flex flex-col gap-3">
              <OrgBox name="Leandro Fuentes" role="Desarrollo de Negocio NEA" />
              <OrgBox name="Equipo Comercial" role="Corrientes" />
            </div>
            {/* Columna 2 */}
            <div className="flex flex-col gap-3">
              <OrgBox name="Santiago Sosa" role="Resp. Tecnología y Proyectos" />
              <OrgBox name="Camila Delgado" role="Ofertista" />
              <OrgBox name="Oferta X" role="Preparación de propuestas" />
            </div>
            {/* Columna 3 — sponsor */}
            <div className="flex flex-col gap-3">
              <OrgBox name="Matías Grosso" role="Resp. Técnico-Comercial · Sponsor" accent />
              <OrgBox name="Rafael Rossetti" role="Resp. de Ejecución" />
              <OrgBox name="Ariel Jacobo" role="Resp. de Operaciones" />
              <OrgBox name="Analista" role="Protecciones, licitaciones y normativa" />
            </div>
            {/* Columna 4 */}
            <div className="flex flex-col gap-3">
              <OrgBox name="Natalia Roger" role="Resp. de Administración" />
              <OrgBox name="Andrea" role="Líder de Administración" />
              <OrgBox name="Elizabeth Lehue" role="Analista de administración" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-md bg-forest-dark px-3 py-1.5 text-[11px] font-semibold text-cream">PARTNERS</span>
          <span className="rounded-md bg-forest/10 px-3 py-1.5 text-[11px] font-semibold text-forest">Marketing &amp; Comunicación</span>
          <span className="rounded-md bg-forest/10 px-3 py-1.5 text-[11px] font-semibold text-forest">PM / Desarrollo de Proveedores · Supply</span>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  MAPA DE PROCESOS
// ════════════════════════════════════════════════════════════════════════════════

function ProcBox({ children, sub }: { children: ReactNode; sub?: string[] }) {
  return (
    <div className="flex flex-1 flex-col rounded-lg border border-forest/20 bg-white p-3 text-center">
      <span className="text-xs font-semibold leading-tight text-forest">{children}</span>
      {sub && (
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {sub.map((s) => (
            <span key={s} className="rounded bg-forest/10 px-1.5 py-0.5 text-[9px] font-medium text-forest">{s}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function ProcRow({ label, color, children }: { label: string; color: string; children: ReactNode }) {
  return (
    <div className="flex items-stretch gap-3">
      <div className={`flex w-32 shrink-0 items-center justify-center rounded-lg px-2 py-3 text-center text-[11px] font-bold uppercase leading-tight tracking-wide text-cream ${color}`}>
        {label}
      </div>
      <div className="flex flex-1 flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function ProcessMap() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-forest/10 bg-cream p-5">
      <div className="min-w-[720px]">
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-forest-dark px-4 py-2">
          <span className="text-sm font-extrabold tracking-tight text-gold">NODEK</span>
          <span className="text-sm font-semibold text-cream">· Mapa de Procesos</span>
        </div>

        <div className="flex gap-3">
          {/* Cliente izquierda */}
          <div className="flex w-8 shrink-0 items-center justify-center rounded-lg bg-forest text-[11px] font-bold uppercase tracking-widest text-cream [writing-mode:vertical-rl] rotate-180">
            Cliente
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <ProcRow label="Estratégicos y de evaluación" color="bg-forest">
              <ProcBox>Planificación estratégica y crecimiento</ProcBox>
              <ProcBox>Desarrollo de nuevos productos y servicios</ProcBox>
              <ProcBox>Gestión comercial y desarrollo de negocio</ProcBox>
              <ProcBox>Evaluación y control de gestión</ProcBox>
            </ProcRow>

            <ProcRow label="Operativos" color="bg-forest-light">
              <ProcBox>Relevamiento y diagnóstico energético</ProcBox>
              <ProcBox>Diseño y propuesta</ProcBox>
              <ProcBox>Instalación</ProcBox>
              <ProcBox>Puesta en marcha</ProcBox>
              <ProcBox>Mantenimiento</ProcBox>
            </ProcRow>

            <ProcRow label="De apoyo" color="bg-gold-dark">
              <ProcBox sub={['Pre venta', 'Post venta', 'Licitación']}>Gestión comercial</ProcBox>
              <ProcBox>Compras</ProcBox>
              <ProcBox>Administración y finanzas</ProcBox>
              <ProcBox>R.R.H.H.</ProcBox>
              <ProcBox>Logística</ProcBox>
            </ProcRow>
          </div>

          {/* Cliente derecha */}
          <div className="flex w-8 shrink-0 items-center justify-center rounded-lg bg-forest text-[11px] font-bold uppercase tracking-widest text-cream [writing-mode:vertical-rl]">
            Cliente
          </div>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  MATRIZ DE ARQUITECTURA (Aplicación / Datos-Tecnología)
// ════════════════════════════════════════════════════════════════════════════════

type ArchRow = { proceso: string; apps: string[] }
type ArchBlock = { titulo: string; color: string; rows: ArchRow[]; cloud: string[] }

export function ArchMatrix({ block }: { block: ArchBlock }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-forest/15 bg-white">
      <div className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-cream ${block.color}`}>
        {block.titulo}
      </div>
      <div className="grid grid-cols-[1.1fr_1.4fr] divide-x divide-forest/10 sm:grid-cols-[1fr_1.3fr_1fr]">
        {/* Columna proceso + aplicación */}
        <div className="col-span-2 grid grid-cols-[1fr_1.3fr] divide-x divide-forest/10 sm:col-span-2 sm:contents">
          <div className="divide-y divide-forest/10">
            <div className="bg-cream px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-muted">Proceso</div>
            {block.rows.map((r) => (
              <div key={r.proceso} className="flex items-center px-4 py-3 text-xs font-medium text-forest">{r.proceso}</div>
            ))}
          </div>
          <div className="divide-y divide-forest/10">
            <div className="bg-cream px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-muted">Aplicación</div>
            {block.rows.map((r) => (
              <div key={r.proceso} className="flex flex-wrap items-center gap-1.5 px-4 py-3">
                {r.apps.map((a) => (
                  <Tech key={a} name={a} />
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Datos / tecnología (nube) */}
        <div className="col-span-2 border-t border-forest/10 sm:col-span-1 sm:border-t-0">
          <div className="bg-cream px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-muted">Datos / Tecnología</div>
          <div className="flex h-[calc(100%-2rem)] flex-col items-center justify-center gap-2 p-5">
            <span className="text-3xl">☁️</span>
            <div className="flex flex-wrap justify-center gap-1.5">
              {block.cloud.map((c) => (
                <Tech key={c} name={c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  BRECHAS — tabs interactivas (una por brecha)
// ════════════════════════════════════════════════════════════════════════════════

export type Gap = { tab: string; icon: string; titulo: string; brecha: string; propuesta: string; fase?: string }

export function GapTabs({ gaps }: { gaps: Gap[] }) {
  const [active, setActive] = useState(0)
  const g = gaps[active]
  return (
    <div className="overflow-hidden rounded-2xl border border-forest/15 bg-white shadow-sm">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-forest p-2">
        {gaps.map((gap, i) => (
          <button
            key={gap.tab}
            onClick={() => setActive(i)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              i === active ? 'bg-cream text-forest' : 'text-cream/70 hover:bg-white/10 hover:text-cream'
            }`}
          >
            {gap.tab}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:p-8">
        <div className="flex flex-col items-center justify-center gap-3 sm:w-44">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-4xl">{g.icon}</div>
          <p className="text-center text-sm font-bold uppercase leading-tight tracking-wide text-forest">{g.titulo}</p>
          {g.fase && (
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase text-forest-dark">{g.fase}</span>
          )}
        </div>
        <div>
          <div className="border-b border-forest/10 pb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600">Brecha</p>
            <p className="mt-2 leading-relaxed text-ink/85 text-justify">{g.brecha}</p>
          </div>
          <div className="pt-5">
            <p className="text-xs font-bold uppercase tracking-widest text-forest">Propuesta</p>
            <p className="mt-2 leading-relaxed text-ink/85 text-justify">{g.propuesta}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  DONUT DE CRITERIOS
// ════════════════════════════════════════════════════════════════════════════════

type Criterio = { label: string; pct: number; color: string; desc: string }

export function CriteriaDonut({ criterios }: { criterios: Criterio[] }) {
  const R = 70
  const C = 2 * Math.PI * R
  let acc = 0
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
      <div className="mx-auto">
        <svg viewBox="0 0 180 180" className="h-48 w-48">
          <g transform="translate(90,90) rotate(-90)">
            {criterios.map((c, i) => {
              const len = (c.pct / 100) * C
              const seg = (
                <circle
                  key={c.label}
                  r={R}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={hover === i ? 30 : 24}
                  strokeDasharray={`${len} ${C - len}`}
                  strokeDashoffset={-acc}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer transition-[stroke-width] duration-150"
                />
              )
              acc += len
              return seg
            })}
          </g>
          <text x="90" y="84" textAnchor="middle" className="fill-forest text-[13px] font-bold">Modelo de</text>
          <text x="90" y="100" textAnchor="middle" className="fill-forest text-[13px] font-bold">evaluación</text>
        </svg>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {criterios.map((c, i) => (
          <div
            key={c.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`rounded-xl border p-4 transition-colors ${hover === i ? 'border-forest/40 bg-cream' : 'border-forest/10 bg-white'}`}
          >
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm" style={{ background: c.color }} />
              <span className="text-sm font-semibold text-forest">{c.label}</span>
              <span className="ml-auto text-lg font-extrabold text-forest">{c.pct}%</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted text-justify">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  COMPARATIVA DE PROVEEDORES (barras ponderadas)
// ════════════════════════════════════════════════════════════════════════════════

type Bar = { criterio: string; a: number; b: number; max: number }

export function VendorBars({
  aName,
  bName,
  aTotal,
  bTotal,
  bars,
}: {
  aName: string
  bName: string
  aTotal: number
  bTotal: number
  bars: Bar[]
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
      {/* Puntajes globales */}
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-forest p-5 text-center lg:w-40">
          <p className="text-4xl font-extrabold text-gold">{aTotal}</p>
          <p className="mt-1 text-sm font-semibold text-cream">{aName}</p>
          <span className="mt-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase text-forest-dark">Elegido</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-forest/15 bg-white p-5 text-center lg:w-40">
          <p className="text-4xl font-extrabold text-muted">{bTotal}</p>
          <p className="mt-1 text-sm font-semibold text-forest">{bName}</p>
          <span className="mt-2 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-600">Descartado</span>
        </div>
      </div>

      {/* Barras por criterio */}
      <div className="rounded-2xl border border-forest/10 bg-white p-5">
        <p className="mb-4 text-sm font-semibold text-forest">Puntaje ponderado por criterio</p>
        <div className="flex flex-col gap-3.5">
          {bars.map((bar) => (
            <div key={bar.criterio}>
              <div className="mb-1 flex justify-between text-[11px] font-medium text-muted">
                <span>{bar.criterio}</span>
                <span>
                  <span className="font-bold text-forest">{bar.a}</span> vs {bar.b}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-3 rounded-full bg-cream">
                  <div className="h-3 rounded-full bg-forest" style={{ width: `${(bar.a / bar.max) * 100}%` }} />
                </div>
                <div className="h-3 rounded-full bg-cream">
                  <div className="h-3 rounded-full bg-gold-dark/60" style={{ width: `${(bar.b / bar.max) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4 border-t border-forest/10 pt-3 text-[11px] font-medium">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-forest" /> {aName}</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-gold-dark/60" /> {bName}</span>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  RANKING DE BARRAS HORIZONTALES (costos, cobertura, etc.)
// ════════════════════════════════════════════════════════════════════════════════

export type RankItem = { label: string; value: number; display: string; color: string; note?: string; winner?: boolean }

export function RankBars({ items, max, caption }: { items: RankItem[]; max: number; caption?: string }) {
  return (
    <div className="rounded-2xl border border-forest/10 bg-white p-5">
      {caption && <p className="mb-4 text-sm font-semibold text-forest">{caption}</p>}
      <div className="flex flex-col gap-4">
        {items.map((it) => (
          <div key={it.label}>
            <div className="mb-1 flex items-center justify-between gap-2 text-xs">
              <span className={`font-semibold ${it.winner ? 'text-forest' : 'text-ink/80'}`}>
                {it.winner && '★ '}{it.label}
              </span>
              <span className="font-bold text-forest">{it.display}</span>
            </div>
            <div className="h-5 overflow-hidden rounded-full bg-cream">
              <div
                className="flex h-5 items-center justify-end rounded-full pr-2 transition-[width] duration-500"
                style={{ width: `${Math.max((it.value / max) * 100, 4)}%`, background: it.color }}
              />
            </div>
            {it.note && <p className="mt-1 text-[11px] leading-snug text-muted">{it.note}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  ESCENARIOS DE IMPLEMENTACIÓN (pros/contras)
// ════════════════════════════════════════════════════════════════════════════════

type Scenario = { n: number; title: string; pros: string[]; contras: string[]; selected?: boolean }

export function ScenarioCards({ scenarios }: { scenarios: Scenario[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {scenarios.map((s) => (
        <div
          key={s.n}
          className={`rounded-2xl border p-5 ${
            s.selected ? 'border-forest bg-forest/[0.04] ring-1 ring-forest' : 'border-forest/15 bg-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${s.selected ? 'bg-forest text-cream' : 'bg-forest/10 text-forest'}`}>{s.n}</span>
            <h4 className="font-bold text-forest">{s.title}</h4>
            {s.selected && (
              <span className="ml-auto rounded-full bg-forest px-2 py-0.5 text-[10px] font-bold uppercase text-cream">Seleccionado</span>
            )}
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">Pros</p>
            <ul className="mt-1 flex flex-col gap-1">
              {s.pros.map((p) => (
                <li key={p} className="flex gap-2 text-xs text-ink/80"><span className="text-emerald-600">✓</span>{p}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-red-600">Contras</p>
            <ul className="mt-1 flex flex-col gap-1">
              {s.contras.map((c) => (
                <li key={c} className="flex gap-2 text-xs text-ink/80"><span className="text-red-500">✗</span>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
//  SERVICIOS NODEK — acordeón numerado interactivo
// ════════════════════════════════════════════════════════════════════════════════

type Service = { n: number; title: string; items: string[] }

export function ServicesAccordion({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => {
        const isOpen = open === i
        return (
          <button
            key={s.n}
            onClick={() => setOpen(i)}
            className={`flex flex-col rounded-2xl p-5 text-left transition-all ${
              isOpen ? 'bg-forest text-cream shadow-lg' : 'bg-white text-forest border border-forest/15 hover:border-gold'
            }`}
          >
            <span className={`text-5xl font-extrabold leading-none ${isOpen ? 'text-gold' : 'text-forest/20'}`}>{s.n}</span>
            <h4 className={`mt-3 text-sm font-bold leading-tight ${isOpen ? 'text-cream' : 'text-forest'}`}>{s.title}</h4>
            <ul className={`grid transition-all duration-300 ${isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <li className="overflow-hidden">
                <ul className="flex flex-col gap-1.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-1.5 text-[11px] leading-snug text-cream/85">
                      <span className="text-gold">›</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            {!isOpen && <span className="mt-3 text-[11px] font-medium text-muted">Ver detalle +</span>}
          </button>
        )
      })}
    </div>
  )
}
