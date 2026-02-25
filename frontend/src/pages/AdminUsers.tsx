import React, { useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  joinedDate: string;
  totalBookings: number;
};

const AdminUsers: React.FC = () => {
  // Demo-dataa käyttäjistä
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Matti Meikäläinen', email: 'matti@esimerkki.fi', role: 'user', joinedDate: '2026-01-15', totalBookings: 3 },
    { id: '2', name: 'Admin Kamu', email: 'admin@ithuolto.fi', role: 'admin', joinedDate: '2025-12-01', totalBookings: 0 },
    { id: '3', name: 'Liisa Lukkari', email: 'liisa@firma.fi', role: 'user', joinedDate: '2026-02-10', totalBookings: 1 },
    { id: '4', name: 'Teemu Teekkari', email: 'teemu@yliopisto.fi', role: 'user', joinedDate: '2026-02-20', totalBookings: 5 },
  ]);

  const toggleRole = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, role: user.role === 'admin' ? 'user' : 'admin' };
      }
      return user;
    }));
  };

  const deleteUser = (userId: string) => {
    if (window.confirm('Haluatko varmasti poistaa tämän käyttäjän?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-surface-900 tracking-tight">Käyttäjienhallinta</h1>
        <p className="text-surface-500 mt-2 font-medium">Hallitse asiakastunnuksia ja käyttöoikeuksia.</p>
      </header>

      <div className="bg-white rounded-admin shadow-soft border border-surface-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-50/50 text-[10px] font-black uppercase tracking-superwide text-surface-400">
              <tr>
                <th className="px-8 py-6">Käyttäjä</th>
                <th className="px-8 py-6">Rooli</th>
                <th className="px-8 py-6">Liittynyt</th>
                <th className="px-8 py-6 text-center">Varaukset</th>
                <th className="px-8 py-6 text-right">Toiminnot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-surface-50/30 transition-colors">
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-3">
                      {/* Avatar, joka käyttää teemavärejä */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white transition-colors ${
                        user.role === 'admin' ? 'bg-brand' : 'bg-surface-900'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-surface-900">{user.name}</p>
                        <p className="text-xs text-surface-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-superwide border transition-colors ${
                      user.role === 'admin' 
                        ? 'bg-brand-light text-brand border-brand/10' 
                        : 'bg-surface-50 text-surface-500 border-surface-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-7 text-sm font-medium text-surface-500">
                    {new Date(user.joinedDate).toLocaleDateString('fi-FI')}
                  </td>
                  <td className="px-8 py-7 text-center">
                    <span className="font-black text-surface-900">{user.totalBookings}</span>
                  </td>
                  <td className="px-8 py-7 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => toggleRole(user.id)}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-superwide bg-surface-100 text-surface-600 hover:bg-surface-900 hover:text-white transition-all"
                      >
                        Vaihda rooli
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-superwide bg-danger-light text-danger hover:bg-danger hover:text-white transition-all"
                      >
                        Poista
                      </button>
                    </div>
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

export default AdminUsers;