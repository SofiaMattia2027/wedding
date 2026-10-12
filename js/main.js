/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — MAIN UI SCRIPT
 * Micro-interazioni, Sfondo Autunnale, Scroll Reveal & Toast
 * ============================================================
 */

// SISTEMA TOAST GLOBALE
window.showToast = function(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  
  let icon = '✓';
  if (type === 'warning') icon = '⚠';
  if (type === 'error') icon = '✕';

  toast.innerHTML = `<span style="font-weight:700;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 3500);
};

// EFFETTO CELEBRAZIONE PETALI DI ROSA & CONFETTI SU INVIO RSVP
window.launchCelebration = function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let canvas = document.getElementById('confettiCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const onResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize);

  const colors = ['#C88E82', '#E2AEA2', '#8C5535', '#56684C', '#B59765', '#FAF0EB', '#FAF7F2'];
  const particles = [];
  const particleCount = 55;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 9 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 2.4 + 1.1,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 4 - 2,
      opacity: 1,
      isPetal: i % 2 === 0
    });
  }

  let startTime = Date.now();

  function render() {
    ctx.clearRect(0, 0, width, height);
    const elapsed = Date.now() - startTime;

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.02) + p.speedX;
      p.rotation += p.rotationSpeed;

      if (elapsed > 3000) {
        p.opacity = Math.max(0, p.opacity - 0.02);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      if (p.isPetal) {
        // Sagoma organica a petalo di rosa
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.4, p.size * 0.7, p.size * 0.7, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.7, -p.size * 0.8, -p.size * 0.4, 0, -p.size);
      } else {
        ctx.ellipse(0, 0, p.size * 0.7, p.size * 0.45, 0, 0, 2 * Math.PI);
      }
      ctx.fill();
      ctx.restore();
    });

    if (elapsed < 4800) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
      window.removeEventListener('resize', onResize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }
  }

  render();
};

// ============================================================
// ANIMAZIONE SFONDO FLOREALE & AUTUNNALE HERO (FOGLIE & PETALI)
// ============================================================
function initHeroAutumnAnimation() {
  const canvas = document.getElementById('heroAutumnCanvas');
  const heroSection = document.getElementById('hero');
  if (!canvas || !heroSection) return;

  // Rispetta la preferenza di riduzione movimento
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let animationId = null;
  let isHeroVisible = true;

  // Palette floreale & botanica d'inizio autunno (Settembre in Monferrato)
  const autumnColors = [
    { base: 'rgba(216, 160, 146,', tint: 'rgba(242, 198, 188,' }, // Rosa cipria floreale / petalo
    { base: 'rgba(238, 218, 208,', tint: 'rgba(255, 238, 230,' }, // Crema avorio delicato
    { base: 'rgba(182, 122, 104,', tint: 'rgba(215, 155, 138,' }, // Rosa antico terracotta
    { base: 'rgba(140, 85, 53,',   tint: 'rgba(180, 110, 75,' },  // Terracotta caldo
    { base: 'rgba(181, 151, 101,', tint: 'rgba(215, 185, 135,' }, // Oro satinato / polline
    { base: 'rgba(96, 118, 86,',   tint: 'rgba(138, 162, 128,' }  // Salvia verde botanica
  ];

  function resize() {
    const rect = heroSection.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform prima dello scale
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Brezza delicata al passaggio del mouse
  let windTargetX = 0;
  let windX = 0;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    windTargetX = ((relX / width) - 0.5) * 1.6;
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    windTargetX = 0;
  }, { passive: true });

  // Disegno organico di foglie botaniche e petali floreali
  function drawLeaf(ctx, type, size, colorObj, opacity) {
    ctx.fillStyle = colorObj.base + opacity + ')';
    ctx.strokeStyle = colorObj.tint + (opacity * 0.75) + ')';
    ctx.lineWidth = 0.8;

    ctx.beginPath();
    if (type === 0) {
      // 1. Foglia ovale sinuosa (olivo / salvia con venatura)
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.65, -size * 0.5, size * 0.65, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.65, size * 0.5, -size * 0.65, -size * 0.5, 0, -size);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.75);
      ctx.lineTo(0, size * 0.75);
      ctx.stroke();
    } else if (type === 1) {
      // 2. Foglia di vite stilizzata con lobi
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(size * 0.85, -size * 0.4, size * 0.5, 0);
      ctx.quadraticCurveTo(size * 0.75, size * 0.5, 0, size);
      ctx.quadraticCurveTo(-size * 0.75, size * 0.5, -size * 0.5, 0);
      ctx.quadraticCurveTo(-size * 0.85, -size * 0.4, 0, -size);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.7);
      ctx.lineTo(0, size * 0.7);
      ctx.stroke();
    } else if (type === 2) {
      // 3. Petalo curvo di rosa floreale (romantic rose petal)
      ctx.moveTo(0, -size * 1.05);
      ctx.bezierCurveTo(size * 0.85, -size * 0.4, size * 0.75, size * 0.8, 0, size * 1.1);
      ctx.bezierCurveTo(-size * 0.75, size * 0.8, -size * 0.85, -size * 0.4, 0, -size * 1.05);
      ctx.fill();
      ctx.stroke();
    } else if (type === 3) {
      // 4. Piccolo fiore selvatico a 5 petali
      for (let p = 0; p < 5; p++) {
        const angle = (p * Math.PI * 2) / 5;
        const px = Math.cos(angle) * (size * 0.45);
        const py = Math.sin(angle) * (size * 0.45);
        ctx.beginPath();
        ctx.arc(px, py, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(235, 205, 150, ' + opacity + ')';
      ctx.fill();
    } else {
      // 5. Polline dorato e granello di luce d'atmosfera
      ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Generazione elementi floreali & foglie
  const isMobile = window.innerWidth < 768;
  const leafCount = isMobile ? 26 : 42;
  const leaves = [];

  for (let i = 0; i < leafCount; i++) {
    leaves.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + (isMobile ? 8 : 11),
      speedY: Math.random() * 0.75 + 0.35,
      speedX: Math.random() * 0.5 - 0.25,
      sway: Math.random() * 2 + 1,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayOffset: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.018,
      flip: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.025 + 0.01,
      color: autumnColors[Math.floor(Math.random() * autumnColors.length)],
      type: Math.floor(Math.random() * 5),
      opacity: Math.random() * 0.35 + 0.35
    });
  }

  let time = 0;

  function render() {
    if (!isHeroVisible) return;

    ctx.clearRect(0, 0, width, height);
    time += 0.015;
    windX += (windTargetX - windX) * 0.035;

    leaves.forEach(leaf => {
      leaf.y += leaf.speedY;
      leaf.x += Math.sin(time * leaf.sway + leaf.swayOffset) * 0.6 + windX + leaf.speedX;
      leaf.rotation += leaf.rotationSpeed;
      leaf.flip += leaf.flipSpeed;

      // Riposizionamento fluido quando escono dal fondo o dai lati
      if (leaf.y > height + 40) {
        leaf.y = -35;
        leaf.x = Math.random() * width;
      }
      if (leaf.x > width + 40) leaf.x = -35;
      if (leaf.x < -40) leaf.x = width + 35;

      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      // Il flip simula la foglia che si avvita morbidamente in 3D nello spazio
      ctx.scale(Math.cos(leaf.flip), 1);

      drawLeaf(ctx, leaf.type, leaf.size, leaf.color, leaf.opacity);
      ctx.restore();
    });

    animationId = requestAnimationFrame(render);
  }

  // Ottimizzazione consumi: pausa se l'utente scende lungo la pagina
  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible) {
          if (!animationId) animationId = requestAnimationFrame(render);
        } else {
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      });
    }, { threshold: 0.05 });

    heroObserver.observe(heroSection);
  } else {
    animationId = requestAnimationFrame(render);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const CONFIG = window.CONFIG;

  if (!CONFIG) {
    console.error("Configurazione CONFIG non trovata.");
    return;
  }

  // 1. Inizializzazione Countdown e RSVP
  if (typeof window.initCountdown === 'function' && CONFIG.weddingDateISO) {
    window.initCountdown(CONFIG.weddingDateISO);
  }

  if (typeof window.initRSVP === 'function') {
    window.initRSVP(CONFIG);
  }

  // 2. Avvio Sfondo Autunnale nella Hero
  initHeroAutumnAnimation();

  // 3. Menu Mobile Responsive (Hamburger) con blocco scroll e chiusura esterna
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
      mobileToggle.setAttribute('aria-expanded', isOpen);
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

  // 3b. Selettore Location Mobile a Tab & Link Rapido
  const venuesGrid = document.getElementById('venuesGrid');
  const venueTabBtns = document.querySelectorAll('.venue-tab-btn');
  const venueSwitchLinks = document.querySelectorAll('.venue-switch-link');

  if (venuesGrid && venueTabBtns.length > 0) {
    venuesGrid.classList.add('mobile-tabs-ready');

    function setActiveVenue(targetVenue) {
      venueTabBtns.forEach(btn => {
        const isMatch = btn.getAttribute('data-venue-target') === targetVenue;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
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

  // 3c. Selettore Dress Code Mobile a Tab (Lei / Lui)
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
          b.setAttribute('aria-selected', match ? 'true' : 'false');
        });
        dressGrid.querySelectorAll('.dresscode-tip-box').forEach(box => {
          box.classList.toggle('active', box.getAttribute('data-gender') === target);
        });
      });
    });
  }

  // 3d. Selettore Logistica Mobile a Tab (Da Torino / Da Milano & Asti)
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
          b.setAttribute('aria-selected', match ? 'true' : 'false');
        });
        dirGrid.querySelectorAll('.direction-card').forEach(card => {
          card.classList.toggle('active', card.getAttribute('data-route') === target);
        });
      });
    });
  }

  // 4. Copia IBAN negli appunti con feedback visivo e toast
  const copyIbanBtn = document.getElementById('copyIbanBtn');
  const ibanTextEl = document.getElementById('ibanCodeText');

  // Unica fonte di verità: l'IBAN mostrato è lo stesso che viene copiato (da config.js)
  if (ibanTextEl && CONFIG.gift && CONFIG.gift.iban) {
    ibanTextEl.textContent = CONFIG.gift.iban;
  }

  if (copyIbanBtn) {
    copyIbanBtn.addEventListener('click', async () => {
      const rawIban = CONFIG.gift && CONFIG.gift.iban ? CONFIG.gift.iban.replace(/\s+/g, '') : (ibanTextEl ? ibanTextEl.textContent.replace(/\s+/g, '') : '');

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(rawIban);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = rawIban;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        const originalText = copyIbanBtn.innerHTML;
        copyIbanBtn.innerHTML = `<span>✓ Copiato!</span>`;
        copyIbanBtn.style.background = 'var(--accent-sage)';
        copyIbanBtn.style.color = 'var(--text-inverse)';
        copyIbanBtn.style.borderColor = 'var(--accent-sage)';

        window.showToast('IBAN copiato negli appunti! Grazie di cuore ♥', 'success');

        setTimeout(() => {
          copyIbanBtn.innerHTML = originalText;
          copyIbanBtn.removeAttribute('style');
        }, 2500);
      } catch (err) {
        console.error('Impossibile copiare:', err);
        window.showToast('Seleziona e copia manualmente l\'IBAN.', 'warning');
      }
    });
  }

  // 5. Download file Calendario (.ics)
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');
  if (addToCalendarBtn && typeof window.downloadIcsCalendar === 'function') {
    addToCalendarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.downloadIcsCalendar(CONFIG);
      window.showToast('Promemoria evento salvato per il tuo calendario!', 'success');
    });
  }

  // 6. Scroll Reveal con IntersectionObserver (fluido, moderno e leggero)
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
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

  // 7. Scroll Spy per navigazione attiva
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

  // 8. Galleria Polaroid con Lightbox a schermo intero
  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  if (galleryLightbox && lightboxImg && lightboxCaption) {
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

  // 9. Barra Rapida Inferiore Mobile (Sticky RSVP Bar) a scomparsa intelligente
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

  // 10. Pulsante Fluttuante Torna Su (Back to Top)
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
});
