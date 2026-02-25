import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';

const UserDashboard: React.FC = () => {
  const [showCalendar] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-surface-50">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TERVETULOA & STATSIT */}
        <section className="px-2">
          <h1 className="text-3xl font-black text-surface-900 tracking-tight">Hei, Testaaja! 👋</h1>
          <p className="text-surface-500 font-medium mt-1">Mukava nähdä sinua taas.</p>
          
          {/* PIKATILASTOT */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-brand p-6 rounded-admin text-white shadow-brand">
              <p className="text-[10px] font-black uppercase tracking-superwide opacity-80">Seuraava aika</p>
              <p className="text-xl font-bold mt-1">24. Helmikuuta</p>
              <p className="text-sm opacity-90">Klo 14:00</p>
            </div>
            <div className="bg-white p-6 rounded-admin border border-surface-100 shadow-soft">
              <p className="text-[10px] font-black text-surface-400 uppercase tracking-superwide">Kanta-asiakas</p>
              <p className="text-xl font-bold text-surface-900 mt-1">Taso 2</p>
              <p className="text-sm text-emerald-500 font-bold">150 pistettä</p>
            </div>
          </div>
        </section>

        {/* KALENTERI (Jos auki) */}
        {showCalendar && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-white rounded-admin p-6 shadow-soft border border-surface-100">
              <BookingCalendar />
            </div>
          </div>
        )}

        {/* OMAT VARAUKSET */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-black text-surface-900">Omat varaukset</h2>
            <button 
              className="text-[10px] font-black text-brand uppercase tracking-superwide hover:underline" 
              onClick={() => navigate('/bookings')}
            >
              Katso kaikki
            </button>
          </div>
          
          {/* Esimerkkivaraus */}
          <div className="bg-white rounded-admin p-6 shadow-soft border border-surface-100 flex items-center justify-between group hover:border-brand/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand font-black text-xs transition-transform group-hover:scale-110">
                24/2
              </div>
              <div>
                <h3 className="font-bold text-surface-900 text-sm">Tietokoneen huolto</h3>
                <p className="text-xs text-surface-500 font-medium">Klo 14:00 • Vahvistettu</p>
              </div>
            </div>
            <button className="text-[10px] font-black text-surface-300 hover:text-danger transition-colors uppercase tracking-superwide">
              Peruuta
            </button>
          </div>
        </section>

        {/* SUOSITELTU PALVELU / UUSI PALVELU */}
        <section className="bg-linear-to-br from-[#842fd4] to-[#4b0881] rounded-admin p-8 text-white relative overflow-hidden shadow-brand/40">
          <div className="relative z-10">
            <h3 className="text-xl font-black leading-tight max-w-72">Uutuus: Meiltä nyt myös virustentorjunta ohjelmistot</h3>
            <p className="text-sm opacity-90 mt-2 font-medium">Kysy tarjous!</p>
            <button className="mt-6 bg-white text-brand px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-superwide hover:bg-surface-50 transition-all active:scale-95 shadow-xl">
              Lue lisää
            </button>
          </div>
          
          {/* Koriste-elementti taustalla */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-10 w-20 h-20 bg-brand-light/20 rounded-full blur-2xl"></div>
        </section>

      </div>
    </div>
  );
};

export default UserDashboard;