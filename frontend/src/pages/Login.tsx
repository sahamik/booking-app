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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      {/* Taustan koriste-elementit (tuovat eloa sivulle) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-10">
          
          {/* Otsikko ja tervetulotoivotus */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Tervetuloa</h2>
            <p className="text-gray-500 mt-2 font-medium">Kirjaudu sisään hallinnoidaksesi varauksiasi.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 ml-1 mb-2">Sähköposti</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-200 placeholder:text-gray-400"
                placeholder="matti@esimerkki.fi"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center ml-1 mb-2">
                <label className="block text-sm font-bold text-gray-700">Salasana</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Unohtuiko salasana?</a>
              </div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-200 placeholder:text-gray-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold text-md hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] transform"
            >
              Kirjaudu sisään
            </button>
          </form>

          {/* Alalinkki */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-small">
              Eikö sinulla ole tiliä?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
                Luo uusi tili
              </Link>
            </p>
          </div>
        </div>

        {/* Pieni lisäys: footer-teksti lomakkeen alla */}
        <p className="text-center text-gray-400 text-xs mt-8">
          Turvallinen kirjautuminen & SSL-suojattu yhteys
        </p>
      </div>
    </div>
  );
};

export default Login;