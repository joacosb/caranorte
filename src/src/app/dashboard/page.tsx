'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setEmail(user.email ?? '')
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">NODEK</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
        <p className="text-gray-400 mb-6">Bienvenido, {email}</p>
        <div className="bg-gray-900 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Tus proyectos</h2>
          <p className="text-gray-400">Próximamente vas a ver el avance de tus proyectos acá.</p>
        </div>
      </div>
    </div>
  )
}