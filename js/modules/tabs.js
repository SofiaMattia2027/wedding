/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — MOBILE TABS SYSTEM
 * Selettori a tab per Location, Dress Code e Logistica
 * ============================================================
 */
(function() {
  'use strict';

  window.WeddingApp = window.WeddingApp || {};

  /**
   * Inizializza i controller dei tab mobile
   */
  function initTabs() {
    // 1. Selettore Location Mobile a Tab & Link Rapido
    const venuesGrid = document.getElementById('venuesGrid');
    const venueTabBtns = document.querySelectorAll('.venue-tab-btn');
    const venueSwitchLinks = document.querySelectorAll('.venue-switch-link');

    if (venuesGrid && venueTabBtns.length > 0) {
      venuesGrid.classList.add('mobile-tabs-ready');

      function setActiveVenue(targetVenue) {
        venueTabBtns.forEach(btn => {
          const isMatch = btn.getAttribute('data-venue-target') === targetVenue;
          btn.classList.toggle('active', isMatch);
          btn.setAttribute('aria-selected', String(isMatch));
        });

        const cards = venuesGrid.querySelectorAll('.venue-card');
        cards.forEach(card => {
          const isMatch = card.getAttribute('data-venue') === targetVenue;
          card.classList.toggle('active', isMatch);
          if (isMatch) {
            card.classList.add('is-visible');
          }
        });
      }

      venueTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetVenue = btn.getAttribute('data-venue-target');
          if (targetVenue) setActiveVenue(targetVenue);
        });
      });

      venueSwitchLinks.forEach(link => {
        link.addEventListener('click', () => {
          const targetVenue = link.getAttribute('data-switch-to');
          if (targetVenue) {
            setActiveVenue(targetVenue);
            const locationSection = document.getElementById('location');
            if (locationSection) {
              locationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    }

    // 2. Selettore Dress Code Mobile a Tab (Lei / Lui)
    const dressGrid = document.getElementById('dresscodeTipsGrid');
    const dressBtns = document.querySelectorAll('.dresscode-tab-btn');
    if (dressGrid && dressBtns.length > 0) {
      dressGrid.classList.add('mobile-tabs-ready');
      dressBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-gender-target');
          dressBtns.forEach(b => {
            const match = b.getAttribute('data-gender-target') === target;
            b.classList.toggle('active', match);
            b.setAttribute('aria-selected', String(match));
          });
          dressGrid.querySelectorAll('.dresscode-tip-box').forEach(box => {
            box.classList.toggle('active', box.getAttribute('data-gender') === target);
          });
        });
      });
    }

    // 3. Selettore Logistica Mobile a Tab (Da Torino / Da Milano & Asti)
    const dirGrid = document.getElementById('directionsGrid');
    const dirBtns = document.querySelectorAll('.directions-tab-btn');
    if (dirGrid && dirBtns.length > 0) {
      dirGrid.classList.add('mobile-tabs-ready');
      dirBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-route-target');
          dirBtns.forEach(b => {
            const match = b.getAttribute('data-route-target') === target;
            b.classList.toggle('active', match);
            b.setAttribute('aria-selected', String(match));
          });
          dirGrid.querySelectorAll('.direction-card').forEach(card => {
            card.classList.toggle('active', card.getAttribute('data-route') === target);
          });
        });
      });
    }
  }

  window.WeddingApp.initTabs = initTabs;
})();
