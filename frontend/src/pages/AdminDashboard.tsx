import React, { useState } from 'react';
import AddServiceForm from '../components/AddServiceForm';

type Service = {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
};

const AdminDashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Tietokoneen huolto', price: 79, duration: 60, description: 'Virusten poisto, päivitykset ja järjestelmän optimointi nopeammaksi.' },
    { id: 2, name: 'Wi-Fi & Verkon optimointi', price: 89, duration: 90, description: 'Reitittimen asennus ja langattoman verkon katvealueiden korjaus.' },
    { id: 3, name: 'Verkkosivujen teko', price: 450, duration: 120, description: 'Yksilölliset ja mobiiliystävälliset verkkosivut yrityskäyttöön.' },
    { id: 4, name: 'Äly-TV & Viihde-elektroniikka', price: 69, duration: 45, description: 'Laitteiden kytkentä, kanavien haku ja suoratoistopalveluiden opastus.' },
    { id: 5, name: 'Älykoti & Turvakamerat', price: 99, duration: 120, description: 'Älylukkojen, kameroiden ja valaistuksen asennus sekä mobiiliohjaus.' },
  ]);

  const handleAddService = (newService: Omit<Service, 'id'>) => {
    setServices([...services, { ...newService, id: Date.now() }]);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-surface-900 tracking-tight">Palveluhallinta</h1>
        <p className="text-surface-500 mt-3 font-medium text-lg">Hallitse palveluita ja niiden kuvauksia.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* VASEN: LOMAKE */}
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 className="text-xl font-black text-surface-900 mb-6 px-1">Lisää uusi palvelu</h2>
            <AddServiceForm onAdd={handleAddService} />
          </div>
        </div>

        {/* OIKEA: LISTAUS */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-admin shadow-soft border border-surface-100 overflow-hidden">
            <div className="p-8 border-b border-surface-50">
              <h3 className="text-xl font-black text-surface-900">Palveluvalikoima</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-50/50 text-[10px] font-black uppercase tracking-superwide text-surface-500">
                  <tr>
                    <th className="px-8 py-5">Palvelun tiedot</th>
                    <th className="px-8 py-5">Hinta & Kesto</th>
                    <th className="px-8 py-5 text-right">Hallinta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-50">
                  {services.map((s) => (
                    <tr key={s.id} className="group hover:bg-surface-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold text-surface-800">{s.name}</p>
                        <p className="text-xs text-surface-500 mt-1 max-w-md leading-relaxed">{s.description}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-black text-brand text-sm">{s.price} €</span>
                          <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider">{s.duration} min</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handleDeleteService(s.id)}
                          className="text-[10px] font-black uppercase tracking-superwide bg-danger-light text-danger hover:bg-danger hover:text-white transition-all px-3 py-1.5 rounded-xl"
                        >
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