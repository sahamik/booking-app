import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rekisteröidytään:", formData);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 pt-32 pb-12 overflow-hidden bg-gray-50/50">
      
      {/* Taustan koriste-elementit */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-md w-full">
        {/* Kortti */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-white p-8 sm:p-10">
          
          {/* Otsikko */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Luo tili</h2>
            <p className="text-gray-600 mt-2 font-medium italic">Liity mukaan ja varaa aikoja helposti.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nimi-kenttä */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 ml-1 mb-2">
                Koko nimi
              </label>
              <input
                type="text"
                required
                className="w-full px-6 py-3 bg-white/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-300 placeholder:text-gray-300 font-medium"
                placeholder="Matti Meikäläinen"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Sähköposti-kenttä */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 ml-1 mb-2">
                Sähköposti
              </label>
              <input
                type="email"
                required
                className="w-full px-6 py-3 bg-white/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-300 placeholder:text-gray-300 font-medium"
                placeholder="matti@esimerkki.fi"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Salasanat */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 ml-1 mb-2">
                Salasana
              </label>
              <input
                type="password"
                required
                className="w-full px-6 py-3 bg-white/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-300 placeholder:text-gray-300 font-medium"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 ml-1 mb-2">
                Vahvista salasana
              </label>
              <input
                type="password"
                required
                className="w-full px-6 py-3 bg-white/50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-300 placeholder:text-gray-300 font-medium"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-[0.98] mt-4"
            >
              Luo käyttäjätili
            </button>
          </form>

          {/* Kirjautumislinkki */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm font-medium">
              Onko sinulla jo tili?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-black transition-all">
                Kirjaudu sisään
              </Link>
            </p>
          </div>
        </div>

        {/* Alatunniste */}
        <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-8">
          🛡️ Turvallinen rekisteröityminen & SSL
        </p>
      </div>
    </div>
  );
};

export default Register;