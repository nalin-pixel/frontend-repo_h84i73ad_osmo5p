import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pricing from './components/Pricing'
import Support from './components/Support'
import { Login, Register } from './components/Auth'

const API = import.meta.env.VITE_BACKEND_URL || ''

function Section({ id, children }) {
  return (
    <section id={id} className="relative py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(59,130,246,0.08),transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

function TOS() {
  return (
    <div className="max-w-3xl mx-auto bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 text-blue-100">
      <h3 className="text-white text-xl font-semibold">Terms of Service</h3>
      <ul className="mt-4 list-disc list-inside space-y-2 text-blue-200/90">
        <li>Refunds are only provided in credits.</li>
        <li>Abuse, DDoS, or illegal usage is strictly prohibited.</li>
        <li>We may update these terms at any time with notice.</li>
      </ul>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState('home')
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'))

  const onLogout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('role')
    setAuthed(false); setRoute('home')
  }

  useEffect(() => {
    setAuthed(!!localStorage.getItem('token'))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <Navbar onNavigate={setRoute} current={route} isAuthed={authed} onLogout={onLogout} />
      {route === 'home' && (
        <>
          <Hero onGetStarted={() => setRoute('pricing')} />
          <Section id="pricing"><Pricing /></Section>
        </>
      )}

      {route === 'pricing' && (
        <Section id="pricing"><Pricing /></Section>
      )}

      {route === 'support' && (
        <Section id="support"><Support /></Section>
      )}

      {route === 'tos' && (
        <Section id="tos"><TOS /></Section>
      )}

      {route === 'login' && (
        <Section id="login"><Login onSuccess={() => { setAuthed(true); setRoute('support') }} /></Section>
      )}

      {route === 'register' && (
        <Section id="register"><Register onSuccess={() => { setAuthed(true); setRoute('support') }} /></Section>
      )}

      <footer className="mt-20 border-t border-blue-500/10 py-8 text-center text-sm text-blue-300/70">© {new Date().getFullYear()} HotHost.org — All rights reserved.</footer>
    </div>
  )
}
