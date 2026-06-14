'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Validación simple de acceso (sin backend)
const VALID_EMAIL = 'cliente@nodek.com'
const VALID_PASSWORD = 'Nodek123'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem('auth', 'true')
      localStorage.setItem('email', VALID_EMAIL)
      router.push('/dashboard')
    } else {
      setError('Email o contraseña incorrectos')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest px-4">
      <div className="w-full max-w-md rounded-2xl border border-forest/10 bg-white p-8 shadow-xl sm:p-10">
        <Link
          href="/"
          className="mb-1 block text-3xl font-extrabold tracking-tight text-forest transition-colors hover:text-forest-light"
        >
          Cara<span className="text-gold">Norte</span>
        </Link>
        <p className="mb-8 text-sm text-muted">Ingresá a tu panel de clientes y proyectos</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-forest/15 bg-cream px-4 py-3 text-ink outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-forest/15 bg-cream px-4 py-3 text-ink outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-gold py-3 font-semibold text-forest-dark transition-colors hover:bg-gold-dark disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
