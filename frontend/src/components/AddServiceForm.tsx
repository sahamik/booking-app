import React, { useState } from 'react';

interface AddServiceFormProps {
  onAdd: (service: { name: string; price: number; duration: number; description: string }) => void;
}

const AddServiceForm: React.FC<AddServiceFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !duration || !description) return;
    
    onAdd({
      name,
      price: Number(price),
      duration: Number(duration),
      description
    });

    setName('');
    setPrice('');
    setDuration('');
    setDescription('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-8 rounded-admin shadow-soft border border-surface-100 space-y-6"
    >
      <div>
        <label className="block text-[10px] font-black uppercase tracking-superwide text-surface-400 mb-2 ml-1">
          Palvelun nimi
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Esim. Tietokoneen syväpuhdistus"
          className="w-full px-5 py-3 bg-surface-50 border border-surface-200 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all font-medium placeholder:text-surface-300"
        />
      </div>

      <div>
        <label className="block text-[10px] font-black uppercase tracking-superwide text-surface-400 mb-2 ml-1">
          Kuvaus
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mitä palveluun kuuluu..."
          className="w-full px-5 py-3 bg-surface-50 border border-surface-200 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all min-h-32 font-medium placeholder:text-surface-300 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-superwide text-surface-400 mb-2 ml-1">
            Hinta (€)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-5 py-3 bg-surface-50 border border-surface-200 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all font-bold text-surface-900"
          />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-superwide text-surface-400 mb-2 ml-1">
            Kesto (min)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-5 py-3 bg-surface-50 border border-surface-200 rounded-2xl focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all font-bold text-surface-900"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-brand text-white rounded-2xl font-black text-xs uppercase tracking-superwide hover:bg-brand-dark transition-all shadow-brand active:scale-[0.98]"
      >
        Lisää uusi palvelu
      </button>
    </form>
  );
};

export default AddServiceForm;