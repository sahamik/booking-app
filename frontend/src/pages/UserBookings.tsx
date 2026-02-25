import React from 'react';

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
  price: string;
}

const UserBookings: React.FC = () => {
  const bookings: Booking[] = [
    { id: '1', service: 'Tietokoneen huolto & virustarkistus', date: '26.02.2026', time: '14:00', status: 'confirmed', price: '79€' },
    { id: '2', service: 'Wi-Fi verkon optimointi', date: '15.03.2026', time: '10:30', status: 'pending', price: '89€' },
    { id: '3', service: 'Äly-TV asennus ja opastus', date: '10.01.2026', time: '12:00', status: 'completed', price: '69€' },
  ];

  const getStatusStyle = (status: string) => {
    const base = "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-superwide border ";
    switch (status) {
      case 'confirmed': return base + 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending': return base + 'bg-amber-50 text-amber-600 border-amber-100';
      case 'completed': return base + 'bg-surface-50 text-surface-400 border-surface-100';
      default: return base + 'bg-surface-50 text-surface-600 border-surface-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Vahvistettu';
      case 'pending': return 'Odottaa';
      case 'completed': return 'Suoritettu';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-surface-50">
      <div className="max-w-6xl mx-auto">
        
        {/* OTSIKKO JA SUODATIN */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 px-2">
          <div>
            <h1 className="text-3xl font-black text-surface-900 tracking-tight">Omat varaukset</h1>
            <p className="text-surface-500 font-medium mt-1">Hallitse ja tarkastele aikojasi.</p>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-2xl shadow-soft border border-surface-100">
            <button className="px-4 py-2 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-superwide transition-all shadow-brand">
              Tulevat
            </button>
            <button className="px-4 py-2 text-[10px] font-black text-surface-400 hover:text-surface-900 uppercase tracking-superwide transition-all">
              Menneet
            </button>
          </div>
        </div>

        {/* VARAUSLISTA */}
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div 
              key={booking.id}
              className="group bg-white rounded-admin p-6 shadow-soft border border-surface-100 hover:border-brand/20 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  {/* PÄIVÄMÄÄRÄ-IKONI */}
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-brand-light rounded-2xl text-brand border border-brand/10 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-[10px] font-black uppercase leading-none">{booking.date.split('.')[1]}</span>
                    <span className="text-xl font-black leading-none mt-1">{booking.date.split('.')[0]}</span>
                  </div>

                  <div>
                    <h3 className="font-black text-surface-900 text-base leading-tight group-hover:text-brand transition-colors">{booking.service}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <p className="text-sm text-surface-500 font-bold">{booking.time}</p>
                      <span className={getStatusStyle(booking.status)}>
                        {getStatusLabel(booking.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-surface-50 pt-4 md:pt-0">
                  <span className="text-lg font-black text-surface-900">{booking.price}</span>
                  {booking.status !== 'completed' && (
                    <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-superwide text-surface-300 hover:text-danger transition-colors group/del">
                      <span>Peruuta</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* HELP BOX */}
        <div className="mt-12 p-8 text-center bg-brand-light rounded-admin border border-brand/10">
          <p className="text-sm text-brand/70 font-bold">
            Tarvitsetko apua varausten kanssa? <br />
            <a href="#" className="inline-block mt-2 text-brand font-black hover:underline uppercase text-[10px] tracking-superwide">
              Ota yhteyttä asiakaspalveluun
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserBookings;