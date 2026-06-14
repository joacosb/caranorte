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
  const [empresa, setEmpresa] = useState('')
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
      if (empresa.trim()) {
        localStorage.setItem('empresa', empresa.trim())
      }
      router.push('/dashboard')
    } else {
      setError('Email o contraseña incorrectos')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-forest/15">
        <Link href="/" className="text-3xl font-bold text-forest mb-2 hover:text-forest-light transition-colors block">
          Cara<span className="text-gold">Norte</span>
        </Link>
        <p className="text-muted mb-6">Ingresá a tu panel de clientes y proyectos</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre de la empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="bg-cream text-ink rounded-lg px-4 py-3 outline-none border border-forest/15 focus:ring-2 focus:ring-gold"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-cream text-ink rounded-lg px-4 py-3 outline-none border border-forest/15 focus:ring-2 focus:ring-gold"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-cream text-ink rounded-lg px-4 py-3 outline-none border border-forest/15 focus:ring-2 focus:ring-gold"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-gold hover:bg-gold-dark text-forest-dark font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}