const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
}
const serviceSelect = document.getElementById('service');
const messageField = document.getElementById('message');
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  if (serviceSelect) serviceSelect.value = link.dataset.service;
}));
document.querySelectorAll('[data-package]').forEach(link => link.addEventListener('click', () => {
  if (serviceSelect) serviceSelect.value = 'Not sure yet — let\'s discuss';
  if (messageField) messageField.value = 'I am interested in: ' + link.dataset.package + '. Please contact me to discuss the scope and next steps.';
}));
const form = document.getElementById('inquiryForm');
const result = document.getElementById('formResult');
if (form && result) form.addEventListener('submit', async event => {
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton ? submitButton.innerHTML : '';
  const data = new FormData(form);
  data.append('_subject', 'New KBA Solutions website inquiry');
  result.hidden = false;
  result.textContent = 'Sending your inquiry…';
  result.setAttribute('role', 'status');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
  }
  try {
    const response = await fetch('https://formspree.io/f/xzeezdpg', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    const responseData = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = Array.isArray(responseData.errors) ? responseData.errors.map(item => item.message).join(' ') : '';
      throw new Error(detail || 'Your inquiry could not be sent. Please try again.');
    }
    result.textContent = 'Thanks! Your inquiry has been sent. We’ll get back to you as soon as we can.';
    form.reset();
  } catch (error) {
    result.textContent = error.message || 'We couldn’t send your inquiry right now. Please try again later.';
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();