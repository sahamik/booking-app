import { useState } from 'react'
import ThemePicker from './ThemePicker.jsx'
import Calendar from './Calendar.jsx'
import { store } from '../utils/store.js'
import { formatDateFi, formatDateShortFi, getBookingsForDate } from '../utils/calendarUtils.js'

const TABS = [
  { id: 'dashboard', label: 'Etusivu', icon: '◉' },
  { id: 'bookings', label: 'Varaukset', icon: '📅' },
  { id: 'calendar', label: 'Kalenteri', icon: '🗓' },
  { id: 'settings', label: 'Asetukset', icon: '⚙️' },
]

export default function AdminDashboard({ onLogout, onThemeChange }) {
  const [tab, setTab] = useState('dashboard')
  const [settings, setSettings] = useState(store.getSettings())
  const [bookings, setBookings] = useState(store.getBookings())
  const [blockedDates, setBlockedDates] = useState(store.getBlockedDates())
  const [selectedDate, setSelectedDate] = useState('')
  const [saved, setSaved] = useState(false)

  const refresh = () => {
    setBookings(store.getBookings())
    setBlockedDates(store.getBlockedDates())
  }

  const today = new Date().toISOString().split('T')[0]
  const upcoming = bookings
    .filter(b => b.date >= today && b.status !== 'cancelled')
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  const todayBookings = getBookingsForDate(bookings, today)
  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + (b.price || 0), 0)

  const cancelBooking = (id) => {
    store.updateBooking(id, { status: 'cancelled' })
    refresh()
  }

  const saveSettings = () => {
    store.saveSettings(settings)
    onThemeChange?.(settings.theme || 'sage')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleBlocked = (date) => {
    store.toggleBlockedDate(date)
    setBlockedDates(store.getBlockedDates())
  }

  const addService = () => {
    const svc = { id: Date.now().toString(), name: 'Uusi palvelu', duration: 60, price: 50 }
    setSettings(s => ({ ...s, services: [...(s.services || []), svc] }))
  }

  const updateService = (id, field, value) => {
    setSettings(s => ({ ...s, services: s.services.map(sv => sv.id === id ? { ...sv, [field]: value } : sv) }))
  }

  const removeService = (id) => {
    setSettings(s => ({ ...s, services: s.services.filter(sv => sv.id !== id) }))
  }

  const bookingLink = `${window.location.origin}${window.location.pathname}?book=1`

  return (
    <div className="min-h-screen bg-warm-50 flex">
      {/* Sidebar */}
      <div className="w-56 flex flex-col shrink-0 hidden md:flex" style={{background: "var(--color-primary-dark)"}}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg theme-bg flex items-center justify-center text-white font-bold text-sm">
              {settings.businessName?.[0] || 'Y'}
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm leading-tight truncate max-w-[110px]">{settings.businessName}</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-white/60 hover:text-white" style={{background: tab === t.id ? "rgba(255,255,255,0.15)" : "transparent"}}
            >
              <span className="text-base">{t.icon}</span> {t.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 text-white/50 hover:text-white text-sm rounded-xl transition-all" style={{hover: {background: "rgba(255,255,255,0.1)"}}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H2V12H5M9 4L12 7L9 10M12 7H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Kirjaudu ulos
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-primary-medium)] z-50 flex">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-medium transition-colors ${tab === t.id ? 'text-[var(--color-primary)]' : 'text-gray-400'}`}>
            <span className="text-lg">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div className="animate-fade-in">
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Hei, {settings.ownerName} 👋</h1>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Tänään', value: todayBookings.length, unit: 'varausta', color: 'bg-[var(--theme-50)] border-[var(--color-primary-medium)]' },
                  { label: 'Tulossa', value: upcoming.length, unit: 'varausta', color: 'bg-blue-50 border-blue-200' },
                  { label: 'Yhteensä', value: bookings.filter(b=>b.status!=='cancelled').length, unit: 'varausta', color: 'bg-purple-50 border-purple-200' },
                  { label: 'Liikevaihto', value: `${totalRevenue}€`, unit: 'yhteensä', color: 'bg-warm-100 border-warm-300' },
                ].map((s,i) => (
                  <div key={i} className={`rounded-2xl border p-4 ${s.color}`}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{s.label}</p>
                    <p className="font-display text-2xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.unit}</p>
                  </div>
                ))}
              </div>

              {/* Varauslinkki */}
              <div className="card p-5 mb-5">
                <p className="section-label mb-2">Varauslinkki asiakkaille</p>
                <div className="flex gap-2">
                  <input readOnly value={bookingLink} className="input-field text-xs font-mono flex-1" />
                  <button onClick={() => navigator.clipboard.writeText(bookingLink)}
                    className="btn-secondary text-sm px-4 shrink-0">Kopioi</button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Jaa tämä linkki asiakkaillesi. He voivat varata ajan suoraan.</p>
              </div>

              {/* Tänään */}
              <div className="card p-5">
                <p className="section-label mb-3">Tänään — {formatDateFi(today)}</p>
                {todayBookings.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-6">Ei varauksia tänään.</p>
                ) : (
                  <div className="space-y-2">
                    {todayBookings.map(b => (
                      <div key={b.id} className="flex items-center gap-3 p-3 bg-[var(--theme-50)] rounded-xl">
                        <div className="w-12 h-12 bg-[var(--theme-200)] rounded-xl flex items-center justify-center shrink-0">
                          <span className="font-bold text-[var(--color-primary)] text-sm">{b.time}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{b.customerName}</p>
                          <p className="text-xs text-gray-500">{b.service} {b.price ? `· ${b.price}€` : ''}</p>
                        </div>
                        <span className="text-xs bg-[var(--theme-200)] text-[var(--color-primary)] px-2 py-1 rounded-lg font-medium">Vahvistettu</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Varaukset */}
          {tab === 'bookings' && (
            <div className="animate-fade-in">
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Varaukset</h1>
              <div className="space-y-2">
                {upcoming.length === 0 ? (
                  <div className="card p-10 text-center text-gray-500">Ei tulevia varauksia.</div>
                ) : upcoming.map(b => (
                  <div key={b.id} className="card p-4 flex items-start gap-4">
                    <div className="text-center shrink-0 w-14">
                      <p className="text-xs font-semibold text-gray-500">{formatDateShortFi(b.date).split('.').slice(0,2).join('.')}</p>
                      <p className="font-display font-bold text-gray-900 text-lg leading-tight">{b.time}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{b.customerName}</p>
                      <p className="text-sm text-[var(--color-primary)]">{b.service} {b.price ? `· ${b.price}€` : ''}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{b.customerEmail} {b.customerPhone ? `· ${b.customerPhone}` : ''}</p>
                      {b.notes && <p className="text-xs text-gray-500 mt-1 italic">"{b.notes}"</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                        b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-[var(--theme-100)] text-[var(--color-primary)]'
                      }`}>
                        {b.status === 'cancelled' ? 'Peruttu' : 'Vahvistettu'}
                      </span>
                      {b.status !== 'cancelled' && (
                        <button onClick={() => { if(confirm('Perutaanko varaus?')) { cancelBooking(b.id); refresh() } }}
                          className="text-xs px-2 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                          Peru
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Kalenteri */}
          {tab === 'calendar' && (
            <div className="animate-fade-in">
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Kalenteri</h1>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="card p-5">
                  <p className="section-label mb-4">Valitse päivä</p>
                  <Calendar
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    blockedDates={blockedDates}
                    bookings={bookings}
                    settings={settings}
                  />
                  {selectedDate && (
                    <button
                      onClick={() => toggleBlocked(selectedDate)}
                      className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        blockedDates.includes(selectedDate)
                          ? 'bg-[var(--theme-100)] text-[var(--color-primary)] hover:bg-[var(--theme-200)]'
                          : 'bg-red-50 text-red-700 hover:bg-red-100'
                      }`}
                    >
                      {blockedDates.includes(selectedDate) ? '✓ Avaa päivä' : '✕ Sulje päivä'}
                    </button>
                  )}
                </div>

                <div className="card p-5">
                  <p className="section-label mb-3">
                    {selectedDate ? formatDateFi(selectedDate) : 'Valitse päivä'}
                  </p>
                  {!selectedDate ? (
                    <p className="text-gray-400 text-sm">Valitse päivä vasemmalta nähdäksesi varaukset.</p>
                  ) : blockedDates.includes(selectedDate) ? (
                    <div className="bg-red-50 rounded-xl p-4 text-center">
                      <p className="text-red-700 font-semibold text-sm">Päivä suljettu</p>
                      <p className="text-red-500 text-xs mt-1">Asiakkaat eivät voi varata tänä päivänä.</p>
                    </div>
                  ) : (() => {
                    const dayBookings = getBookingsForDate(bookings, selectedDate)
                    return dayBookings.length === 0 ? (
                      <p className="text-gray-400 text-sm">Ei varauksia tälle päivälle.</p>
                    ) : (
                      <div className="space-y-2">
                        {dayBookings.map(b => (
                          <div key={b.id} className="p-3 bg-[var(--theme-50)] rounded-xl">
                            <div className="flex justify-between">
                              <span className="font-bold text-gray-900 text-sm">{b.time}</span>
                              <span className="text-xs text-gray-500">{b.service}</span>
                            </div>
                            <p className="text-sm text-[var(--color-primary)] mt-0.5">{b.customerName}</p>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Asetukset */}
          {tab === 'settings' && (
            <div className="animate-fade-in space-y-5">
              <h1 className="font-display text-2xl font-bold text-gray-900">Asetukset</h1>

              {/* Yrityksen tiedot */}
              <div className="card p-5">
                <p className="section-label mb-4">Yrityksen tiedot</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { key: 'businessName', label: 'Yrityksen nimi', placeholder: 'Oma Hieronta' },
                    { key: 'ownerName', label: 'Omistajan nimi', placeholder: 'Etunimi Sukunimi' },
                    { key: 'email', label: 'Sähköposti', placeholder: 'yrittaja@email.fi' },
                    { key: 'phone', label: 'Puhelinnumero', placeholder: '+358 40 123 4567' },
                    { key: 'website', label: 'Kotisivun osoite', placeholder: 'https://www.yritys.fi' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">{f.label}</label>
                      <input className="input-field" placeholder={f.placeholder} value={settings[f.key] || ''}
                        onChange={e => setSettings(s => ({...s, [f.key]: e.target.value}))} />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">Kuvaus</label>
                    <textarea className="input-field resize-none" rows={2} placeholder="Lyhyt kuvaus palveluistasi..."
                      value={settings.description || ''}
                      onChange={e => setSettings(s => ({...s, description: e.target.value}))} />
                  </div>
                </div>
              </div>

              {/* Aukioloajat */}
              <div className="card p-5">
                <p className="section-label mb-4">Aukioloajat</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { key: 'workStart', label: 'Aloitusaika' },
                    { key: 'workEnd', label: 'Lopetusaika' },
                    { key: 'breakStart', label: 'Tauko alkaa' },
                    { key: 'breakEnd', label: 'Tauko loppuu' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">{f.label}</label>
                      <input type="time" className="input-field" value={settings[f.key] || ''}
                        onChange={e => setSettings(s => ({...s, [f.key]: e.target.value}))} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--color-primary)] mb-2 block">Työpäivät</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Ma','Ti','Ke','To','Pe','La','Su'].map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setSettings(s => ({
                          ...s,
                          workDays: s.workDays?.includes(i)
                            ? s.workDays.filter(x => x !== i)
                            : [...(s.workDays||[]), i]
                        }))}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                          settings.workDays?.includes(i) ? 'theme-bg text-white' : 'bg-[var(--theme-100)] text-gray-500'
                        }`}
                      >{d}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Palvelut */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="section-label mb-0">Palvelut</p>
                  <button onClick={addService} className="btn-secondary text-xs py-1.5 px-3">+ Lisää</button>
                </div>
                <div className="space-y-3">
                  {(settings.services || []).map(svc => (
                    // JÄLKEEN:
                  <div key={svc.id} className="p-3 bg-[var(--theme-50)] rounded-xl">
                    <div className="grid grid-cols-3 gap-2 items-end">
                      <div>
                        <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">Palvelun nimi</label>
                        <input className="input-field text-xs" placeholder="esim. Hieronta" value={svc.name}
                          onChange={e => updateService(svc.id, 'name', e.target.value)} />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">Kesto (min)</label>
                          <input className="input-field text-xs" type="number" placeholder="60" value={svc.duration}
                            onChange={e => updateService(svc.id, 'duration', Number(e.target.value))} />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">Hinta (€)</label>
                          <input className="input-field text-xs" type="number" placeholder="60" value={svc.price}
                            onChange={e => updateService(svc.id, 'price', Number(e.target.value))} />
                        </div>
                      </div>
                      <div className="flex justify-end pb-1">
                        <button onClick={() => removeService(svc.id)} className="text-red-400 hover:text-red-600 text-xs px-2 py-1">✕ Poista</button>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>

              {/* Teemaväri */}
              <div className="card p-5">
                <ThemePicker
                  currentTheme={settings.theme || 'sage'}
                  onChange={(themeId) => {
                    setSettings(s => ({...s, theme: themeId}))
                    onThemeChange?.(themeId)
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button onClick={saveSettings} className="btn-primary px-8">
                  {saved ? '✓ Tallennettu!' : 'Tallenna asetukset'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
