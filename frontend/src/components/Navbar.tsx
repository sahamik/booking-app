import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole] = useState<'user' | 'admin'>('user'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-lg shadow-soft py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          
          {/* LOGO & ADMIN-MERKKI */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-brand rounded-2xl flex items-center justify-center shadow-brand group-hover:rotate-6 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-surface-900 tracking-tighter">
                IT<span className="text-brand">Kamu</span>
              </span>
            </Link>
            
            {isLoggedIn && userRole === 'admin' && (
              <span className="hidden sm:block bg-surface-900 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-superwide shadow-sm">
                Ylläpito
              </span>
            )}
          </div>

          {/* DESKTOP NAVIGOINTI */}
          <div className="hidden md:flex items-center gap-1 font-black text-[10px] uppercase tracking-superwide">
            {isLoggedIn ? (
              userRole === 'admin' ? (
                <>
                  <NavLink to="/admin" end className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'text-brand bg-brand-light' : 'text-surface-400 hover:text-surface-900 hover:bg-surface-50'}`}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/admin/bookings" className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'text-brand bg-brand-light' : 'text-surface-400 hover:text-surface-900 hover:bg-surface-50'}`}>
                    Huoltojonot
                  </NavLink>
                  <NavLink to="/admin/users" className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'text-brand bg-brand-light' : 'text-surface-400 hover:text-surface-900 hover:bg-surface-50'}`}>
                    Käyttäjät
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/dashboard" className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'text-brand bg-brand-light' : 'text-surface-400 hover:text-surface-900 hover:bg-surface-50'}`}>
                    Etusivu
                  </NavLink>
                  <NavLink to="/bookings" className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'text-brand bg-brand-light' : 'text-surface-400 hover:text-surface-900 hover:bg-surface-50'}`}>
                    Omat huollot
                  </NavLink>
                  <Link to="/new-booking" className="ml-4 bg-brand text-white px-5 py-2.5 rounded-xl shadow-brand hover:bg-brand-dark transition-all active:scale-95 text-[10px]">
                    Varaa huolto
                  </Link>
                </>
              )
            ) : null}

            {/* PROFIILI DROP-DOWN */}
            {isLoggedIn && (
              <div className="relative ml-4 pl-4 border-l border-surface-100">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-soft transition-all active:scale-90 ${userRole === 'admin' ? 'bg-brand text-white' : 'bg-surface-900 text-white'}`}
                >
                  {userRole === 'admin' ? 'A' : 'U'}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-admin shadow-2xl border border-surface-100 py-2 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 mb-1 border-b border-surface-50">
                      <p className="text-[9px] text-surface-400 font-black uppercase tracking-superwide">Tili</p>
                      <p className="text-xs font-bold text-surface-900 truncate">{userRole === 'admin' ? 'Ylläpitäjä' : 'Asiakas'}</p>
                    </div>
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black text-surface-700 hover:bg-surface-50 transition-colors uppercase tracking-superwide">
                      ⚙️ Asetukset
                    </Link>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black text-danger hover:bg-danger-light transition-colors border-t border-surface-50 uppercase tracking-superwide"
                    >
                      🚪 Kirjaudu ulos
                    </button>
                  </div>
                )}
              </div>
            )}

            {!isLoggedIn && (
              <div className="flex items-center gap-3 ml-4">
                <Link to="/login" className="text-surface-400 hover:text-surface-900 px-4 transition-colors">Kirjaudu</Link>
                <Link to="/register" className="bg-brand text-white px-6 py-2.5 rounded-xl shadow-brand hover:bg-brand-dark transition-all">Liity</Link>
              </div>
            )}
          </div>

          {/* MOBIILI-NAVIGAATIO-IKONI */}
          <div className="md:hidden flex items-center gap-4">
             {isLoggedIn && (
               <span className={`text-[8px] font-black px-2 py-1 rounded uppercase tracking-tighter ${userRole === 'admin' ? 'bg-brand-light text-brand' : 'bg-surface-100 text-surface-600'}`}>
                 {userRole}
               </span>
             )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-surface-900">
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBIILIVALIKKO */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-surface-100 p-6 space-y-4 shadow-xl font-black uppercase text-[10px] tracking-superwide">
          {userRole === 'admin' ? (
            <>
              <Link to="/admin" className="block py-2 text-surface-900">Dashboard</Link>
              <Link to="/admin/bookings" className="block py-2 text-surface-900">Huoltojonot</Link>
              <Link to="/admin/users" className="block py-2 text-surface-900">Käyttäjienhallinta</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block py-2 text-surface-900">Etusivu</Link>
              <Link to="/bookings" className="block py-2 text-surface-900">Omat Huollot</Link>
              <Link to="/new-booking" className="block py-2 text-brand">Varaa huoltoaika</Link>
            </>
          )}
          <div className="pt-4 border-t border-surface-100 space-y-4">
            <Link to="/settings" className="block py-2 text-surface-400">Asetukset</Link>
            <button onClick={() => setIsLoggedIn(false)} className="block w-full text-left text-danger py-2">
              Kirjaudu ulos
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;