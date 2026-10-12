/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — NAVIGATION & SCROLL UI
 * Menu responsive mobile, scroll spy, barra rapida e back to top
 * ============================================================
 */
(function() {
  'use strict';

  window.WeddingApp = window.WeddingApp || {};

  /**
   * Inizializza i controlli di navigazione, scroll spy e bottoni fluttuanti
   */
  function initNavigation() {
    // 1. Menu Mobile Responsive (Hamburger) con blocco scroll e chiusura esterna
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
      const closeMobileMenu = () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      };

      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      navMenu.querySelectorAll('.nav-link, .nav-cta-btn').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });

      document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          closeMobileMenu();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
          closeMobileMenu();
        }
      });
    }

    // 2. Scroll Spy per indicare la voce di menu attiva
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
      const scrollPos = window.scrollY + 120;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // 3. Barra Rapida Inferiore Mobile (Sticky RSVP Bar) a comparsa intelligente
    const mobileStickyBar = document.getElementById('mobileStickyBar');
    const rsvpSection = document.getElementById('rsvp');

    if (mobileStickyBar) {
      let ticking = false;

      function updateStickyBar() {
        // Attiva esclusivamente su schermi mobile <= 768px
        if (window.innerWidth > 768) {
          mobileStickyBar.classList.remove('visible');
          ticking = false;
          return;
        }

        // Nascondi se il menu di navigazione mobile è aperto
        if (navMenu && navMenu.classList.contains('open')) {
          mobileStickyBar.classList.remove('visible');
          ticking = false;
          return;
        }

        const scrollY = window.scrollY || window.pageYOffset;
        const rsvpRect = rsvpSection ? rsvpSection.getBoundingClientRect() : null;
        
        // Consideriamo l'utente dentro la sezione RSVP se essa è visibile nel viewport
        const isInsideRsvp = rsvpRect && rsvpRect.top < window.innerHeight - 60 && rsvpRect.bottom > 80;

        // Mostra dopo aver superato la hero (scrollY > 420) e quando NON siamo nella sezione RSVP
        if (scrollY > 420 && !isInsideRsvp) {
          mobileStickyBar.classList.add('visible');
        } else {
          mobileStickyBar.classList.remove('visible');
        }

        ticking = false;
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateStickyBar);
          ticking = true;
        }
      }, { passive: true });

      window.addEventListener('resize', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateStickyBar);
          ticking = true;
        }
      }, { passive: true });
    }

    // 4. Pulsante Fluttuante Torna Su (Back to Top)
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      let topTicking = false;
      window.addEventListener('scroll', () => {
        if (!topTicking) {
          window.requestAnimationFrame(() => {
            const scrollY = window.scrollY || window.pageYOffset;
            if (scrollY > 550) {
              backToTopBtn.classList.add('visible');
            } else {
              backToTopBtn.classList.remove('visible');
            }
            topTicking = false;
          });
          topTicking = true;
        }
      }, { passive: true });

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  window.WeddingApp.initNavigation = initNavigation;
})();
