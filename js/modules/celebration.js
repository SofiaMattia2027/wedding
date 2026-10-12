/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — CELEBRATION ANIMATION
 * Effetto celebrazione petali di rosa e confetti su invio RSVP
 * ============================================================
 */
(function() {
  'use strict';

  window.WeddingApp = window.WeddingApp || {};

  /**
   * Avvia l'effetto particellare floreale su canvas a schermo intero
   */
  function launchCelebration() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

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

    const startTime = Date.now();

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
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
    }

    render();
  }

  // Registrazione nel namespace dell'applicazione e alias globale
  window.WeddingApp.launchCelebration = launchCelebration;
  window.launchCelebration = launchCelebration;
})();
