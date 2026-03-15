import { useState } from 'react'
import { store } from '../utils/store.js'

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const ok = store.login(password)
      if (ok) onLogin()
      else { setError('Väärä salasana. Oletussalasana on: admin123'); setLoading(false) }
    }, 400)
  }

  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl theme-bg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="15" rx="3" stroke="white" strokeWidth="1.5"/>
              <path d="M8 3V7M16 3V7M3 11H21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Varaa.fi Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Kirjaudu hallintapaneeliin</p>
        </div>

        <div className="card p-6 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[var(--color-primary)] mb-1.5 block">Salasana</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                autoFocus
              />
            </div>
            {error && (
              <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                {error}
              </div>
            )}
            <button type="submit" disabled={loading || !password} className="btn-primary w-full justify-center py-3">
              {loading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">
            Vaihda salasana asetuksista kirjautumisen jälkeen.
          </p>
        </div>
      </div>
    </div>
  )
}
