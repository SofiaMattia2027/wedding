/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — COUNTDOWN & CALENDARIO
 * ============================================================
 */

window.initCountdown = function(weddingDateISO) {
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');
  const countdownEl = document.getElementById('countdown');

  if (!cdDays || !cdHours || !cdMins || !cdSecs) {
    return;
  }

  const targetDate = new Date(weddingDateISO).getTime();

  function update() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (countdownEl) {
        countdownEl.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 24px; text-align: center;">
            <p style="font-family: var(--font-serif); font-size: 2rem; font-style: italic; color: var(--accent-terracotta);">
              Oggi celebriamo il nostro amore! ✨ Sofia &amp; Mattia
            </p>
          </div>
        `;
      }
      clearInterval(interval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cdDays.textContent = String(days);
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMins.textContent = String(minutes).padStart(2, '0');
    cdSecs.textContent = String(seconds).padStart(2, '0');
  }

  update();
  const interval = setInterval(update, 1000);
};

/**
 * Genera e avvia il download del file .ics per salvare l'evento sul calendario
 */
window.downloadIcsCalendar = function(config) {
  // Escape dei caratteri speciali richiesto da RFC 5545 (virgole, punti e virgola, backslash, a capo)
  const esc = (s) => String(s)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');

  const title = `Matrimonio di Sofia Saracco e Mattia Passuello`;
  const ceremonyName = (config.ceremony && config.ceremony.name) || 'Pieve di San Secondo';
  const ceremonyAddr = (config.ceremony && config.ceremony.address) || 'Cortazzone (AT)';
  const receptionName = (config.reception && config.reception.name) || 'Torre di Batibò';
  const receptionAddr = (config.reception && config.reception.address) || 'Piovà Massaia (AT)';
  
  const siteUrl = (config && config.siteUrl) || (typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://sofiamattia2027.github.io/wedding');
  const description = `Cerimonia ore 16:00 presso ${ceremonyName} (${ceremonyAddr}).\nA seguire ricevimento e festa presso ${receptionName} (${receptionAddr}).\nDettagli completi sul sito: ${siteUrl}`;
  const location = `${ceremonyName}, ${ceremonyAddr}`;
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sofia Saracco e Mattia Passuello//Matrimonio 2027//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:wedding-sofia-saracco-mattia-passuello-2027@matrimonio',
    'DTSTAMP:20261010T120000Z',
    'DTSTART:20270910T140000Z',
    'DTEND:20270910T230000Z',
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(description)}`,
    `LOCATION:${esc(location)}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Domani: Matrimonio di Sofia Saracco e Mattia Passuello!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'matrimonio-sofia-saracco-mattia-passuello.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
