import React, { useState } from 'react';
import AddServiceForm from '../components/AddServiceForm';

type Service = {
  id: number;
  name: string;
  price: number;
  duration: number;
};

const AdminDashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Parturipalvelu', price: 25, duration: 30 },
    { id: 2, name: 'Hieronnat', price: 50, duration: 60 },
  ]);

  const handleAddService = (newService: Omit<Service, 'id'>) => {
    setServices([...services, { ...newService, id: Date.now() }]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 py-8">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-gray-900">Hallintapaneeli</h1>
        <p className="text-gray-500 mt-2">Hallitse palveluita ja tarkastele tilastoja.</p>
      </header>

      {/* Tilastokortit */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Varauksia tänään', value: '24', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Liikevaihto (kk)', value: '3 450 €', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Aktiiviset palvelut', value: services.length.toString(), color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-3xl border border-white shadow-sm`}>
            <p className="text-sm font-bold uppercase tracking-wider text-gray-500">{stat.label}</p>
            <p className={`text-3xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Vasen sarake: Lomake */}
        <div className="lg:col-span-1">
          <AddServiceForm onAdd={handleAddService} />
        </div>

        {/* Oikea sarake: Palvelulistaus */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="text-xl font-bold text-gray-800">Nykyiset palvelut</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4">Palvelu</th>
                    <th className="px-6 py-4">Kesto</th>
                    <th className="px-6 py-4">Hinta</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-bold text-gray-800">{s.name}</td>
                      <td className="px-6 py-4 text-gray-600">{s.duration} min</td>
                      <td className="px-6 py-4 font-semibold text-blue-600">{s.price} €</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-red-400 hover:text-red-600 font-medium text-sm transition">
                          Poista
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;