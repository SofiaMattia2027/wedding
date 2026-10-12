/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — HERO AUTUMN ANIMATION
 * Animazione botanica e floreale d'inizio autunno (Settembre in Monferrato)
 * ============================================================
 */
(function() {
  'use strict';

  window.WeddingApp = window.WeddingApp || {};

  /**
   * Inizializza l'animazione di foglie e petali nel canvas dell'hero
   */
  function initHeroAutumnAnimation() {
    const canvas = document.getElementById('heroAutumnCanvas');
    const heroSection = document.getElementById('hero');
    if (!canvas || !heroSection) return;

    // Rispetta la preferenza di riduzione movimento dell'utente
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animationId = null;
    let isHeroVisible = true;

    // Palette floreale & botanica d'inizio autunno
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
      ctx.setTransform(1, 0, 0, 1, 0, 0);
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
        // 3. Petalo curvo di rosa floreale
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

        if (leaf.y > height + 40) {
          leaf.y = -35;
          leaf.x = Math.random() * width;
        }
        if (leaf.x > width + 40) leaf.x = -35;
        if (leaf.x < -40) leaf.x = width + 35;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.scale(Math.cos(leaf.flip), 1);

        drawLeaf(ctx, leaf.type, leaf.size, leaf.color, leaf.opacity);
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    }

    // Pausa l'animazione quando l'utente fa scroll sotto la Hero per ottimizzare le prestazioni
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

  window.WeddingApp.initHeroAnimation = initHeroAutumnAnimation;
})();
