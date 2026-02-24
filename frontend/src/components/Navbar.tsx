import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole] = useState<'user' | 'admin'>('user');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Dropdownin tila
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Suljetaan valikot kun sivu vaihtuu
  useEffect(() => {
    // Defer state updates to avoid cascading renders
    const timeout = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsProfileOpen(false);
    }, 0);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">
              Book<span className="text-blue-600">App</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-1">
            <NavLink 
                to="/dashboard" // Vaihdettu "/" -> "/dashboard", jotta vie suoraan paneeliin
                className={({ isActive }) => 
                `px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                }`
                }
            >
                Etusivu
            </NavLink>
            
            {isLoggedIn ? (
                <>
                <NavLink 
                    // Admin menee hallintaan, peruskäyttäjä menee uudelle bookings-sivulle
                    to={userRole === 'admin' ? '/admin' : '/bookings'} 
                    className={({ isActive }) => 
                    `px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                    }`
                    }
                >
                    {userRole === 'admin' ? 'Hallinta' : 'Varaukset'}
                </NavLink>

                {/* PROFIILI DROP-DOWN VALIKKO */}
                <div className="relative ml-4 pl-4 border-l border-gray-100">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold shadow-lg transition-transform active:scale-90"
                  >
                    T
                  </button>

                  {/* DROP-DOWN SISÄLTÖ */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200">
                      <Link 
                        to="/settings" 
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Asetukset
                      </Link>
                      <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Kirjaudu ulos
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link to="/login" className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 px-4">
                  Kirjaudu
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                  Liity
                </Link>
              </div>
            )}
          </div>

          {/* MOBIILI-VALIKKO (ikoni pysyy samana) */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-900">
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBIILIVALIKON SISÄLTÖ */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 p-6 space-y-4 shadow-xl">
          <Link to="/" className="block text-lg font-black text-gray-900">Etusivu</Link>
          <Link to="/dashboard" className="block text-lg font-black text-gray-900">Omat Varaukset</Link>
          <Link to="/settings" className="block text-lg font-black text-gray-900">Asetukset</Link>
          <button onClick={() => setIsLoggedIn(false)} className="block w-full text-left text-lg font-black text-red-500 pt-4 border-t border-gray-100">
            Kirjaudu ulos
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;