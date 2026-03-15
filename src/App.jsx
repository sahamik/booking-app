import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage.jsx'
import BookingFlow from './components/BookingFlow.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import LoginPage from './components/LoginPage.jsx'
import { store } from './utils/store.js'
import { loadDemoData, isDemoMode } from './utils/demoData.js'
import { applyTheme } from './utils/theme.js'

function getRoute() {
  const params = new URLSearchParams(window.location.search)
  if (params.get('book') === '1') return 'book'
  if (params.get('admin') === '1') return 'admin'
  if (params.get('success') === '1') return 'success'
  return 'landing'
}

export default function App() {
  const [route, setRoute] = useState(getRoute())
  const [loggedIn, setLoggedIn] = useState(store.isLoggedIn())
  const [demo, setDemo] = useState(isDemoMode())

  // Sovella teema heti kun sovellus latautuu
  useEffect(() => {
    const settings = store.getSettings()
    applyTheme(settings.theme || 'sage')
  }, [])

  // Aktivoi demo-tila ?demo=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('demo') === '1' && !isDemoMode()) {
      loadDemoData()
      setDemo(true)
      setLoggedIn(true)
      applyTheme('sage')
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      setRoute(getRoute())
      setLoggedIn(store.isLoggedIn())
      setDemo(isDemoMode())
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setRoute(getRoute())
  }

  const handleLogout = () => {
    store.logout()
    setLoggedIn(false)
    navigate('/')
  }

  // Kun teema muuttuu, sovelletaan heti
  const handleThemeChange = (themeId) => {
    applyTheme(themeId)
  }

  return (
    <>
      <div>
        {route === 'book' && <BookingFlow />}

        {route === 'admin' && (
          !loggedIn && !demo
            ? <LoginPage onLogin={() => {
                const ok = store.login(store.getSettings().adminPassword || 'admin123')
                if (ok) setLoggedIn(true)
              }} />
            : <AdminDashboard onLogout={handleLogout} onThemeChange={handleThemeChange} />
        )}

        {route === 'success' && (
          <div className="min-h-screen bg-[var(--theme-50)] flex items-center justify-center p-4">
            <div className="card p-10 max-w-sm text-center animate-scale-in">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{background: 'var(--theme-50)'}}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14L11 20L23 8" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold mb-2" style={{color: 'var(--color-primary-dark)'}}>Tervetuloa!</h2>
              <p className="text-gray-500 mb-6">Tilauksesi on vahvistettu.</p>
              <button onClick={() => navigate('/?admin=1')} className="btn-primary w-full justify-center">
                Avaa hallintapaneeli
              </button>
            </div>
          </div>
        )}

        {route === 'landing' && (
          <LandingPage onGetStarted={() => navigate('/?admin=1&demo=1')} />
        )}
      </div>
    </>
  )
}
