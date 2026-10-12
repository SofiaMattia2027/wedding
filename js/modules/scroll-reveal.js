/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — SCROLL REVEAL
 * Animazioni d'entrata al raggiungimento della viewport
 * ============================================================
 */
(function() {
  'use strict';

  window.WeddingApp = window.WeddingApp || {};

  /**
   * Inizializza l'IntersectionObserver per le animazioni on-scroll
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    if (revealElements.length === 0) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  }

  window.WeddingApp.initScrollReveal = initScrollReveal;
})();
