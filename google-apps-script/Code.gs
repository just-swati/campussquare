/**
 * CampusSquare — website enquiries → Google Sheet + email alert.
 *
 * One-time setup (about 5 minutes):
 *  1. Create a Google Sheet (https://sheets.new) and name it "CampusSquare Leads".
 *  2. In the sheet: Extensions → Apps Script. Delete the sample code, paste this whole file, click Save.
 *  3. Deploy → New deployment → gear icon → Web app.
 *       Execute as: Me      Who has access: Anyone      → Deploy → Authorize access.
 *     (Google warns that the app isn't verified because it's your own script:
 *      Advanced → Go to "CampusSquare Leads" → Allow.)
 *  4. Copy the Web app URL (it ends in /exec) into CONFIG.formEndpoint in assets/js/main.js.
 *
 * Every enquiry becomes a row in the "Leads" tab, and an email goes to NOTIFY_EMAILS.
 */

// Who gets an email for each enquiry. Empty = the Google account that owns this script.
// Several people: 'counsellor1@example.com, counsellor2@example.com'
const NOTIFY_EMAILS = '';

const SHEET_NAME = 'Leads';
const HEADERS = ['Received', 'Name', 'Phone', 'Email', 'Program', 'Message', 'Form', 'Page'];

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (clean_(p.website)) return reply_({ ok: true }); // spam trap was filled: ignore quietly

  const name = clean_(p.name, 100);
  const phone = clean_(p.phone, 20).replace(/\D/g, '');
  if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone)) return reply_({ ok: false, error: 'invalid' });

  const lead = {
    name: name,
    phone: '+91' + phone,
    email: clean_(p.email, 120),
    course: clean_(p.course, 120),
    message: clean_(p.message, 2000, true),
    source: clean_(p.source, 120),
    page: clean_(p.page, 300),
  };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet_().appendRow([new Date(), lead.name, lead.phone, lead.email, lead.course, lead.message, lead.source, lead.page].map(text_));
  } finally {
    lock.releaseLock();
  }
  notify_(lead);
  return reply_({ ok: true });
}

// Opening the Web app URL in a browser shows this — handy to check the deployment works.
function doGet() {
  return reply_({ ok: true, service: 'CampusSquare enquiries' });
}

function sheet_() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME, 0);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function notify_(lead) {
  const to = NOTIFY_EMAILS || Session.getEffectiveUser().getEmail();
  if (!to) return;
  const body = [
    'New enquiry from campussquare.in',
    '',
    'Name:     ' + lead.name,
    'Phone:    ' + lead.phone,
    'Email:    ' + (lead.email || '-'),
    'Program:  ' + (lead.course || '-'),
    'Message:  ' + (lead.message || '-'),
    'Form:     ' + (lead.source || '-'),
    'Page:     ' + (lead.page || '-'),
    '',
    'WhatsApp: https://wa.me/' + lead.phone.slice(1),
    'Call:     tel:' + lead.phone,
  ].join('\n');
  MailApp.sendEmail({ to: to, subject: 'New enquiry: ' + lead.name + (lead.course ? ' — ' + lead.course : ''), body: body });
}

// Trim, cap the length and strip control characters (newlines kept only where allowed).
function clean_(value, max, keepNewlines) {
  const s = String(value == null ? '' : value);
  const stripped = keepNewlines ? s.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ') : s.replace(/[\u0000-\u001f\u007f]/g, ' ');
  return stripped.trim().slice(0, max || 500);
}

// Values starting with = + - @ would run as spreadsheet formulas; a leading apostrophe stores them as plain text.
function text_(value) {
  return typeof value === 'string' && /^[=+\-@]/.test(value) ? "'" + value : value;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
