import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-12">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-surface-900 tracking-tight">Asetukset</h1>
        <p className="text-surface-500 mt-2 font-medium">Hallitse tiliäsi ja sovelluksen asetuksia.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        
        {/* YHTEYSTIEDOT */}
        <section className="bg-white rounded-admin p-8 shadow-soft border border-surface-100">
          <h3 className="text-xl font-bold text-surface-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-brand-light text-brand rounded-lg flex items-center justify-center text-sm">👤</span>
            Henkilötiedot
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-superwide text-surface-400 mb-2 ml-1">Koko nimi</label>
              <input 
                type="text" 
                defaultValue="Matti Meikäläinen"
                className="w-full px-5 py-3 bg-surface-50 border border-surface-100 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-surface-300 font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-superwide text-surface-400 mb-2 ml-1">Sähköposti</label>
              <input 
                type="email" 
                defaultValue="matti@esimerkki.fi"
                className="w-full px-5 py-3 bg-surface-50 border border-surface-100 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-surface-300 font-medium"
              />
            </div>
          </div>
          <button className="mt-6 bg-surface-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand transition shadow-lg shadow-surface-200 active:scale-95">
            Tallenna muutokset
          </button>
        </section>

        {/* SALASANAN VAIHTO */}
        <section className="bg-white rounded-admin p-8 shadow-soft border border-surface-100">
          <h3 className="text-xl font-bold text-surface-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-sm">🔒</span>
            Turvallisuus
          </h3>
          <div className="space-y-4 max-w-md">
            <input 
              type="password" 
              placeholder="Nykyinen salasana"
              className="w-full px-5 py-3 bg-surface-50 border border-surface-100 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all font-medium"
            />
            <input 
              type="password" 
              placeholder="Uusi salasana"
              className="w-full px-5 py-3 bg-surface-50 border border-surface-100 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all font-medium"
            />
          </div>
          <button className="mt-6 bg-brand text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-dark transition shadow-brand active:scale-95">
            Päivitä salasana
          </button>
        </section>

        {/* SOVELLUSASETUKSET (Tumma teema) */}
        <section className="bg-white rounded-admin p-8 shadow-soft border border-surface-100">
          <h3 className="text-xl font-bold text-surface-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-sm">✨</span>
            Ulkoasu
          </h3>
          <div className="flex items-center justify-between p-4 bg-surface-50 rounded-2xl border border-surface-100">
            <div>
              <p className="font-bold text-surface-800">Tumma teema</p>
              <p className="text-sm text-surface-500">Vaihda sovelluksen värimaailmaa</p>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 rounded-full transition-all duration-300 relative ${darkMode ? 'bg-brand' : 'bg-surface-300'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${darkMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </section>

        {/* TILIN POISTO */}
        <section className="bg-danger-light rounded-admin p-8 border border-danger/10">
          <h3 className="text-xl font-bold text-danger mb-2">Käyttäjätilin poistaminen</h3>
          <p className="text-danger/70 text-sm mb-6 font-medium">Tilin poistamista ei voi peruuttaa. Kaikki tietosi hävitetään pysyvästi.</p>
          <button className="bg-danger text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-danger-dark transition shadow-lg shadow-danger/20 active:scale-95">
            Poista käyttäjätili
          </button>
        </section>

      </div>
    </div>
  );
};

export default Settings;