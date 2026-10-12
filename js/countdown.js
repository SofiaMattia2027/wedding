/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — COUNTDOWN & CALENDARIO
 * Wrapper di compatibilità che delega al modulo dedicato
 * ============================================================
 */
(function() {
  'use strict';
  // Se il modulo modularizzato è già caricato, esporta le funzioni su window
  if (window.WeddingApp && window.WeddingApp.initCountdown) {
    window.initCountdown = window.WeddingApp.initCountdown;
    window.downloadIcsCalendar = window.WeddingApp.downloadIcsCalendar;
  }
})();
