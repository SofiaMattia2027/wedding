/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — CLIPBOARD UTILITIES
 * Copia IBAN negli appunti con feedback visivo e toast
 * ============================================================
 */
(function() {
  'use strict';

  window.WeddingApp = window.WeddingApp || {};

  /**
   * Inizializza il bottone di copia IBAN
   * @param {Object} config - Configurazione matrimonio
   */
  function initClipboard(config) {
    const copyIbanBtn = document.getElementById('copyIbanBtn');
    const ibanTextEl = document.getElementById('ibanCodeText');

    // Unica fonte di verità: l'IBAN mostrato proviene direttamente da config.js
    if (ibanTextEl && config.gift && config.gift.iban) {
      ibanTextEl.textContent = config.gift.iban;
    }

    if (!copyIbanBtn) return;

    copyIbanBtn.addEventListener('click', async () => {
      const rawIban = config.gift && config.gift.iban 
        ? config.gift.iban.replace(/\s+/g, '') 
        : (ibanTextEl ? ibanTextEl.textContent.replace(/\s+/g, '') : '');

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

        if (typeof window.WeddingApp.showToast === 'function') {
          window.WeddingApp.showToast('IBAN copiato negli appunti! Grazie di cuore ♥', 'success');
        }

        setTimeout(() => {
          copyIbanBtn.innerHTML = originalText;
          copyIbanBtn.removeAttribute('style');
        }, 2500);
      } catch (err) {
        console.error('Impossibile copiare IBAN:', err);
        if (typeof window.WeddingApp.showToast === 'function') {
          window.WeddingApp.showToast('Seleziona e copia manualmente l\'IBAN.', 'warning');
        }
      }
    });
  }

  window.WeddingApp.initClipboard = initClipboard;
})();
