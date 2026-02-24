import React, { useState } from 'react';

interface Service {
  name: string;
  price: number;
  duration: number;
  description: string;
}

const AddServiceForm: React.FC<{ onAdd: (service: Service) => void }> = ({ onAdd }) => {
  const [formData, setFormData] = useState<Service>({
    name: '',
    price: 0,
    duration: 30,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', price: 0, duration: 30, description: '' }); // Tyhjennä lomake
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Lisää uusi palvelu</h3>
      
      <div>
        <label className="block text-sm font-semibold text-gray-600">Palvelun nimi</label>
        <input
          type="text"
          required
          className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="esim. Hiustenleikkuu"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600">Hinta (€)</label>
          <input
            type="number"
            required
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">Kesto (min)</label>
          <select
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
          >
            <option value={30}>30 min</option>
            <option value={60}>60 min</option>
            <option value={90}>90 min</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
      >
        Tallenna palvelu
      </button>
    </form>
  );
};

export default AddServiceForm;