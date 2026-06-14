'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
    } else {
      if (empresa.trim()) {
        localStorage.setItem('empresa', empresa.trim())
      }
      router.push('/dashboard')
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