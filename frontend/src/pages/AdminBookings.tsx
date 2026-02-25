import React, { useState } from 'react';

type Booking = {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  device: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
};

const AdminBookings: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const [bookings] = useState<Booking[]>([
    { id: '101', customerName: 'Matti Meikäläinen', service: 'Tietokoneen huolto', date: '2026-02-28', time: '10:00', device: 'Asus Zenbook', status: 'pending' },
    { id: '102', customerName: 'Liisa Lukkari', service: 'Wi-Fi optimointi', date: '2026-03-01', time: '14:30', device: 'Koti-verkko', status: 'in-progress' },
    { id: '103', customerName: 'Teemu Teekkari', service: 'Verkkosivujen teko', date: '2026-02-20', time: '09:00', device: 'Portfolio-sivu', status: 'completed' },
    { id: '104', customerName: 'Anna Admin', service: 'Älykoti asennus', date: '2026-03-10', time: '12:00', device: 'Ring-ovikello', status: 'pending' },
  ]);

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`).getTime();
    const dateB = new Date(`${b.date}T${b.time}`).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const getStatusBadge = (status: Booking['status']) => {
    const baseClasses = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-superwide border ";
    switch (status) {
      case 'pending': return baseClasses + "bg-amber-50 text-amber-600 border-amber-100";
      case 'in-progress': return baseClasses + "bg-brand-light text-brand border-brand/10";
      case 'completed': return baseClasses + "bg-emerald-50 text-emerald-600 border-emerald-100";
      case 'cancelled': return baseClasses + "bg-danger-light text-danger border-danger/10";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-surface-900 tracking-tight">Huoltojonot</h1>
          <p className="text-surface-500 mt-2 font-medium">Seuraa ja hallitse varauksia.</p>
        </div>

        {/* LAJITTELU-KONTROLLI */}
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-soft border border-surface-100">
          <button 
            onClick={() => setSortOrder('newest')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-superwide transition-all ${sortOrder === 'newest' ? 'bg-surface-900 text-white' : 'text-surface-400 hover:text-surface-900'}`}
          >
            Uusin ensin
          </button>
          <button 
            onClick={() => setSortOrder('oldest')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-superwide transition-all ${sortOrder === 'oldest' ? 'bg-surface-900 text-white' : 'text-surface-400 hover:text-surface-900'}`}
          >
            Vanhin ensin
          </button>
        </div>
      </header>

      <div className="bg-white rounded-admin shadow-soft border border-surface-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-50/50 text-[10px] font-black uppercase tracking-superwide text-surface-400">
              <tr>
                <th className="px-8 py-6">Pvm & Aika</th>
                <th className="px-8 py-6">Asiakas & Laite</th>
                <th className="px-8 py-6">Palvelu</th>
                <th className="px-8 py-6">Tila</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {sortedBookings.map((booking) => (
                <tr key={booking.id} className="group hover:bg-surface-50/50 transition-colors">
                  <td className="px-8 py-7">
                    <p className="font-black text-surface-900">{new Date(booking.date).toLocaleDateString('fi-FI')}</p>
                    <p className="text-sm font-bold text-brand mt-0.5">{booking.time}</p>
                  </td>
                  <td className="px-8 py-7">
                    <p className="font-bold text-surface-800">{booking.customerName}</p>
                    <p className="text-[10px] text-surface-400 font-black mt-1 uppercase tracking-wider">{booking.device}</p>
                  </td>
                  <td className="px-8 py-7">
                    <span className="text-sm font-bold text-surface-700">{booking.service}</span>
                  </td>
                  <td className="px-8 py-7">
                    <span className={getStatusBadge(booking.status)}>
                      {booking.status === 'in-progress' ? 'Työn alla' : 
                       booking.status === 'pending' ? 'Odottaa' : 
                       booking.status === 'completed' ? 'Valmis' : 'Peruttu'}
                    </span>
                  </td>
                  <td className="px-8 py-7 text-right">
                    <button className="bg-surface-50 text-surface-400 hover:bg-surface-900 hover:text-white p-2 rounded-xl transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;