/**
 * ============================================================
 * SOFIA SARACCO & MATTIA PASSUELLO — CONFIGURAZIONE NOZZE
 * ============================================================
 */
window.CONFIG = {
  names: "Sofia & Mattia",
  bride: "Sofia Saracco",
  groom: "Mattia Passuello",
  coupleFullNames: "Sofia Saracco & Mattia Passuello",
  weddingDateISO: "2027-09-10T16:00:00+02:00", // ora italiana (CEST): corretto anche per ospiti all'estero
  dateDisplay: "Venerdì, 10 Settembre 2027",
  locationDisplay: "Cortazzone & Torre di Batibò (Asti)",
  rsvpDeadline: "30 Giugno 2027",
  
  // ---- CERIMONIA ----
  ceremony: {
    name: "Pieve di San Secondo",
    subheading: "Rito Religioso",
    time: "Ore 16:00",
    address: "Strada San Secondo, 14010 Cortazzone (AT)",
    notes: "Parcheggio dedicato ai piedi della collina. Breve passeggiata panoramica (2 min) per raggiungere la pieve.",
    googleMapsUrl: "https://maps.google.com/?q=Pieve+di+San+Secondo+Cortazzone+Asti",
    appleMapsUrl: "https://maps.apple.com/?q=Pieve+di+San+Secondo+Cortazzone+Asti"
  },

  // ---- RICEVIMENTO ----
  reception: {
    name: "Torre di Batibò",
    subheading: "Aperitivo, Cena & Festa",
    time: "Ore 17:30 (a seguire)",
    address: "Località Batibò 1, 14020 Piovà Massaia (AT)",
    notes: "Distanza dalla chiesa: circa 12 minuti in auto attraverso le colline. Ampio parcheggio interno gratuito.",
    googleMapsUrl: "https://maps.google.com/?q=Torre+di+Batibo+Piova+Massaia",
    appleMapsUrl: "https://maps.apple.com/?q=Torre+di+Batibo+Piova+Massaia"
  },

  // ---- DRESS CODE & CONSIGLI ----
  dressCode: {
    title: "Elegante da Campagna (Country Chic)",
    palette: "Tonalità calde e naturali: verde salvia, terracotta, sabbia, cipria, foliage e toni pastello.",
    advice: "La cerimonia e l'aperitivo si svolgeranno su prati e giardini storici: suggeriamo scarpe con tacco largo o calzature comode per muoversi in totale libertà."
  },

  // ---- LISTA NOZZE / REGALO ----
  gift: {
    // ⚠️ SOSTITUIRE: questo è l'IBAN di esempio della documentazione bancaria, non un conto reale.
    // Unica fonte: viene mostrato in pagina e copiato dal bottone (gli spazi vengono rimossi in automatico).
    iban: "IT60 X054 2811 1010 0000 0123 456",
    beneficiary: "Sofia Saracco e Mattia Passuello",
    bank: "Banca Sella",
    reason: "Viaggio di nozze Sofia Saracco e Mattia Passuello",
    tripTitle: "Il Nostro Viaggio di Nozze",
    tripDescription: "Il regalo più bello è avervi con noi. Se desiderate contribuire alla realizzazione della nostra prima grande avventura insieme come marito e moglie, potete sostenere il nostro viaggio di nozze."
  },

  // ---- INDIRIZZO SITO WEB (GitHub Pages) ----
  siteUrl: "https://sofiamattia2027.github.io/wedding",

  // ---- DESTINAZIONE RISPOSTE RSVP (SERVERLESS) ----
  googleScriptUrl: "INCOLLA-QUI-L-URL-DEL-TUO-GOOGLE-APPS-SCRIPT",
  web3formsAccessKey: "INCOLLA-QUI-LA-TUA-ACCESS-KEY"
};

/* =====================================================================
   COME COLLEGARE GOOGLE SHEETS (Gratuito, nessun server, 3 minuti)
   =====================================================================
   1. Crea un nuovo foglio su https://sheets.new
   2. Nella riga 1 inserisci le intestazioni di colonna:
      Data Invio | Nome Ospite | Presenza | N. Persone | Accompagnatori | Esigenze Alimentari | Canzone Richiesta | Messaggio
   3. Nel menu in alto: Estensioni → Apps Script
   4. Cancella il codice preesistente e incolla questo:

   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.name || '',
       data.attending === 'yes' ? 'Sì, presente' : 'No, assente',
       data.guestCount || 1,
       Array.isArray(data.companions) ? data.companions.join(', ') : '',
       data.dietary || 'Nessuna',
       data.song || '',
       data.message || ''
     ]);
     return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
       .setMimeType(ContentService.MimeType.JSON);
   }

   5. Clicca su "Distribuisci" (in alto a destra) → "Nuova implementazione"
   6. Tipo: "App Web"
      - Esegui come: "Io"
      - Chi ha accesso: "Chiunque"
   7. Clicca "Distribuisci", autorizza l'accesso e copia l'URL generato (/exec)
   8. Incolla quell'URL in `googleScriptUrl` qui sopra.
   ===================================================================== */
