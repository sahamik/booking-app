import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Kirjaudutaan:", { email, password });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 pt-32 pb-12 overflow-hidden bg-surface-50">
      
      {/* Taustan koriste-elementit */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-brand/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-md w-full">
        {/* Kortti */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-admin shadow-soft border border-white p-8 sm:p-10">
          
          {/* Otsikko */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-surface-900 tracking-tight">Tervetuloa</h2>
            <p className="text-surface-500 mt-2 font-medium italic text-sm">Kirjaudu sisään hallinnoidaksesi varauksiasi.</p>
          </div>

        {/* Sähköpostikenttä */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-superwide text-surface-500 ml-1 mb-2">
                Sähköposti
              </label>
              <input
                type="email"
                required
                className="w-full px-6 py-3 bg-white/50 border border-surface-400/30 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent focus:bg-white outline-none transition-all duration-300 placeholder:text-surface-400 font-medium"
                placeholder="matti@esimerkki.fi"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Salasana kenttä */}
            <div>
              <div className="flex justify-between items-center ml-1 mb-2">
                <label className="block text-[10px] font-black uppercase tracking-superwide text-surface-500">
                  Salasana
                </label>
                <a href="#" className="text-[10px] font-black text-brand hover:text-brand-dark uppercase tracking-wider transition-colors">
                  Unohtuiko salasana?
                </a>
              </div>
              <input
                type="password"
                required
                className="w-full px-6 py-3 bg-white/50 border border-surface-400/30 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent focus:bg-white outline-none transition-all duration-300 placeholder:text-surface-400 font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Kirjautumispainike */}
            <button
              type="submit"
              className="w-full bg-brand text-white py-4 rounded-2xl font-black text-sm uppercase tracking-superwide hover:bg-brand-dark shadow-brand transition-all active:scale-[0.98] mt-4"
            >
              Kirjaudu sisään
            </button>
          </form>

          {/* Rekisteröitymislinkki */}
          <div className="mt-8 text-center">
            <p className="text-surface-500 text-sm font-medium">
              Eikö sinulla ole tiliä?{' '}
              <Link to="/register" className="text-brand hover:underline font-black transition-all">
                Luo uusi tili
              </Link>
            </p>
          </div>
        </div>

        {/* Alatunniste */}
        <p className="text-center text-surface-400 text-[10px] font-bold uppercase tracking-superwide mt-8">
          🛡️ Turvallinen SSL-suojattu yhteys
        </p>
      </div>
    </div>
  );
};

export default Login;