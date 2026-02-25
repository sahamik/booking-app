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

  const hasAvailableSlots = (date: Date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return false;
    if (date.getDate() % 5 === 0) return false;
    return true;
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-admin shadow-soft border border-surface-100 p-8">
        
        {/* NAVIGAATIO */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-surface-900 capitalize tracking-tight">
              {format(currentMonth, 'MMMM yyyy', { locale: fi })}
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-black text-surface-400 uppercase tracking-superwide">Vapaa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-surface-200"></div>
                <span className="text-[10px] font-black text-surface-400 uppercase tracking-superwide">Täynnä</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={prevMonth} className="p-3 rounded-xl bg-surface-50 border border-surface-100 hover:bg-surface-100 transition shadow-sm active:scale-95">
              <svg className="w-5 h-5 text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextMonth} className="p-3 rounded-xl bg-surface-50 border border-surface-100 hover:bg-surface-100 transition shadow-sm active:scale-95">
              <svg className="w-5 h-5 text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* VIIKONPÄIVÄT */}
        <div className="grid grid-cols-7 mb-2">
          {['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'].map(day => (
            <div key={day} className="text-center text-[10px] font-black text-surface-400 uppercase py-2 tracking-widest">{day}</div>
          ))}
        </div>

        {/* PÄIVÄT */}
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
                  relative h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300
                  ${!isCurrentMonth ? 'opacity-0 cursor-default' : 'hover:scale-[1.03] active:scale-95'}
                  ${isSelected 
                    ? 'bg-brand text-white shadow-brand z-10' 
                    : isAvailable 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200' 
                      : 'bg-surface-50 text-surface-300 cursor-not-allowed'}
                  ${isToday(day) && !isSelected ? 'ring-2 ring-brand ring-offset-2' : ''}
                `}
              >
                <span className="text-lg font-black">{format(day, 'd')}</span>
                {isAvailable && isCurrentMonth && !isSelected && (
                   <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* KELLONAJAT */}
        <div className="mt-10 pt-8 border-t border-surface-100">
          {!selectedDate ? (
            <div className="text-center py-10 bg-surface-50 rounded-admin border-2 border-dashed border-surface-200">
              <p className="text-surface-400 font-black uppercase tracking-superwide text-xs">Valitse vapaa päivä aloittaaksesi</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-black text-surface-900 mb-6">
                Vapaat ajat <span className="text-brand">{format(selectedDate, 'd. MMMM', { locale: fi })}</span>
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {["09:00", "10:00", "11:30", "13:00", "14:30", "16:00"].map(time => (
                  <button 
                    key={time} 
                    className="py-4 rounded-xl bg-white border border-surface-200 text-surface-700 font-black text-xs uppercase tracking-widest hover:border-brand hover:text-brand hover:shadow-soft transition-all active:scale-95"
                  >
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