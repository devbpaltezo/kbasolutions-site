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
  const data = new FormData(form);
  const inquiry = [
    'BP SOLUTIONS — NEW INQUIRY',
    'Name: ' + (data.get('name') || ''),
    'Business: ' + (data.get('business') || 'Not provided'),
    'Interested in: ' + (data.get('service') || ''),
    'Budget: ' + (data.get('budget') || 'Not specified'),
    '',
    'What they want to improve:',
    data.get('message') || ''
  ].join('\n');
  result.hidden = false;
  result.textContent = inquiry + '\n\nCopy this inquiry and send it to BP Solutions. A direct email or messaging link can be added once official contact details are available.';
  try {
    await navigator.clipboard.writeText(inquiry);
    result.textContent = 'Inquiry copied to your clipboard. You can now paste and send it to BP Solutions.\n\n' + inquiry;
  } catch (error) {
    result.textContent = 'Your inquiry is ready below. Select and copy it to send to BP Solutions.\n\n' + inquiry;
  }
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();