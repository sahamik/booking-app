import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday
} from 'date-fns';
import { fi } from 'date-fns/locale';

const BookingCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  // APUFUNKTIO: Onko päivässä vapaita aikoja? 
  // (Tässä simulaatio: viikonloput ja tietyt päivät ovat täynnä)
  const hasAvailableSlots = (date: Date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return false; // Viikonloput täynnä
    if (date.getDate() % 5 === 0) return false; // Joka 5. päivä täynnä simulaation vuoksi
    return true;
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white p-8">
        
        {/* Navigointi (pysyy samana) */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: fi })}
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vapaa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Täynnä</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={prevMonth} className="p-3 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition shadow-sm">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextMonth} className="p-3 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition shadow-sm">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'].map(day => (
            <div key={day} className="text-center text-xs font-black text-gray-400 uppercase py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3">
          {calendarDays.map((day, idx) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isAvailable = hasAvailableSlots(day);
            
            return (
              <button
                key={idx}
                onClick={() => isAvailable && setSelectedDate(day)}
                disabled={!isCurrentMonth || !isAvailable}
                className={`
                  relative h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-200
                  ${!isCurrentMonth ? 'opacity-0 cursor-default' : 'hover:scale-105'}
                  ${isSelected 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 z-10' 
                    : isAvailable 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                  ${isToday(day) && !isSelected ? 'ring-2 ring-blue-600 ring-offset-2' : ''}
                `}
              >
                <span className="text-lg font-black">{format(day, 'd')}</span>
                {isAvailable && isCurrentMonth && !isSelected && (
                   <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Kellonajat (ilmestyvät vain jos päivä on valittu) */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          {!selectedDate ? (
            <div className="text-center py-10 bg-gray-50/50 rounded-4xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Valitse vapaa päivä (vihreä)</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-black text-gray-900 mb-6">
                Vapaat ajat <span className="text-emerald-600">{format(selectedDate, 'd. MMMM', { locale: fi })}</span>
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {["09:00", "10:00", "11:30", "13:00", "14:30", "16:00"].map(time => (
                  <button key={time} className="py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 shadow-sm">
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;