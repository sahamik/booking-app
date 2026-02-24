import React, { useState } from 'react';
import BookingCalendar from '../components/BookingCalendar';

const UserDashboard: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TERVETULOA & STATSIT */}
        <section className="px-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Hei, Testaaja! 👋</h1>
          <p className="text-gray-500 font-medium mt-1">Mukava nähdä sinua taas.</p>
          
          {/* PIKATILASTOT (GRID) */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-blue-600 p-5 rounded-4xl text-white shadow-xl shadow-blue-100">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Seuraava aika</p>
              <p className="text-xl font-bold mt-1">24. Helmikuuta</p>
              <p className="text-sm opacity-90">Klo 14:00</p>
            </div>
            <div className="bg-white p-5 rounded-4xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kanta-asiakas</p>
              <p className="text-xl font-bold text-gray-900 mt-1">Taso 2</p>
              <p className="text-sm text-emerald-500 font-bold">150 pistettä</p>
            </div>
          </div>
        </section>

        {/* TOIMINTANAPPI */}
        <button 
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full py-4 bg-white border-2 border-dashed border-gray-200 rounded-4xl text-gray-500 font-bold hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
        >
          {showCalendar ? '✕ Sulje kalenteri' : '＋ Varaa uusi aika'}
        </button>

        {/* KALENTERI (Jos auki) */}
        {showCalendar && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <BookingCalendar />
          </div>
        )}

        {/* OMAT VARAUKSET */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-black text-gray-900">Omat varaukset</h2>
            <button className="text-xs font-bold text-blue-600 hover:underline">Katso kaikki</button>
          </div>
          
          {/* Esimerkkivaraus */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-sm border border-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xs">
                24/2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Parturileikkaus</h3>
                <p className="text-xs text-gray-500 font-medium">Klo 14:00 • Vahvistettu</p>
              </div>
            </div>
            <button className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest">
              Peruuta
            </button>
          </div>
        </section>

        {/* SUOSITELTU PALVELU (Mainosmainen nosto) */}
        <section className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
          <div className="relative z-10">
            <h3 className="text-xl font-black">Uutuus: Ilmalämpöpumppuhuolto</h3>
            <p className="text-sm opacity-90 mt-2 max-w-50">Nyt lippis huollon varaajalle koodilla PUMP26.</p>
            <button className="mt-4 bg-white text-indigo-600 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors">
              Lue lisää
            </button>
          </div>
          {/* Koriste-elementti taustalla */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </section>

      </div>
    </div>
  );
};

export default UserDashboard;