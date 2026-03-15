import { useState } from 'react'
import {
  getDaysInMonth, getFirstDayOfMonth, formatDate,
  isToday, isPast, getMonthName, DAY_NAMES
} from '../utils/calendarUtils.js'

export default function Calendar({ selectedDate, onSelectDate, blockedDates = [], bookings = [], settings, minDate, maxDate }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const maxAdvance = settings?.maxAdvanceDays || 60

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const canGoPrev = () => {
    return !(viewYear === today.getFullYear() && viewMonth === today.getMonth())
  }

  const isDisabledDay = (day) => {
    const d = new Date(viewYear, viewMonth, day)
    const dateStr = formatDate(d)
    const dayOfWeek = d.getDay() === 0 ? 6 : d.getDay() - 1
    const workDays = settings?.workDays || [0,1,2,3,4]
    const maxDate = formatDate(new Date(Date.now() + maxAdvance * 86400000))

    if (isPast(dateStr) && dateStr !== formatDate(new Date())) return true
    if (!workDays.includes(dayOfWeek)) return true
    if (blockedDates.includes(dateStr)) return true
    if (dateStr > maxDate) return true
    return false
  }

  const getBookingCount = (day) => {
    const dateStr = formatDate(new Date(viewYear, viewMonth, day))
    return bookings.filter(b => b.date === dateStr && b.status !== 'cancelled').length
  }

  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev()}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--theme-100)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="font-display font-bold text-gray-900 text-base">
          {getMonthName(viewMonth)} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--theme-100)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr = formatDate(new Date(viewYear, viewMonth, day))
          const disabled = isDisabledDay(day)
          const selected = selectedDate === dateStr
          const today_ = isToday(dateStr)
          const bookingCount = getBookingCount(day)

          return (
            <button
              key={i}
              onClick={() => !disabled && onSelectDate(dateStr)}
              disabled={disabled}
              className={`relative w-10 h-10 rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-150
                ${disabled ? 'day-disabled' : selected ? 'day-selected' : 'day-available'}
                ${today_ && !selected ? 'day-today' : ''}
              `}
            >
              {day}
              {bookingCount > 0 && !disabled && (
                <span className={`absolute bottom-1 w-1 h-1 rounded-full ${selected ? 'bg-white/60' : 'bg-[var(--color-primary-medium)]'}`} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
