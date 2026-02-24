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
  // Esimerkkidata varauksista
  const bookings: Booking[] = [
    { id: '1', service: 'Parturileikkaus', date: '24.02.2026', time: '14:00', status: 'confirmed', price: '35€' },
    { id: '2', service: 'Hieronnan erikoishoito', date: '15.03.2026', time: '10:30', status: 'pending', price: '65€' },
    { id: '3', service: 'Parranmuotoilu', date: '10.01.2026', time: '12:00', status: 'completed', price: '25€' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'completed': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-700';
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
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gray-50/50">
      <div className="max-w-2xl mx-auto">
        
        {/* OTSIKKO JA SUODATIN */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 px-2">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Omat varaukset</h1>
            <p className="text-gray-500 font-medium mt-1">Hallitse ja tarkastele aikojasi.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">Tulevat</button>
            <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600">Menneet</button>
          </div>
        </div>

        {/* VARAUSLISTA */}
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div 
              key={booking.id}
              className="group bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-sm border border-white hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  {/* PÄIVÄMÄÄRÄ-IKONI */}
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-blue-50 rounded-2xl text-blue-600 border border-blue-100 group-hover:scale-110 transition-transform">
                    <span className="text-[10px] font-black uppercase leading-none">{booking.date.split('.')[1]}</span>
                    <span className="text-xl font-black leading-none mt-0.5">{booking.date.split('.')[0]}</span>
                  </div>

                  <div>
                    <h3 className="font-black text-gray-900 text-base">{booking.service}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm text-gray-500 font-medium">{booking.time}</p>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(booking.status)}`}>
                        {getStatusLabel(booking.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <span className="text-sm font-black text-gray-900">{booking.price}</span>
                  {booking.status !== 'completed' && (
                    <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TYHJÄ TILA / HELP */}
        <div className="mt-12 p-8 text-center bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50">
          <p className="text-sm text-blue-900/60 font-medium">
            Tarvitsetko apua varausten kanssa? <br />
            <a href="#" className="text-blue-600 font-black hover:underline">Ota yhteyttä asiakaspalveluun</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserBookings;