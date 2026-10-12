/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — APPLICATION BOOTSTRAP
 * Coordinatore modulare di avvio per l'esperienza utente
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  const config = window.CONFIG;

  if (!config) {
    console.error('WeddingApp: Configurazione window.CONFIG non trovata in js/config.js.');
    return;
  }

  const App = window.WeddingApp || {};

  // 1. Sfondo botanico autunnale nella Hero
  if (typeof App.initHeroAnimation === 'function') {
    App.initHeroAnimation();
  }

  // 2. Timer conto alla rovescia
  if (typeof App.initCountdown === 'function' && config.weddingDateISO) {
    App.initCountdown(config.weddingDateISO);
  }

  // 3. Modulo conferma presenza RSVP
  if (typeof App.initRSVP === 'function') {
    App.initRSVP(config);
  }

  // 4. Navigazione mobile, scroll spy, sticky bar e back-to-top
  if (typeof App.initNavigation === 'function') {
    App.initNavigation();
  }

  // 5. Selettori a tab (location, dresscode, logistica)
  if (typeof App.initTabs === 'function') {
    App.initTabs();
  }

  // 6. Copia coordinate IBAN
  if (typeof App.initClipboard === 'function') {
    App.initClipboard(config);
  }

  // 7. Download promemoria evento calendario (.ics)
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');
  if (addToCalendarBtn && typeof App.downloadIcsCalendar === 'function') {
    addToCalendarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      App.downloadIcsCalendar(config);
      if (typeof App.showToast === 'function') {
        App.showToast('Promemoria evento salvato per il tuo calendario!', 'success');
      }
    });
  }

  // 8. Galleria Polaroid con Lightbox modale
  if (typeof App.initLightbox === 'function') {
    App.initLightbox();
  }

  // 9. Animazioni di comparsa on-scroll (Scroll Reveal)
  if (typeof App.initScrollReveal === 'function') {
    App.initScrollReveal();
  }
});
