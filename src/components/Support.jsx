import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Support() {
  const [tickets, setTickets] = useState([])
  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState('')

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const authed = !!token

  const headers = useMemo(() => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }), [token])

  const fetchTickets = async () => {
    if (!authed) return
    const res = await fetch(`${API}/tickets`, { headers })
    const data = await res.json()
    if (res.ok) setTickets(data)
  }

  useEffect(() => { fetchTickets() }, [])

  const createTicket = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`${API}/tickets`, { method: 'POST', headers, body: JSON.stringify({ subject }) })
    const data = await res.json()
    setLoading(false)
    if (res.ok) { setSubject(''); fetchTickets() }
  }

  const openTicket = async (t) => {
    setSelected(t)
    const res = await fetch(`${API}/tickets/${t.id || t._id}/messages`, { headers })
    const data = await res.json()
    if (res.ok) setMessages(data)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!selected) return
    const res = await fetch(`${API}/tickets/${selected.id || selected._id}/message`, { method: 'POST', headers, body: JSON.stringify({ ticket_id: selected.id, body }) })
    const data = await res.json()
    if (res.ok) { setBody(''); openTicket(selected) }
  }

  if (!authed) {
    return (
      <div className="max-w-3xl mx-auto bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 text-blue-200">
        Login or register to open tickets and chat with support.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <form onSubmit={createTicket} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4">
          <div className="text-white font-semibold">Open a Ticket</div>
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" className="mt-3 w-full rounded-lg bg-slate-900/70 border border-blue-500/20 px-3 py-2 text-white" />
          <button className="mt-3 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">{loading ? '...' : 'Create'}</button>
        </form>

        <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4">
          <div className="text-white font-semibold mb-2">{role === 'support' ? 'All Tickets' : 'My Tickets'}</div>
          <div className="space-y-2 max-h-80 overflow-auto pr-2">
            {tickets.map(t => (
              <button key={t.id} onClick={() => openTicket(t)} className={`w-full text-left p-3 rounded-lg border ${selected?.id === t.id ? 'bg-blue-600/20 border-blue-500/40' : 'bg-slate-900/60 border-blue-500/20'} text-blue-100`}>
                <div className="font-medium text-white">{t.subject}</div>
                <div className="text-xs text-blue-200/70">{t.status} • {t.priority}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        {selected ? (
          <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4 flex flex-col h-[500px]">
            <div className="font-semibold text-white">Ticket: {selected.subject}</div>
            <div className="mt-3 flex-1 overflow-auto space-y-3 pr-2">
              {messages.map(m => (
                <div key={m.id} className={`max-w-[80%] p-3 rounded-xl ${m.from_role === 'support' ? 'bg-blue-600/20 self-start' : 'bg-white/10 self-end'} text-blue-100`}>
                  <div className="text-xs text-blue-300/70 mb-1">{m.from_role === 'support' ? 'Support' : 'You'}</div>
                  {m.body}
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="mt-3 flex gap-2">
              <input value={body} onChange={e => setBody(e.target.value)} placeholder="Type your message..." className="flex-1 rounded-lg bg-slate-900/70 border border-blue-500/20 px-3 py-2 text-white" />
              <button className="px-4 rounded-lg bg-blue-600 text-white">Send</button>
            </form>
          </div>
        ) : (
          <div className="h-[500px] bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4 text-blue-200 flex items-center justify-center">Select a ticket to start chatting.</div>
        )}
      </div>
    </div>
  )
}
