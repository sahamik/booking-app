const FEATURES = [
  { icon: '📅', title: 'Oma varaussivu', desc: 'Asiakkaasi varaavat ajan ympäri vuorokauden ilman puhelinsoittoja.' },
  { icon: '📧', title: 'Automaattiset vahvistukset', desc: 'Sähköpostivahvistus asiakkaalle heti varauksen jälkeen.' },
  { icon: '🗂️', title: 'Admin-hallintapaneeli', desc: 'Näet kaikki varaukset, voit sulkea päiviä ja muokata asetuksia.' },
  { icon: '⚡', title: 'Valmis 5 minuutissa', desc: 'Ei teknistä osaamista tarvita. Asetukset, linkki, valmis.' },
  { icon: '📱', title: 'Toimii puhelimessa', desc: 'Täysin responsiivinen — sekä sinulle että asiakkaillesi.' },
  { icon: '🔒', title: 'Suojattu admin', desc: 'Vain sinä pääset hallintapaneeliin omalla salasanallasi.' },
]

const STEPS = [
  { num: '01', title: 'Rekisteröidy', desc: 'Luo tili ja syötä yrityksesi tiedot.' },
  { num: '02', title: 'Jaa linkki', desc: 'Kopioi varauslinkki ja liitä se nettisivujesi varaa painikkeeseen.' },
  { num: '03', title: 'Kerää varauksia', desc: 'Asiakkaat varaavat itse — sinulle jää aikaa oikeaan työhön.' },
]

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-50/90 backdrop-blur-md border-b border-[var(--theme-100)]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg theme-bg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="4" width="12" height="10" rx="2" stroke="white" strokeWidth="1.4"/>
                <path d="M5 2V5M11 2V5M2 8H14" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-display font-bold text-gray-900">Aikaxi.fi</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#pricing" className="text-sm text-[var(--color-primary)] font-medium hover:text-gray-900 transition-colors hidden sm:block">Hinnoittelu</a>
            <button onClick={onGetStarted} className="btn-primary text-sm py-2">Kokeile ilmaiseksi</button>
            <button onClick={() => window.location.href = 'http://localhost:5173/?book=1'} className="btn-secondary text-sm py-2">Kokeile varausta</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-100)] border border-[var(--color-primary-medium)] text-[var(--color-primary)] text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full theme-bg animate-pulse" />
            Varausjärjestelmä pienyrittäjille
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
            Lopeta ajanvaraus<br />
            <span className="text-[var(--color-primary)]">puhelimessa</span>
          </h1>
          <p className="text-lg text-[var(--color-primary)] mb-10 max-w-xl mx-auto leading-relaxed">
            Hierojat, valokuvaajat, personal trainerit ja muut yrittäjät — anna asiakkaiden varata itse. Säästät tunteja joka viikko.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onGetStarted} className="btn-primary text-base px-8 py-3.5 shadow-lg">
              ▶ Kokeile interaktiivista demoa
            </button>
            <a href="#how" className="btn-secondary text-base px-8 py-3.5">Miten toimii?</a>
          </div>
          <p className="text-xs text-gray-400 mt-4">Ei rekisteröitymistä. Demo avautuu heti.</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">Ominaisuudet</p>
            <h2 className="font-display text-3xl font-bold text-gray-900">Kaikki mitä tarvitset</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-5 rounded-2xl border border-[var(--theme-100)] bg-warm-50 hover:border-[var(--color-primary-medium)] transition-colors">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-display font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-[var(--color-primary)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label">Prosessi</p>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-12">Valmis 5 minuutissa</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[var(--theme-100)] flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-[var(--color-primary)] text-lg">{s.num}</span>
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--color-primary)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <p className="section-label">Hinnoittelu</p>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Yksinkertainen hinta</h2>
          <p className="text-[var(--color-primary)] mb-10">Yksi selkeä kuukausimaksu. Ei yllätyslaskuja.</p>

          <div className="card p-8 ring-2 ring-[var(--color-primary)]">
            <div className="inline-block px-3 py-1 bg-[var(--theme-100)] rounded-full text-xs font-bold text-[var(--color-primary)] mb-4">KUUKAUSITILAUS</div>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="font-display text-5xl font-extrabold text-gray-900">9,99</span>
              <span className="text-gray-500 font-medium">€/kk</span>
            </div>
            <p className="text-gray-500 text-sm mb-8">Laskutus kuukausittain. Peruuta milloin tahansa.</p>
            <ul className="text-left space-y-2.5 mb-8">
              {['Rajaton määrä varauksia','Oma varaussivu','Admin-hallintapaneeli','Sähköpostivahvistukset','Mobiilituki','Suljetut päivät & lomat'].map((f,i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-[var(--color-primary)]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="#3d6340" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <button onClick={onGetStarted} className="btn-primary w-full justify-center py-3.5 text-base">
              ▶ Avaa interaktiivinen demo
            </button>
            <p className="text-xs text-gray-400 mt-3">Kokeile heti — ei rekisteröitymistä</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-[var(--color-primary-dark)] text-gray-400 text-center text-sm">
        <p className="font-display font-bold text-white mb-2">Aikaxi.fi</p>
        <p>Varausjärjestelmä pienyrittäjille · Kehitetty Suomessa</p>
      </footer>
    </div>
  )
}
