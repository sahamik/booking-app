/**
 * demoData.js — Ladataan demo-tila portfolio-esittelyä varten
 * URL-parametri ?demo=1 aktivoi tämän
 */

import { formatDate } from './calendarUtils.js'

function getDateOffset(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return formatDate(d)
}

export const DEMO_SETTINGS = {
  businessName: 'Anna Nieminen Hieronta',
  ownerName: 'Anna Nieminen',
  email: 'anna@hieronta.fi',
  phone: '+358 40 123 4567',
  description: 'Ammattimaista hierontaa Helsingissä. Varaa aika helposti verkossa!',
  services: [
    { id: '1', name: 'Klassinen hieronta', duration: 60, price: 75 },
    { id: '2', name: 'Urheiluhieronta', duration: 60, price: 85 },
    { id: '3', name: 'Lyhyt huolto', duration: 30, price: 45 },
  ],
  workDays: [1, 2, 3, 4, 5],
  workStart: '09:00',
  workEnd: '17:00',
  breakStart: '12:00',
  breakEnd: '13:00',
  slotInterval: 60,
  bookingColor: '#3d6340',
  maxAdvanceDays: 60,
  adminPassword: 'demo123',
}

export const DEMO_BOOKINGS = [
  {
    id: '1001',
    date: getDateOffset(0),
    time: '09:00',
    service: 'Klassinen hieronta',
    serviceId: '1',
    price: 75,
    customerName: 'Matti Virtanen',
    customerEmail: 'matti@example.com',
    customerPhone: '+358 40 111 2233',
    notes: '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '1002',
    date: getDateOffset(0),
    time: '11:00',
    service: 'Urheiluhieronta',
    serviceId: '2',
    price: 85,
    customerName: 'Liisa Korhonen',
    customerEmail: 'liisa@example.com',
    customerPhone: '+358 50 987 6543',
    notes: 'Selkäkipu oikealla puolella',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '1003',
    date: getDateOffset(0),
    time: '14:00',
    service: 'Lyhyt huolto',
    serviceId: '3',
    price: 45,
    customerName: 'Pekka Mäkinen',
    customerEmail: 'pekka@example.com',
    customerPhone: '',
    notes: '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '1004',
    date: getDateOffset(1),
    time: '10:00',
    service: 'Klassinen hieronta',
    serviceId: '1',
    price: 75,
    customerName: 'Sari Leinonen',
    customerEmail: 'sari@example.com',
    customerPhone: '+358 44 222 3344',
    notes: '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '1005',
    date: getDateOffset(2),
    time: '13:00',
    service: 'Urheiluhieronta',
    serviceId: '2',
    price: 85,
    customerName: 'Juha Heikkinen',
    customerEmail: 'juha@example.com',
    customerPhone: '+358 45 555 6677',
    notes: 'Maratonvalmistautuminen',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '1006',
    date: getDateOffset(4),
    time: '09:00',
    service: 'Klassinen hieronta',
    serviceId: '1',
    price: 75,
    customerName: 'Maria Oja',
    customerEmail: 'maria@example.com',
    customerPhone: '',
    notes: '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '1007',
    date: getDateOffset(-3),
    time: '10:00',
    service: 'Lyhyt huolto',
    serviceId: '3',
    price: 45,
    customerName: 'Timo Salo',
    customerEmail: 'timo@example.com',
    customerPhone: '',
    notes: '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '1008',
    date: getDateOffset(-1),
    time: '15:00',
    service: 'Klassinen hieronta',
    serviceId: '1',
    price: 75,
    customerName: 'Hanna Järvi',
    customerEmail: 'hanna@example.com',
    customerPhone: '+358 40 888 9900',
    notes: '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
]

export const DEMO_BLOCKED = [getDateOffset(7)]

export function loadDemoData() {
  localStorage.setItem('booking_settings', JSON.stringify(DEMO_SETTINGS))
  localStorage.setItem('booking_bookings', JSON.stringify(DEMO_BOOKINGS))
  localStorage.setItem('booking_blockedDates', JSON.stringify(DEMO_BLOCKED))
  localStorage.setItem('booking_isLoggedIn', JSON.stringify(true))
  localStorage.setItem('booking_isDemo', 'true')
}

export function isDemoMode() {
  return localStorage.getItem('booking_isDemo') === 'true'
}

export function clearDemoData() {
  ['settings','bookings','blockedDates','isLoggedIn','isDemo'].forEach(k => {
    localStorage.removeItem('booking_' + k)
  })
}
