/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — LIGHTBOX MODAL
 * Galleria Polaroid con visualizzatore a schermo intero e focus trap
 * ============================================================
 */
(function() {
  'use strict';

  window.WeddingApp = window.WeddingApp || {};

  /**
   * Inizializza il lightbox accessibile della galleria Polaroid
   */
  function initLightbox() {
    const galleryLightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

    if (!galleryLightbox || !lightboxImg || !lightboxCaption) return;

    const polaroidCards = document.querySelectorAll('.polaroid-card');
    let lastFocused = null;

    polaroidCards.forEach(card => {
      // Apertura su click o Invio/Spazio da tastiera per accessibilità
      const handleOpen = () => {
        const fullSrc = card.getAttribute('data-full') || (card.querySelector('img') ? card.querySelector('img').src : '');
        const captionText = card.getAttribute('data-caption') || (card.querySelector('.polaroid-caption') ? card.querySelector('.polaroid-caption').textContent : '');

        lastFocused = card;
        lightboxImg.src = fullSrc;
        lightboxImg.alt = captionText;
        lightboxCaption.textContent = captionText;
        galleryLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (lightboxCloseBtn) lightboxCloseBtn.focus();
      };

      card.addEventListener('click', handleOpen);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      });
    });

    const closeLightbox = () => {
      galleryLightbox.classList.remove('active');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
      setTimeout(() => {
        if (!galleryLightbox.classList.contains('active')) {
          lightboxImg.src = '';
        }
      }, 350);
    };

    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
    }

    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox || e.target.classList.contains('lightbox-img-wrap')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!galleryLightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'Tab' && lightboxCloseBtn) {
        // Focus trap: l'unico elemento interattivo della lightbox è il bottone di chiusura
        e.preventDefault();
        lightboxCloseBtn.focus();
      }
    });
  }

  window.WeddingApp.initLightbox = initLightbox;
})();
