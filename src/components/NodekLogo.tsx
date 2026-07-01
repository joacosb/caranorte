'use client'

import { useState } from 'react'

/**
 * Logo del cliente Nodek Energía.
 * Renderiza el archivo en `public/clients/nodek.png`; si no existe (o falla la
 * carga), cae automáticamente a un wordmark tipográfico para no dejar un hueco.
 */
export function NodekLogo({
  className = '',
  wordmarkClassName = 'font-extrabold tracking-tight',
}: {
  className?: string
  wordmarkClassName?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={wordmarkClassName}>
        Nodek<span className="text-gold"> Energía</span>
      </span>
    )
  }

  return (
    <img
      src="/clients/nodek.png"
      alt="Nodek Energía"
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
