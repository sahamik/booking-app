import { useState } from 'react'
import Calendar from './Calendar.jsx'
import { store } from '../utils/store.js'
import { applyTheme } from '../utils/theme.js'
import {
  generateTimeSlots, getBookingsForDate,
  formatDateFi, formatDateShortFi
} from '../utils/calendarUtils.js'

const STEPS = ['Valitse päivä', 'Valitse aika', 'Yhteystiedot', 'Vahvistus']

export default function BookingFlow() {
  const settings = store.getSettings()

  // Sovella teema
  useState(() => { applyTheme(settings.theme || 'sage') })
  const bookings = store.getBookings()
  const blockedDates = store.getBlockedDates()

  const [step, setStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedService, setSelectedService] = useState(settings.services?.[0] || null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [booking, setBooking] = useState(null)

  const dayBookings = selectedDate ? getBookingsForDate(bookings, selectedDate) : []
  const bookedTimes = dayBookings.map(b => b.time)
  const slots = selectedDate ? generateTimeSlots(
    settings.workStart, settings.workEnd,
    settings.breakStart, settings.breakEnd,
    selectedService?.duration || settings.slotInterval,
    bookedTimes
  ) : []

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime('')
    setStep(1)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setSubmitting(true)

    const newBooking = store.addBooking({
      date: selectedDate,
      time: selectedTime,
      service: selectedService?.name || 'Palvelu',
      serviceId: selectedService?.id,
      price: selectedService?.price,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      notes: form.notes,
    })

    // Lähetä sähköposti
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: form.email,
          customerName: form.name,
          businessName: settings.businessName,
          date: formatDateFi(selectedDate),
          time: selectedTime,
          service: selectedService?.name || 'Palvelu',
          bookingId: newBooking.id,
        }),
      })
    } catch {}

    setBooking(newBooking)
    setStep(3)
    setSubmitting(false)
  }

  const reset = () => {
    setStep(0); setSelectedDate(''); setSelectedTime('')
    setForm({ name: '', email: '', phone: '', notes: '' })
    setBooking(null)
  }

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[var(--theme-100)] px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'var(--color-primary)' }}>
            {settings.businessName?.[0] || 'Y'}
          </div>
          <div>
            <p className="font-display font-bold text-gray-900 text-sm leading-tight">{settings.businessName}</p>
            <p className="text-xs text-gray-500">Varaa aika</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-8 px-4">
        <div className="max-w-lg mx-auto">
          {/* Progress */}
          {step < 3 && (
            <div className="flex items-center gap-2 mb-8">
              {STEPS.slice(0,3).map((s, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div className={`flex items-center gap-1.5 ${i <= step ? 'text-[var(--color-primary)]' : 'text-gray-300'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${i < step ? 'theme-bg text-white' : i === step ? 'bg-[var(--theme-100)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]' : 'bg-[var(--theme-100)] text-gray-400'}`}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span className="text-xs font-medium hidden sm:block">{s}</span>
                  </div>
                  {i < 2 && <div className={`flex-1 h-px ${i < step ? 'bg-[var(--color-primary-medium)]' : 'bg-[var(--theme-200)]'}`} />}
                </div>
              ))}
            </div>
          )}

          {/* Palvelun valinta (aina näkyvissä vaiheessa 0) */}
          {step === 0 && settings.services?.length > 1 && (
            <div className="card p-5 mb-5 animate-fade-up">
              <p className="section-label mb-3">Valitse palvelu</p>
              <div className="grid gap-2">
                {settings.services.map(svc => (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedService(svc)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedService?.id === svc.id
                        ? 'border-[var(--color-primary)] bg-[var(--theme-50)] ring-2 ring-[var(--color-primary)]'
                        : 'border-[var(--color-primary-medium)] hover:border-[var(--color-primary-medium)] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 text-sm">{svc.name}</span>
                      <span className="font-bold text-[var(--color-primary)] text-sm">{svc.price}€</span>
                    </div>
                    <span className="text-xs text-gray-500">{svc.duration} min</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Kalenteri */}
          {step === 0 && (
            <div className="card p-5 animate-fade-up">
              <p className="section-label mb-4">Valitse päivä</p>
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                blockedDates={blockedDates}
                bookings={bookings}
                settings={settings}
              />
            </div>
          )}

          <button 
          className="btn-secondary w-full justify-center mt-2"
          onClick={() => window.location.href = 'http://localhost:5173/'}
          >
            Peruuta
          </button>

          {/* Aikaslotit */}
          {step === 1 && (
            <div className="animate-scale-in">
              <button onClick={() => setStep(0)} className="btn-ghost mb-4 text-sm">
                ← {formatDateShortFi(selectedDate)}
              </button>
              <div className="card p-5">
                <p className="section-label mb-4">Valitse kellonaika</p>
                {slots.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-6">Ei vapaita aikoja tälle päivälle.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map(slot => (
                      <button
                        key={slot.time}
                        onClick={() => !slot.taken && handleTimeSelect(slot.time)}
                        className={`time-slot ${slot.taken ? 'time-slot-taken' : ''} ${selectedTime === slot.time ? 'time-slot-selected' : ''}`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Yhteystiedot */}
          {step === 2 && (
            <div className="animate-scale-in">
              <button onClick={() => setStep(1)} className="btn-ghost mb-4 text-sm">
                ← {formatDateShortFi(selectedDate)} klo {selectedTime}
              </button>
              <div className="card p-5">
                <p className="section-label mb-4">Yhteystiedot</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">Nimi *</label>
                    <input className="input-field" placeholder="Etunimi Sukunimi" value={form.name}
                      onChange={e => setForm(f => ({...f, name: e.target.value}))} required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">Sähköposti *</label>
                    <input className="input-field" type="email" placeholder="sinä@email.fi" value={form.email}
                      onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">Puhelin</label>
                    <input className="input-field" placeholder="+358 40 123 4567" value={form.phone}
                      onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[var(--color-primary)] mb-1 block">Lisätiedot</label>
                    <textarea className="input-field resize-none" rows={3} placeholder="Mahdolliset lisätiedot..." value={form.notes}
                      onChange={e => setForm(f => ({...f, notes: e.target.value}))} />
                  </div>

                  {/* Yhteenveto */}
                  <div className="bg-[var(--theme-50)] rounded-xl p-4 space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-[var(--color-primary)]">Palvelu</span><span className="font-semibold text-gray-900">{selectedService?.name}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--color-primary)]">Päivä</span><span className="font-semibold text-gray-900">{formatDateShortFi(selectedDate)}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--color-primary)]">Kellonaika</span><span className="font-semibold text-gray-900">{selectedTime}</span></div>
                    {selectedService?.price && (
                      <div className="flex justify-between border-t border-[var(--color-primary-medium)] pt-1.5 mt-1.5">
                        <span className="text-[var(--color-primary)]">Hinta</span>
                        <span className="font-bold text-gray-900">{selectedService.price}€</span>
                      </div>
                    )}
                  </div>

                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3">
                    {submitting ? 'Varataan...' : 'Vahvista varaus'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Vahvistus */}
          {step === 3 && booking && (
            <div className="card p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-[var(--theme-100)] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14L11 20L23 8" stroke="#3d6340" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Varaus vahvistettu!</h2>
              <p className="text-[var(--color-primary)] text-sm mb-6">Vahvistus lähetetty osoitteeseen {booking.customerEmail}</p>

              <div className="bg-[var(--theme-50)] rounded-xl p-4 text-left space-y-2 mb-6 text-sm">
                <div className="flex justify-between"><span className="text-[var(--color-primary)]">Palvelu</span><span className="font-semibold">{booking.service}</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-primary)]">Päivä</span><span className="font-semibold">{formatDateFi(booking.date)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-primary)]">Kello</span><span className="font-semibold">{booking.time}</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-primary)]">Varausnro</span><span className="font-mono text-xs">#{booking.id.slice(-6)}</span></div>
              </div>

              <button onClick={reset} className="btn-secondary w-full justify-center">
                Varaa uusi aika
              </button>
              <button
                onClick={() => window.location.href = '/'} // Palaa yrityksen etusivulle, eli tähän sivujen osoite.
                className="btn-secondary w-full justify-center mt-2"
              >
                Palaa etusivulle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
