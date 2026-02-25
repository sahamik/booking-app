import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';

const services = [
  { id: 1, name: 'Tietokoneen huolto', price: 79, duration: 60, icon: '💻', description: 'Virusten poisto, päivitykset ja järjestelmän optimointi nopeammaksi.' },
  { id: 2, name: 'Wi-Fi & Verkon optimointi', price: 89, duration: 90, icon: '🌐', description: 'Reitittimen asennus ja langattoman verkon katvealueiden korjaus.' },
  { id: 3, name: 'Verkkosivujen teko', price: 450, duration: 120, icon: '🚀', description: 'Yksilölliset ja mobiiliystävälliset verkkosivut yrityskäyttöön.' },
  { id: 4, name: 'Äly-TV & Viihde-elektroniikka', price: 69, duration: 45, icon: '📺', description: 'Laitteiden kytkentä, kanavien haku ja suoratoistopalveluiden opastus.' },
  { id: 5, name: 'Älykoti & Turvakamerat', price: 99, duration: 120, icon: '🏠', description: 'Älylukkojen, kameroiden ja valaistuksen asennus sekä mobiiliohjaus.' }
];

const NewBooking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
      <header className="mb-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-[10px] font-black uppercase tracking-superwide text-surface-400 hover:text-brand mb-2 transition-colors"
        >
          ← Takaisin
        </button>
        <h1 className="text-4xl font-black text-surface-900 tracking-tight">Varaa IT-huolto</h1>
      </header>

      <div className="space-y-12">
        {/* VAIHE 1: PALVELUN VALINTA */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-black text-sm shadow-brand">1</span>
            <h2 className="text-xl font-black uppercase tracking-tight text-surface-900">Valitse palvelu</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-6 rounded-admin border-2 text-left transition-all duration-300 group ${
                  selectedService === service.id 
                  ? 'border-brand bg-brand-light shadow-brand' 
                  : 'border-white bg-white shadow-soft hover:border-brand/20'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{service.icon}</span>
                  <div className="text-right">
                    <p className="text-lg font-black text-surface-900">{service.price} €</p>
                    <p className="text-[10px] font-bold text-surface-400 uppercase tracking-superwide">{service.duration} min</p>
                  </div>
                </div>
                <h3 className="font-black text-surface-900 text-lg leading-tight mb-2">{service.name}</h3>
                <p className="text-sm text-surface-500 font-medium leading-relaxed">{service.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* VAIHE 2: KALENTERI */}
        <section className={`transition-all duration-700 transform ${selectedService ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4 pointer-events-none'}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-black text-sm shadow-brand">2</span>
            <h2 className="text-xl font-black uppercase tracking-tight text-surface-900">Valitse ajankohta</h2>
          </div>
          <div className="bg-white rounded-admin p-8 shadow-soft border border-surface-100">
            <BookingCalendar />
          </div>
        </section>

        {/* VAHVISTUS - Kelluva nappi */}
        {selectedService && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg animate-in slide-in-from-bottom-8 duration-500">
            <button className="w-full bg-surface-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-brand transition-all active:scale-95">
              Vahvista varaus
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewBooking;