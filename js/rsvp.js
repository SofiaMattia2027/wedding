/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — GESTIONE RSVP
 * Wrapper di compatibilità che delega al modulo dedicato
 * ============================================================
 */
(function() {
  'use strict';
  // Se il modulo modularizzato è già caricato, esporta la funzione su window
  if (window.WeddingApp && window.WeddingApp.initRSVP) {
    window.initRSVP = window.WeddingApp.initRSVP;
  }
})();
