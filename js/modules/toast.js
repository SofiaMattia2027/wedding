/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — TOAST NOTIFICATIONS
 * Sistema di notifiche toast accessibile e reattivo
 * ============================================================
 */
(function() {
  'use strict';

  window.WeddingApp = window.WeddingApp || {};

  /**
   * Mostra una notifica toast temporanea a schermo
   * @param {string} message - Testo del messaggio
   * @param {'info'|'success'|'warning'|'error'} [type='info'] - Tipologia di notifica
   */
  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'status');

    let icon = '✓';
    if (type === 'warning') icon = '⚠';
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `<span style="font-weight:700;" aria-hidden="true">${icon}</span> <span>${message}</span>`;
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
  }

  // Registrazione nel namespace dell'applicazione e alias globale per retrocompatibilità
  window.WeddingApp.showToast = showToast;
  window.showToast = showToast;
})();
