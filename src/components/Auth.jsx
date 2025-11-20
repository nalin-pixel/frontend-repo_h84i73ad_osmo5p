import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      onSuccess(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <h3 className="text-white text-xl font-semibold">Login</h3>
      <div className="mt-4 space-y-3">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg bg-slate-900/70 border border-blue-500/20 px-3 py-2 text-white" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-lg bg-slate-900/70 border border-blue-500/20 px-3 py-2 text-white" />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button disabled={loading} className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors">{loading ? '...' : 'Login'}</button>
      </div>
    </form>
  )
}

export function Register({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, name }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Register failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      onSuccess(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <h3 className="text-white text-xl font-semibold">Register</h3>
      <div className="mt-4 space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full rounded-lg bg-slate-900/70 border border-blue-500/20 px-3 py-2 text-white" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg bg-slate-900/70 border border-blue-500/20 px-3 py-2 text-white" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-lg bg-slate-900/70 border border-blue-500/20 px-3 py-2 text-white" />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button disabled={loading} className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors">{loading ? '...' : 'Create account'}</button>
      </div>
    </form>
  )
}
