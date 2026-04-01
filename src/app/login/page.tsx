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
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-zinc-950/95 p-8 rounded-2xl shadow-xl w-full max-w-md border border-cyan-700">
        <Link href="/" className="text-3xl font-bold text-cyan-300 mb-2 hover:text-cyan-200 transition-colors block">
          CaraNorte
        </Link>
        <p className="text-cyan-200 mb-6">Ingresá a tu panel de clientes y proyectos</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre de la empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="bg-zinc-900 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-300"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-900 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-300"
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}