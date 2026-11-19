/* ==========================================================================
   CampusSquare — site scripts (no dependencies)
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
     SETTINGS — edit these before going live
     ------------------------------------------------------------------ */
  const CONFIG = {
    brand: 'CampusSquare',
    // WhatsApp number: country code + number, digits only (e.g. 919876543210)
    whatsappNumber: '919540542226',
    // Optional: a URL that accepts POSTed form fields (Formspree, Google Apps
    // Script web app, your own backend...). When empty, enquiries open in
    // WhatsApp with the visitor's details prefilled instead.
    formEndpoint: '',
  };

  const COURSES = {
    pg: ['Online MBA', 'Online MCA', 'Online M.Com', 'Online MA', 'Online M.Sc'],
    ug: ['Online BBA', 'Online BCA', 'Online B.Com', 'Online BA'],
    cert: ['Digital Marketing', 'Web Development', 'Accounting & Taxation', 'Sales & Marketing'],
    school: ['Class 10th (Open schooling)', 'Class 12th (Open schooling)'],
  };
  const GROUPS = {
    pg: 'Master’s (PG)',
    ug: 'Bachelor’s (UG)',
    cert: 'Certificate courses',
    school: 'School — 10th / 12th',
  };
  const NOT_SURE = 'Not sure yet — help me choose';

  /* ------------------------------------------------------------------
     Icon sprite (Lucide-style, 24×24 stroke icons)
     Use in HTML as: <svg class="icon"><use href="#i-phone"/></svg>
     ------------------------------------------------------------------ */
  const ICONS = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.5.8 1.2 1.5 2 2 .2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.3.3.5 0 .6-.3 1.3-1 1.5-.6.2-1.5.2-3-.6-1.6-.9-2.8-2.4-3.3-3.6-.4-1-.3-2 .5-2.9z"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    laptop: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    landmark: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 20 7H4z"/>',
    trending: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    headset: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M16 14v4"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    usercheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    flask: '<path d="M10 2v7.53a2 2 0 0 1-.21.9L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.07-10.12a2 2 0 0 1-.21-.9V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  };

  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  document.body.insertAdjacentHTML(
    'afterbegin',
    `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${Object.entries(ICONS)
      .map(([id, d]) => `<symbol id="i-${id}" viewBox="0 0 24 24">${d}</symbol>`)
      .join('')}</svg>`
  );

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ------------------------------------------------------------------
     Header: shadow on scroll + mobile menu
     ------------------------------------------------------------------ */
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const menuToggle = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  if (menuToggle && menu) {
    const setMenu = (open) => {
      menu.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    };
    menuToggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuToggle.contains(e.target)) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------
     Course <select> options
     ------------------------------------------------------------------ */
  function fillCourseSelect(select) {
    const placeholder = select.dataset.placeholder || 'Select a program';
    select.innerHTML =
      `<option value="">${placeholder}</option>` +
      Object.entries(COURSES)
        .map(([key, list]) => `<optgroup label="${GROUPS[key]}">${list.map((c) => `<option>${c}</option>`).join('')}</optgroup>`)
        .join('') +
      `<option>${NOT_SURE}</option>`;
  }
  function setCourse(select, course) {
    if (!select) return;
    select.value = course && [...select.options].some((o) => o.value === course) ? course : '';
  }
  $$('select[data-course-select]').forEach(fillCourseSelect);

  /* ------------------------------------------------------------------
     WhatsApp helpers
     ------------------------------------------------------------------ */
  const waLink = (text) => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  const leadMessage = (d) =>
    [
      `Hi ${CONFIG.brand}, I'd like free counselling.`,
      `Name: ${d.name}`,
      `Phone: +91 ${d.phone}`,
      d.email && `Email: ${d.email}`,
      d.course && `Program: ${d.course}`,
      d.message && `Message: ${d.message}`,
    ]
      .filter(Boolean)
      .join('\n');

  /* ------------------------------------------------------------------
     Form validation & submission  (forms marked [data-lead-form])
     ------------------------------------------------------------------ */
  const normalizePhone = (v) => {
    let d = String(v || '').replace(/\D/g, '');
    if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
    else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
    return d;
  };

  const RULES = {
    name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    phone: (v) => /^[6-9]\d{9}$/.test(normalizePhone(v)) || 'Enter a valid 10-digit mobile number.',
    email: (v) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Enter a valid email address.',
    course: (v) => !!v || 'Please choose a program.',
  };

  let errorSeq = 0;
  function setFieldError(input, message) {
    const field = input.closest('.field');
    if (!field) return;
    let err = $('.field__error', field);
    if (message) {
      if (!err) {
        err = document.createElement('span');
        err.className = 'field__error';
        err.id = `err-${++errorSeq}`;
        err.setAttribute('aria-live', 'polite');
        field.appendChild(err);
      }
      err.textContent = message;
      field.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
    } else {
      field.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      if (err) err.remove();
    }
  }

  function validateInput(input) {
    const rule = RULES[input.name];
    if (!rule) return true;
    const result = rule(input.value);
    setFieldError(input, result === true ? '' : result);
    return result === true;
  }

  function validateForm(form) {
    const inputs = $$('input, select, textarea', form).filter((el) => RULES[el.name]);
    const invalid = inputs.filter((el) => !validateInput(el));
    if (invalid.length) invalid[0].focus();
    return invalid.length === 0;
  }

  function successMarkup(kind, data) {
    const first = data.name.split(/\s+/)[0];
    const wa = waLink(leadMessage(data));
    const views = {
      whatsapp: {
        cls: '',
        ico: 'whatsapp',
        title: 'Almost done!',
        text: `We’ve opened WhatsApp with your details filled in. Just tap <strong>Send</strong> and a counsellor will reply shortly.`,
        btn: `<a class="btn btn-whatsapp" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} Open WhatsApp</a>`,
      },
      callback: {
        cls: '',
        ico: 'check',
        title: `Thank you, ${first}!`,
        text: `Your request is in. A ${CONFIG.brand} counsellor will call you on <strong>+91 ${data.phone}</strong> within 24 hours.`,
        btn: `<a class="btn btn-whatsapp" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} Chat on WhatsApp now</a>`,
      },
      fallback: {
        cls: ' form-success--warn',
        ico: 'alert',
        title: 'We couldn’t send that just now',
        text: 'Please message us on WhatsApp instead — your details are already filled in.',
        btn: `<a class="btn btn-whatsapp" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} Continue on WhatsApp</a>`,
      },
    };
    const v = views[kind];
    return `<div class="form-success${v.cls}" role="status" data-form-success>
      <div class="form-success__icon">${icon(v.ico)}</div>
      <h3>${v.title}</h3>
      <p>${v.text}</p>
      <div class="btn-row">${v.btn}<button type="button" class="btn btn-outline" data-form-reset>Send another enquiry</button></div>
    </div>`;
  }

  function showSuccess(form, kind, data) {
    form.hidden = true;
    form.insertAdjacentHTML('afterend', successMarkup(kind, data));
    const panel = form.nextElementSibling;
    $('[data-form-reset]', panel).addEventListener('click', () => resetForm(form));
    panel.setAttribute('tabindex', '-1');
    panel.focus({ preventScroll: true });
  }

  function resetForm(form) {
    const panel = form.nextElementSibling;
    if (panel && panel.matches('[data-form-success]')) panel.remove();
    form.reset();
    $$('.is-invalid .input', form).forEach((el) => setFieldError(el, ''));
    form.hidden = false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validateForm(form)) return;

    const fd = new FormData(form);
    const data = {
      name: String(fd.get('name') || '').trim(),
      phone: normalizePhone(fd.get('phone')),
      email: String(fd.get('email') || '').trim(),
      course: String(fd.get('course') || ''),
      message: String(fd.get('message') || '').trim(),
      source: form.dataset.source || document.title,
      page: location.href,
      submittedAt: new Date().toISOString(),
    };

    if (!CONFIG.formEndpoint) {
      window.open(waLink(leadMessage(data)), '_blank', 'noopener');
      showSuccess(form, 'whatsapp', data);
      return;
    }

    const btn = $('[type="submit"]', form);
    const label = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showSuccess(form, 'callback', data);
    } catch (err) {
      console.error('Enquiry could not be sent:', err);
      showSuccess(form, 'fallback', data);
    } finally {
      btn.disabled = false;
      btn.innerHTML = label;
    }
  }

  function bindLeadForm(form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', handleSubmit);
    // Re-check a field as soon as the user fixes it
    form.addEventListener('input', (e) => {
      if (e.target.closest('.is-invalid')) validateInput(e.target);
    });
    form.addEventListener('change', (e) => {
      if (e.target.closest('.is-invalid')) validateInput(e.target);
    });
  }
  $$('form[data-lead-form]').forEach(bindLeadForm);

  /* ------------------------------------------------------------------
     Lead pop-up (any element with [data-open-lead], optional data-course)
     ------------------------------------------------------------------ */
  let modal;
  function buildModal() {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<dialog class="modal" id="lead-modal" aria-labelledby="lead-title">
        <div class="modal__body">
          <button class="modal__close" type="button" data-close aria-label="Close">${icon('x')}</button>
          <div class="modal__head">
            <span class="eyebrow">Free counselling</span>
            <h2 id="lead-title">Talk to a counsellor</h2>
            <p>Share a few details and get one-to-one guidance on the right program and university — at no cost.</p>
          </div>
          <form data-lead-form data-source="Pop-up form">
            <label class="field"><span class="field__label">Full name</span>
              <input class="input" name="name" autocomplete="name" placeholder="Your full name"></label>
            <label class="field"><span class="field__label">Mobile number</span>
              <span class="phone-wrap"><span class="phone-prefix">+91</span>
              <input class="input" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="14" placeholder="10-digit mobile number"></span></label>
            <label class="field"><span class="field__label">Program of interest</span>
              <select class="input" name="course" data-course-select></select></label>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Book free counselling ${icon('arrow')}</button>
            <p class="form-note">${icon('lock')}<span>By submitting, you agree to be contacted by call, SMS or WhatsApp. No spam, ever.</span></p>
          </form>
        </div>
      </dialog>`
    );
    modal = $('#lead-modal');
    const form = $('form', modal);
    fillCourseSelect($('select', modal));
    bindLeadForm(form);
    $('[data-close]', modal).addEventListener('click', () => modal.close());
    // Click on the backdrop closes the dialog
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
    modal.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      if (form.hidden) resetForm(form);
    });
  }

  function openLead(course, source) {
    if (!modal) buildModal();
    const form = $('form', modal);
    if (form.hidden) resetForm(form);
    setCourse($('select', modal), course);
    if (source) form.dataset.source = source;
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
    document.body.classList.add('modal-open');
    $('input[name="name"]', modal).focus();
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-lead]');
    if (!trigger) return;
    e.preventDefault();
    openLead(trigger.dataset.course, trigger.dataset.source || `Button: ${trigger.textContent.trim()}`);
  });

  /* ------------------------------------------------------------------
     Hero course finder
     ------------------------------------------------------------------ */
  const finder = $('[data-finder]');
  if (finder) {
    const select = $('[data-finder-course]', finder);
    const fill = (level) => {
      select.innerHTML = COURSES[level].map((c) => `<option>${c}</option>`).join('') + `<option>${NOT_SURE}</option>`;
    };
    const checked = $('input[name="level"]:checked', finder);
    fill(checked ? checked.value : 'pg');
    finder.addEventListener('change', (e) => { if (e.target.name === 'level') fill(e.target.value); });
    finder.addEventListener('submit', (e) => {
      e.preventDefault();
      openLead(select.value, 'Hero course finder');
    });
  }

  /* ------------------------------------------------------------------
     Tabs  ([data-tabs] wrapping [role=tab] buttons with aria-controls)
     ------------------------------------------------------------------ */
  $$('[data-tabs]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!step) return;
        e.preventDefault();
        select(tabs[(i + step + tabs.length) % tabs.length], true);
      });
    });
  });

  /* ------------------------------------------------------------------
     Courses page: filter chips + search  (?level=pg|ug|cert|school)
     ------------------------------------------------------------------ */
  const courseList = $('[data-course-list]');
  if (courseList) {
    const cards = $$('[data-level]', courseList);
    const buttons = $$('[data-filter]');
    const search = $('[data-course-search]');
    const empty = $('[data-empty]');
    const count = $('[data-result-count]');
    const params = new URLSearchParams(location.search);
    let level = params.get('level') || 'all';
    if (!buttons.some((b) => b.dataset.filter === level)) level = 'all';

    buttons.forEach((b) => {
      const n = b.dataset.filter === 'all' ? cards.length : cards.filter((c) => c.dataset.level === b.dataset.filter).length;
      const badge = $('.count', b);
      if (badge) badge.textContent = n;
    });

    const apply = () => {
      const q = search ? search.value.trim().toLowerCase() : '';
      let shown = 0;
      cards.forEach((card) => {
        const ok = (level === 'all' || card.dataset.level === level) && (!q || card.textContent.toLowerCase().includes(q));
        card.hidden = !ok;
        if (ok) shown++;
      });
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === level)));
      if (empty) empty.hidden = shown > 0;
      if (count) count.textContent = `Showing ${shown} of ${cards.length} programs`;
    };

    buttons.forEach((b) =>
      b.addEventListener('click', () => {
        level = b.dataset.filter;
        const url = new URL(location.href);
        if (level === 'all') url.searchParams.delete('level');
        else url.searchParams.set('level', level);
        history.replaceState(null, '', url);
        apply();
      })
    );
    if (search) search.addEventListener('input', apply);
    const clear = $('[data-clear-filters]');
    if (clear) clear.addEventListener('click', () => { level = 'all'; if (search) search.value = ''; apply(); });
    apply();
  }

  /* ------------------------------------------------------------------
     Landing page: links to the form focus the first field
     ------------------------------------------------------------------ */
  $$('a[href="#apply"]').forEach((a) =>
    a.addEventListener('click', () => {
      const first = $('#apply input[name="name"]');
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 450);
    })
  );

  /* ------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------ */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }),
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* Footer year */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
