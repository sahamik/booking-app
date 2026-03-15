/**
 * api/send-email.js
 * Lähettää varausvahvistuksen sähköpostiin Resend-palvelun kautta.
 * Aseta RESEND_API_KEY Vercel-ympäristömuuttujiin.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  res.setHeader('Access-Control-Allow-Origin', '*')

  const { to, customerName, businessName, date, time, service, bookingId } = req.body
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    // Ei sähköpostiavainta — ei ole pakollinen, skippaataan
    return res.status(200).json({ sent: false, reason: 'No email key configured' })
  }

  const html = `
    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #fdfbf7; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="width: 48px; height: 48px; background: #3d6340; border-radius: 12px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 24px;">✓</span>
        </div>
        <h1 style="font-size: 22px; font-weight: 700; color: #1e3320; margin: 0;">Varauksesi on vahvistettu!</h1>
      </div>

      <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #ccdccc; margin-bottom: 20px;">
        <p style="margin: 0 0 12px; font-size: 13px; color: #527d52; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Varauksen tiedot</p>
        <table style="width: 100%; font-size: 14px; color: #1e3320;">
          <tr><td style="padding: 6px 0; color: #527d52;">Palvelu</td><td style="text-align: right; font-weight: 600;">${service}</td></tr>
          <tr><td style="padding: 6px 0; color: #527d52;">Päivä</td><td style="text-align: right; font-weight: 600;">${date}</td></tr>
          <tr><td style="padding: 6px 0; color: #527d52;">Kellonaika</td><td style="text-align: right; font-weight: 600;">${time}</td></tr>
          <tr><td style="padding: 6px 0; color: #527d52;">Yritys</td><td style="text-align: right; font-weight: 600;">${businessName}</td></tr>
          <tr><td style="padding: 6px 0; color: #527d52;">Varausnumero</td><td style="text-align: right; font-family: monospace; font-size: 12px;">#${bookingId}</td></tr>
        </table>
      </div>

      <p style="font-size: 13px; color: #527d52; text-align: center;">Saat muistutuksen 24h ennen aikaasi.</p>
    </div>
  `

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${businessName} <noreply@varaa.fi>`,
        to: [to],
        subject: `✓ Varaus vahvistettu — ${date} klo ${time}`,
        html,
      }),
    })
    const data = await r.json()
    return res.status(200).json({ sent: true, id: data.id })
  } catch (e) {
    return res.status(200).json({ sent: false, reason: e.message })
  }
}
