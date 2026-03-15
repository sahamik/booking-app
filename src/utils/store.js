/**
 * store.js — yksinkertainen globaali tila ilman Redux/Zustand
 * Kaikki data tallennetaan localStorageen
 */

const DEFAULTS = {
  // Yrittäjän asetukset
  settings: {
    businessName: 'Oma Yritys',
    ownerName: 'Yrittäjä',
    email: 'yrittaja@example.com',
    phone: '',
    description: 'Tervetuloa varaamaan aikaa!',
    serviceDuration: 60, // min
    services: [
      { id: '1', name: 'Peruspalvelu', duration: 60, price: 60 },
      { id: '2', name: 'Lyhyt tapaaminen', duration: 30, price: 35 },
    ],
    workDays: [1, 2, 3, 4, 5], // ma-pe
    workStart: '09:00',
    workEnd: '17:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    slotInterval: 60, // min
    bookingColor: '#3d6340',
    maxAdvanceDays: 60,
  },
  // Varaukset
  bookings: [],
  // Suljetut päivät
  blockedDates: [],
  // Käyttäjä kirjautunut?
  isLoggedIn: false,
}

function load(key) {
  try {
    const v = localStorage.getItem('booking_' + key)
    return v ? JSON.parse(v) : DEFAULTS[key]
  } catch { return DEFAULTS[key] }
}

function save(key, value) {
  try { localStorage.setItem('booking_' + key, JSON.stringify(value)) } catch {}
}

export const store = {
  getSettings: () => load('settings'),
  saveSettings: (s) => save('settings', { ...load('settings'), ...s }),

  getBookings: () => load('bookings'),
  addBooking: (b) => {
    const bookings = load('bookings')
    const newBooking = { ...b, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'confirmed' }
    save('bookings', [...bookings, newBooking])
    return newBooking
  },
  updateBooking: (id, updates) => {
    const bookings = load('bookings')
    save('bookings', bookings.map(b => b.id === id ? { ...b, ...updates } : b))
  },
  deleteBooking: (id) => {
    save('bookings', load('bookings').filter(b => b.id !== id))
  },

  getBlockedDates: () => load('blockedDates'),
  toggleBlockedDate: (dateStr) => {
    const blocked = load('blockedDates')
    if (blocked.includes(dateStr)) save('blockedDates', blocked.filter(d => d !== dateStr))
    else save('blockedDates', [...blocked, dateStr])
  },

  isLoggedIn: () => load('isLoggedIn'),
  login: (password) => {
    const settings = load('settings')
    const correctPassword = settings.adminPassword || 'admin123'
    if (password === correctPassword) { save('isLoggedIn', true); return true }
    return false
  },
  logout: () => save('isLoggedIn', false),
  setPassword: (pw) => {
    const s = load('settings')
    save('settings', { ...s, adminPassword: pw })
  },
}
