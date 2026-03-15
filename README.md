# Aikaxi.fi — Varausjärjestelmä pienyrittäjille

Yksinkertainen ja reagoiva varausratkaisu pienyrittäjille (hierojat, valokuvaajat, personal trainerit ja palvelualan ammattilaiset).

---

## 📌 Mitä tämä tämä tarjoaa

- Asikkaiden varauspolku: landing page → kalenteri → palveluvalinta → lomake
- Admin-hallinta: varauslista, kalenteri, palveluiden hallinta ja asetukset
- Sähköpostivahvistus Resendillä (valinnainen)
- Suljetut päivät (lomien ja poissaolojen määrittely)
- Palvelut ja hinnat kustomoitavissa
- Responsiivinen UI mobiili- ja työpöytäkäytölle
- LocalStorage-tallennus ilman taustapalvelinta

---

## 🚀 Pika-asennus

1. Kloonaa repo tai siirry projektiin

```bash
npm install
npm run dev
```

2. Avaa selaimessa:

- `http://localhost:5173`

3. Admin-kirjautuminen:

- `http://localhost:5173/?admin=1`
- Oletussalasana: `admin123` (muuta heti)

4. Varaussivu asiakkaalle:

- `http://localhost:5173/?book=1`

---

## 🛠️ Ympäristö ja konfigurointi

### Node + Vite

- Node 18+ suositeltu
- Vite + React + Tailwind

### .env (esimerkki)

- `VITE_APP_TITLE="Aikaxi"
- `RESEND_API_KEY=re_...` (valinnainen)

> Ilman `RESEND_API_KEY` sovellus toimii, mutta sähköpostia ei lähetetä.

---

## 🌍 Reitit

- Landing page: `/`
- Varaussivu: `/?book=1`
- Admin-kirjautuminen: `/?admin=1`

---

## 🔐 Admin-ominaisuudet

1. Yrityksen tiedot: nimi, sähköposti, puhelinnumero
2. Aukioloajat, tauot ja työpäivät
3. Palveluiden lisäys/poisto, kesto, hinta
4. Kalenterin sulkeminen yksittäisinä päivinä

---

## 📧 Sähköpostivahvistus (Resend)

1. Rekisteröidy: https://resend.com
2. Luo API-avain
3. Lisää Vercel-asetuksiin: `RESEND_API_KEY=re_...`

---

## ☁️ Deploy Verceliin

```bash
npm run build
npx vercel --prod
```

Tai käytä Vercelin GitHub-integraatiota automaattiseen julkaisuun.

---

## 🧩 Koodirakenne

```
src/
├── App.jsx             # Reititys (landing/book/admin)
├── components/
│   ├── LandingPage.jsx
│   ├── BookingFlow.jsx
│   ├── AdminDashboard.jsx
│   ├── Calendar.jsx
│   └── LoginPage.jsx
├── utils/
│   ├── store.js
│   ├── calendarUtils.js
│   └── demoData.js
api/
└── send-email.js       # Vercel serverless sähköposti
```

---

## 🚦 Saatavuuskehitys (Ideat)

- Maksut (Stripe / PayPal)
- SMS-muistutukset (Twilio)
- Google Kalenteri -synkronointi
- Raportointi, tilastot ja liikevaihto
- Monikielisyys
- Käyttäjätilit ja backend-tietokanta (Supabase / Firebase)

---

## 📌 Huomio

Sovellus käyttää selaimen `localStoragea`. Tuotantossa suositellaan todellista backendia tietokannan kanssa (esim. Supabase).
