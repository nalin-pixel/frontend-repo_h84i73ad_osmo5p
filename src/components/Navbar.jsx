import { useState } from 'react'

export default function Navbar({ onNavigate, current, isAuthed, onLogout }) {
  const [open, setOpen] = useState(false)

  const links = [
    { key: 'home', label: 'Home' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'support', label: 'Support' },
    { key: 'tos', label: 'TOS' },
  ]

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/70 border-b border-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30" />
            <span className="font-semibold text-white">HotHost</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <button
                key={l.key}
                onClick={() => onNavigate(l.key)}
                className={`text-sm transition-colors ${current === l.key ? 'text-white' : 'text-blue-200/80 hover:text-white'}`}
              >{l.label}</button>
            ))}
            <a href="https://dash.hothost.org" target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition-colors">Dashboard</a>
            {isAuthed ? (
              <button onClick={onLogout} className="text-sm text-blue-200/80 hover:text-white">Logout</button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => onNavigate('login')} className="text-sm text-blue-200/80 hover:text-white">Login</button>
                <button onClick={() => onNavigate('register')} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors">Register</button>
              </div>
            )}
          </nav>

          <button className="md:hidden text-blue-200" onClick={() => setOpen(!open)}>
            <span className="sr-only">Menu</span>☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-blue-500/10">
          <div className="px-4 py-3 space-y-2">
            {links.map(l => (
              <button key={l.key} onClick={() => { onNavigate(l.key); setOpen(false) }} className="block w-full text-left text-blue-100 py-1">{l.label}</button>
            ))}
            <a href="https://dash.hothost.org" target="_blank" rel="noreferrer" className="block text-blue-100 py-1">Dashboard</a>
            {isAuthed ? (
              <button onClick={() => { onLogout(); setOpen(false) }} className="block text-blue-100 py-1">Logout</button>
            ) : (
              <>
                <button onClick={() => { onNavigate('login'); setOpen(false) }} className="block text-blue-100 py-1">Login</button>
                <button onClick={() => { onNavigate('register'); setOpen(false) }} className="block text-blue-100 py-1">Register</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
