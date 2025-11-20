export default function Pricing() {
  const tiers = [
    { name: 'Minecraft - Starter', price: '$3.99/mo', features: ['2 GB RAM', 'NVMe SSD', 'DDoS Protected'] },
    { name: 'Minecraft - Pro', price: '$8.99/mo', features: ['6 GB RAM', 'NVMe SSD', 'Dedicated vCPU'] },
    { name: 'Discord Bot - Starter', price: '$1.99/mo', features: ['512 MB RAM', '1 vCPU', '99.9% Uptime'] },
    { name: 'Discord Bot - Pro', price: '$4.99/mo', features: ['1 GB RAM', '2 vCPU', 'Priority Support'] },
  ]
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-white text-center">Simple, Transparent Pricing</h2>
        <p className="text-center text-blue-200/80 mt-2">Pick a plan and scale anytime.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t, i) => (
            <div key={i} className="rounded-2xl bg-slate-800/60 border border-blue-500/20 p-6 hover:translate-y-[-2px] transition-transform">
              <div className="text-white font-medium">{t.name}</div>
              <div className="mt-2 text-2xl font-bold text-blue-400">{t.price}</div>
              <ul className="mt-4 space-y-1 text-sm text-blue-200/80">
                {t.features.map((f, j) => (<li key={j}>• {f}</li>))}
              </ul>
              <button className="mt-6 w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors">Choose</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
