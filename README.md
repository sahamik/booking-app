# 📅 BookApp – Moderni Varausjärjestelmä

BookApp on tyylikäs, nopea ja käyttäjäystävällinen ajanvaraussovellus, joka on rakennettu modernilla React + TypeScript -pinolla. Sovelluksessa on panostettu erityisesti visuaalisuuteen ja saumattomaan käyttäjäkokemukseen.

---

## ✨ Ominaisuudet

### Asiakkaalle
- Moderni dashboard: Yhteenveto tulevista varauksista ja kanta-asiakastiedoista
- Interaktiivinen kalenteri: Helppo ja visuaalinen päivän ja kellonajan valinta
- Varausten hallinta: Näe omat varaukset ja niiden tila (Vahvistettu, Odottaa, Suoritettu)
- Tyylikäs käyttöliittymä: Glassmorphism-efektit, dynaaminen navbar ja täysi mobiiliresponsiivisuus

### Hallinta (Admin)
- Admin dashboard: Näkymä yrityksen palveluihin ja varauksiin
- Palveluiden hallinta: Mahdollisuus lisätä uusia palveluita suoraan paneelista

---

## 🛠 Tekninen pino

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS v4
- React Router v6
- Heroicons / Lucide
- date-fns

### Backend (TULOSSA)
- Node.js (Express, TypeScript)
- JWT WebToken
- MongoDB

---

## 📂 Projektirakenne

```plaintext
├── backend/            # Palvelimen koodit
└── frontend/
    └── src/
        ├── components/ # Uudelleenkäytettävät komponentit (Navbar jne.)
        ├── pages/      # Sivunäkymät (Login, Dashboard, Bookings jne.)
        ├── assets/     # Kuvat ja staattiset tiedostot
        └── App.tsx     # Reititys ja sovelluksen päätaso
```

---

## 🚀 Käyttöönotto

### Frontend
1. Siirry frontend-kansioon:
   ```bash
   cd frontend
   ```
2. Asenna riippuvuudet:
   ```bash
   npm install
   ```
3. Asenna Tailwind CSS ja konfiguroi se:
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```
   Lisää Tailwind CSS -direktiivit tiedostoon `src/index.css`:
   ```css
  @import "tailwindcss";
   ```
   Lisää seuraava konfiguraatio tiedostoon `frontend/vite.config.ts`:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [
       react(),
       tailwindcss(),
     ],
   })
   ```
4. Käynnistä kehityspalvelin:
   ```bash
   npm run dev
   ```
5. Avaa selaimessa osoite, jonka terminaali näyttää (yleensä http://localhost:5173)

### Backend (TULOSSA MYÖHEMMIN)
1. Siirry backend-kansioon:
   ```bash
   cd backend
   ```
2. Asenna riippuvuudet:
   ```bash
   npm install
   ```
3. Käynnistä palvelin:
   ```bash
   npm run dev
   ```
4. Backend toimii portissa (esim. http://localhost:5000)

---

## Käyttö
- Rekisteröidy tai kirjaudu sisään osoitteessa `/login`
- Käyttäjän dashboard: Näe ja luo varauksia
- Admin dashboard: Hallitse käyttäjiä ja varauksia

---

## Lisenssi
Tämä projekti on tarkoitettu opetuskäyttöön.

## Tekijä
Mikael 
