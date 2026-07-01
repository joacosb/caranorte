'use client'

import type { ReactNode } from 'react'

// ── Links a los documentos de trabajo (Google Drive) ───────────────────────────
export const DOCS = {
  caso: 'https://drive.google.com/file/d/1Bgl5hF1eRC4swFiIbeBxK2edNOnG3K_O/view',
  diagnostico: 'https://drive.google.com/file/d/1FWhLmoOVwH5u1f8MP0iV7Bwcq9-1IYJ3/view',
  arqOrigen: 'https://drive.google.com/file/d/1BMTcMNQc1840Mp2xvVhQNOIJRj-49NhU/view',
  innovacion: 'https://drive.google.com/file/d/1gHOiWZLshjmLEKbWJtjtW_7kDjEOIubo/view',
  arqDestino: 'https://drive.google.com/file/d/1fEL3E4Z9JWYw-zvgWcCPZRmcheMG5wGz/view',
  arqDiagrama: 'https://drive.google.com/file/d/1D4K8R131H83eBuKXRX3GNda5xfNKM14U/view',
  brechas: 'https://drive.google.com/file/d/1HEQ3EqduOQ-kZ-xcdWEdQT2QGtlK0oMR/view',
  matriz: 'https://drive.google.com/file/d/1C_VSgxqj9wArtktDCnKxoi3tgyJecNyM/view',
  alcance: 'https://drive.google.com/file/d/16GCHuQ6kY1-44zt8ihgOBAWJzCkNK2Zc/view',
  gantt: 'https://drive.google.com/file/d/1tOs5rduqIUdNVWRLaxeEp8VtHl4UQ92J/view',
  mercado: 'https://drive.google.com/file/d/1x_O45p2JA4J5QUP6kgjN2ZFuSR5lZ54U/view',
  factibilidad: 'https://drive.google.com/file/d/1lKhG9pnU5v6YfbmauyivJKpk5lqgEgn1/view',
  matrizRfp: 'https://drive.google.com/file/d/1kN9rg8Fv73RuH9Clo7kWfU9T4ZT6DI2B/view',
  evalEconomica: 'https://drive.google.com/file/d/11blAIWRGa66i9Dv3BTrf_HWWopEi7oRO/view',
  propuestaComercial: 'https://drive.google.com/file/d/1QXw_UEIFqxCoGoCNycGRjtYp3suafaQ-/view',
  cierre: 'https://drive.google.com/file/d/11NePQLoEcNaROd_eS5qJxkLAMb6pjsQG/view',
}

// ── Término técnico con explicación al pasar el mouse + link al documento ───────
export function Term({ children, def, href }: { children: ReactNode; def: string; href?: string }) {
  const content = (
    <span className="font-semibold text-forest decoration-gold decoration-dotted underline underline-offset-2">
      {children}
    </span>
  )
  return (
    <span className="group relative inline-block">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-forest-light">
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

// ── Encabezado de sección ───────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-widest text-gold">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-forest sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted text-justify">{intro}</p>}
    </div>
  )
}

// ── Botón/link a documento ──────────────────────────────────────────────────────
export function DocLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-forest/25 bg-white px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-cream"
    >
      📄 {children}
    </a>
  )
}

export function DocLinks({ children }: { children: ReactNode }) {
  return <div className="mt-10 flex flex-wrap gap-2 border-t border-forest/10 pt-6">{children}</div>
}

// ── Badge de tecnología (chip) ──────────────────────────────────────────────────
const TECH_COLORS: Record<string, string> = {
  'Google Drive': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Gmail: 'bg-red-50 text-red-700 border-red-200',
  'Office 365': 'bg-orange-50 text-orange-700 border-orange-200',
  Trello: 'bg-sky-50 text-sky-700 border-sky-200',
  WhatsApp: 'bg-green-50 text-green-700 border-green-200',
  Modhub: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  FusionSolar: 'bg-pink-50 text-pink-700 border-pink-200',
  'Smart Design': 'bg-blue-50 text-blue-700 border-blue-200',
  'aconpy.com': 'bg-teal-50 text-teal-700 border-teal-200',
  LinkedIn: 'bg-blue-50 text-blue-700 border-blue-200',
  ERP: 'bg-forest text-cream border-forest',
  'ERP (Odoo)': 'bg-forest text-cream border-forest',
  IA: 'bg-gold text-forest-dark border-gold-dark',
  'API': 'bg-purple-50 text-purple-700 border-purple-200',
}

export function Tech({ name }: { name: string }) {
  const cls = TECH_COLORS[name] ?? 'bg-gray-100 text-gray-700 border-gray-300'
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${cls}`}>
      {name}
    </span>
  )
}
