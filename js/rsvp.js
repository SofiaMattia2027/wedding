/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — GESTIONE RSVP
 * ============================================================
 */

window.initRSVP = function(config) {
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpCard = document.getElementById('rsvpCard');
  const rsvpSuccessCard = document.getElementById('rsvpSuccessCard');
  const cardYes = document.getElementById('cardYes');
  const cardNo = document.getElementById('cardNo');
  const radioYes = document.getElementById('radioYes');
  const radioNo = document.getElementById('radioNo');
  const guestsSection = document.getElementById('guestsSection');
  const guestCountSelect = document.getElementById('guestCount');
  const companionsContainer = document.getElementById('companionsContainer');
  const submitBtn = document.getElementById('submitBtn');
  const resetRsvpBtn = document.getElementById('resetRsvpBtn');
  const successName = document.getElementById('successGuestName');
  const successSummary = document.getElementById('successSummary');

  if (!rsvpForm) return;

  // 1. Gestione Schede Presenza (Sì / No)
  function handleAttendingChange(val) {
    if (val === 'yes') {
      cardYes.classList.add('active');
      cardNo.classList.remove('active');
      radioYes.checked = true;
      guestsSection.classList.add('visible');
      updateCompanionInputs();
    } else if (val === 'no') {
      cardNo.classList.add('active');
      cardYes.classList.remove('active');
      radioNo.checked = true;
      guestsSection.classList.remove('visible');
    }
  }

  // Le card sono <label for="..."> native: il click seleziona il radio e scatena 'change',
  // che funziona anche con la tastiera (frecce/spazio)
  if (radioYes) radioYes.addEventListener('change', () => handleAttendingChange('yes'));
  if (radioNo) radioNo.addEventListener('change', () => handleAttendingChange('no'));

  // 2. Generazione Dinamica Campi Accompagnatori
  function updateCompanionInputs() {
    if (!guestCountSelect || !companionsContainer) return;
    const totalGuests = parseInt(guestCountSelect.value, 10) || 1;
    const companionsCount = totalGuests - 1;

    companionsContainer.innerHTML = '';
    if (companionsCount <= 0) return;

    const titleEl = document.createElement('p');
    titleEl.className = 'form-label';
    titleEl.style.marginTop = '14px';
    titleEl.textContent = companionsCount === 1 ? 'Nome del tuo accompagnatore' : 'Nomi dei tuoi accompagnatori';
    companionsContainer.appendChild(titleEl);

    for (let i = 1; i <= companionsCount; i++) {
      const fieldWrap = document.createElement('div');
      fieldWrap.className = 'companion-field';

      const label = document.createElement('label');
      label.setAttribute('for', `companion_${i}`);
      label.textContent = `Accompagnatore ${i}`;

      const input = document.createElement('input');
      input.type = 'text';
      input.id = `companion_${i}`;
      input.name = `companion_${i}`;
      input.className = 'form-input';
      input.placeholder = `Nome e Cognome ospite ${i + 1}`;
      input.required = true;

      fieldWrap.appendChild(label);
      fieldWrap.appendChild(input);
      companionsContainer.appendChild(fieldWrap);
    }
  }

  if (guestCountSelect) {
    guestCountSelect.addEventListener('change', updateCompanionInputs);
  }

  // 3. Pill Esigenze Alimentari (toggle button accessibili con aria-pressed)
  const dietPills = document.querySelectorAll('.diet-pill');
  const nonePill = document.querySelector('.diet-pill[data-val="none"]');

  function setPill(pill, isOn) {
    pill.classList.toggle('selected', isOn);
    pill.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  }

  function resetDietPills() {
    dietPills.forEach(p => setPill(p, p === nonePill));
  }

  dietPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      if (pill === nonePill) {
        resetDietPills();
        return;
      }
      setPill(pill, !pill.classList.contains('selected'));
      const anySelected = Array.from(dietPills).some(p => p !== nonePill && p.classList.contains('selected'));
      if (nonePill) setPill(nonePill, !anySelected);
    });
  });

  // 4. Salvataggio Locale (LocalStorage)
  const storageKey = 'wedding_rsvp_submission_saracco_passuello_2027';
  const savedRsvp = localStorage.getItem(storageKey);
  if (savedRsvp) {
    try {
      const parsed = JSON.parse(savedRsvp);
      showSuccessView(parsed, true);
    } catch (e) {
      localStorage.removeItem(storageKey);
    }
  }

  function showSuccessView(data, fromStorage = false) {
    if (rsvpCard && rsvpSuccessCard) {
      rsvpCard.style.display = 'none';
      rsvpSuccessCard.classList.add('visible');
      if (successName) {
        successName.textContent = data.name;
      }
      if (successSummary) {
        if (data.attending === 'yes') {
          const companionsText = data.companions && data.companions.length > 0 
            ? ` con ${data.companions.join(', ')}` 
            : '';
          successSummary.textContent = `Abbiamo registrato con gioia la tua presenza (${data.guestCount} persona/e${companionsText}).`;
        } else {
          successSummary.textContent = 'Ci dispiace che tu non riesca a essere con noi, ma grazie con tutto il cuore per avercelo comunicato!';
        }
      }
    }
  }

  if (resetRsvpBtn) {
    resetRsvpBtn.addEventListener('click', () => {
      localStorage.removeItem(storageKey);
      if (rsvpCard && rsvpSuccessCard) {
        rsvpSuccessCard.classList.remove('visible');
        rsvpCard.style.display = 'block';
        rsvpForm.reset();
        cardYes.classList.remove('active');
        cardNo.classList.remove('active');
        guestsSection.classList.remove('visible');
        companionsContainer.innerHTML = '';
        resetDietPills();
      }
    });
  }

  // 5. Invio Form
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const attendingInput = rsvpForm.querySelector('input[name="attending"]:checked');
    if (!attendingInput) {
      window.showToast('Per favore, seleziona se parteciperai o meno.', 'warning');
      return;
    }

    const nameInput = document.getElementById('fullName');
    const guestName = nameInput ? nameInput.value.trim() : '';
    if (!guestName) {
      window.showToast('Inserisci il tuo nome e cognome.', 'warning');
      if (nameInput) nameInput.focus();
      return;
    }

    const attending = attendingInput.value;
    const totalGuests = attending === 'yes' ? (parseInt(guestCountSelect.value, 10) || 1) : 0;

    const companions = [];
    if (attending === 'yes' && totalGuests > 1) {
      const companionInputs = Array.from(companionsContainer.querySelectorAll('input'));
      const firstEmpty = companionInputs.find(input => !input.value.trim());
      if (firstEmpty) {
        window.showToast('Inserisci il nome di tutti gli accompagnatori, oppure riduci il numero di persone.', 'warning');
        firstEmpty.focus();
        return;
      }
      companionInputs.forEach(input => companions.push(input.value.trim()));
    }

    const selectedDiets = [];
    dietPills.forEach(pill => {
      if (pill.classList.contains('selected') && pill.dataset.label) {
        selectedDiets.push(pill.dataset.label);
      }
    });
    const dietaryNotes = document.getElementById('dietaryNotes');
    if (dietaryNotes && dietaryNotes.value.trim()) {
      selectedDiets.push(dietaryNotes.value.trim());
    }

    const songInput = document.getElementById('songRequest');
    const songName = songInput ? songInput.value.trim() : '';

    const messageText = document.getElementById('rsvpMessage');
    const guestMessage = messageText ? messageText.value.trim() : '';

    const payload = {
      name: guestName,
      attending: attending,
      guestCount: totalGuests,
      companions: companions,
      dietary: selectedDiets.join('; ') || 'Nessuna',
      song: songName,
      message: guestMessage,
      submittedAt: new Date().toISOString()
    };

    const fetchTasks = [];

    const isGoogleScriptConfigured = config.googleScriptUrl && !config.googleScriptUrl.includes('INCOLLA');
    if (isGoogleScriptConfigured) {
      fetchTasks.push(
        fetch(config.googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        }).then(async res => {
          const data = await res.json().catch(() => null);
          if (!res.ok || !data || data.status !== 'success') {
            throw new Error(`Google Sheets: risposta non valida (HTTP ${res.status})`);
          }
          return 'google';
        })
      );
    }

    const isWeb3Configured = config.web3formsAccessKey && !config.web3formsAccessKey.includes('INCOLLA');
    if (isWeb3Configured) {
      fetchTasks.push(
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: config.web3formsAccessKey,
            subject: `RSVP Nozze Sofia & Mattia — ${guestName} (${attending === 'yes' ? 'Presente' : 'Assente'})`,
            nome: payload.name,
            presenza: payload.attending === 'yes' ? 'Presente' : 'Assente',
            ospiti_totali: payload.guestCount,
            accompagnatori: payload.companions.join(', ') || 'Nessuno',
            esigenze_alimentari: payload.dietary,
            canzone_richiesta: payload.song || 'Nessuna',
            messaggio: payload.message || 'Nessun messaggio'
          })
        }).then(async res => {
          const data = await res.json().catch(() => ({}));
          if (!res.ok || data.success === false) throw new Error(`Web3Forms HTTP ${res.status}`);
          return 'web3forms';
        })
      );
    }

    // Nessun backend configurato: NON mostrare un falso successo all'ospite
    if (fetchTasks.length === 0) {
      console.error('RSVP non configurato: impostare googleScriptUrl e/o web3formsAccessKey in js/config.js');
      window.showToast('Il modulo di conferma non è ancora attivo. Per favore contatta direttamente gli sposi.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    try {
      const results = await Promise.allSettled(fetchTasks);
      results
        .filter(r => r.status === 'rejected')
        .forEach(r => console.warn('Invio RSVP fallito:', r.reason));

      // Successo solo se almeno un backend ha confermato la ricezione
      const delivered = results.some(r => r.status === 'fulfilled');
      if (!delivered) {
        throw new Error('Nessun backend ha confermato la ricezione');
      }

      localStorage.setItem(storageKey, JSON.stringify(payload));
      window.showToast('Risposta registrata! Grazie di cuore ♥', 'success');
      showSuccessView(payload);
      if (typeof window.launchCelebration === 'function' && payload.attending === 'yes') {
        window.launchCelebration();
      }
    } catch (err) {
      console.error('Errore durante la registrazione:', err);
      window.showToast('Non siamo riusciti a registrare la risposta. Controlla la connessione e riprova, oppure contatta gli sposi.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });
};
