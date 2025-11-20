export default function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.2),transparent_40%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Fast, Affordable Hosting for Minecraft & Discord Bots</h1>
            <p className="mt-4 text-blue-200/80 text-lg">Deploy blazing-fast servers with a clean dashboard, instant setup, and human support that actually replies.</p>
            <div className="mt-8 flex gap-3">
              <button onClick={onGetStarted} className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors">Get Started</button>
              <a href="https://dash.hothost.org" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">Open Dashboard</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-indigo-500/10 blur-2xl rounded-3xl" />
            <div className="relative bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-blue-500/20">
                  <div className="text-blue-300">🟩 Minecraft</div>
                  <div className="mt-2 text-sm text-blue-200/70">Low-latency nodes, 24/7 uptime, DDoS protection.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-blue-500/20">
                  <div className="text-blue-300">🤖 Discord Bots</div>
                  <div className="mt-2 text-sm text-blue-200/70">Node.js & Python stacks, autoscale ready.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 col-span-2">
                  <div className="text-blue-300">⚡ Smooth Experience</div>
                  <div className="mt-2 text-sm text-blue-200/70">Modern dashboard, instant deployments, ticket support.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
