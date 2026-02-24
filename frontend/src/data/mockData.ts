export interface DayStatus {
  date: string; // Muodossa YYYY-MM-DD
  bookedSlots: number;
}

export const mockDayStats: DayStatus[] = [
  { date: "2026-05-20", bookedSlots: 8 }, // Täynnä (oletetaan max 8)
  { date: "2026-05-21", bookedSlots: 3 }, // Vapaata
  { date: "2026-05-22", bookedSlots: 0 }, // Täysin vapaa
  { date: "2026-05-23", bookedSlots: 8 }, // Täynnä
  { date: "2026-05-24", bookedSlots: 5 }, // Melkein täynnä
];