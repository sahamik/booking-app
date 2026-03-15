/**
 * calendarUtils.js — Päivämäärä- ja aikaslotti-apufunktiot
 */

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1 // Muunnetaan ma=0
}

export function formatDate(date) {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDateFi(dateStr) {
  const [y, m, d] = dateStr.split('-')
  const months = ['tammikuuta','helmikuuta','maaliskuuta','huhtikuuta','toukokuuta','kesäkuuta',
    'heinäkuuta','elokuuta','syyskuuta','lokakuuta','marraskuuta','joulukuuta']
  return `${parseInt(d)}. ${months[parseInt(m)-1]} ${y}`
}

export function formatDateShortFi(dateStr) {
  const [y, m, d] = dateStr.split('-')
  return `${parseInt(d)}.${parseInt(m)}.${y}`
}

export function isToday(dateStr) {
  return dateStr === formatDate(new Date())
}

export function isPast(dateStr) {
  return dateStr < formatDate(new Date())
}

export function generateTimeSlots(workStart, workEnd, breakStart, breakEnd, intervalMin, bookedTimes = []) {
  const slots = []
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
  const toStr = (m) => `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`

  const start = toMin(workStart)
  const end = toMin(workEnd)
  const bStart = toMin(breakStart)
  const bEnd = toMin(breakEnd)

  for (let t = start; t < end; t += intervalMin) {
    const timeStr = toStr(t)
    const isBreak = t >= bStart && t < bEnd
    const isTaken = bookedTimes.includes(timeStr)
    if (!isBreak) {
      slots.push({ time: timeStr, taken: isTaken })
    }
  }
  return slots
}

export function getBookingsForDate(bookings, dateStr) {
  return bookings.filter(b => b.date === dateStr && b.status !== 'cancelled')
}

export function getMonthName(month) {
  const names = ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu',
    'Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu']
  return names[month]
}

export const DAY_NAMES = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su']
export const DAY_NAMES_FULL = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai']
