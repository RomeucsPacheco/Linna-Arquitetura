'use client'

import { useState} from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter} from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Tenta fazer login usando o Supabase Auth
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            //Mensagem generica por segurança (RNF01)
            setError('Credenciais inválidas. tente novamente')
        } else {
            //Se der certo, manda para o dashboard
            router.push('/admin/dashboard')
        }
    }
return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold tracking-widest text-black">LINNA</h1>
          <p className="text-gray-500 mt-2">Acesso Administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              placeholder="admin@linnarquitetura.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}