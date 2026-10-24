import { email } from 'hatchable';

export const access = 'public';
export const methods = ['POST'];

export default async function handler(req, res) {
  try {
    const body = req.body || {};
    const name = String(body.name || '').trim().slice(0, 120);
    const business = String(body.business || '').trim().slice(0, 160);
    const customerEmail = String(body.email || '').trim().slice(0, 254);
    const service = String(body.service || '').trim().slice(0, 160);
    const budget = String(body.budget || '').trim().slice(0, 100);
    const message = String(body.message || '').trim().slice(0, 5000);
    const honeypot = String(body.website || '').trim();

    // Quietly reject automated submissions caught by the hidden honeypot.
    if (honeypot) {
      return res.json({ success: true, message: 'Your inquiry has been received.' });
    }

    if (!name || !customerEmail || !service || !message) {
      return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }
    if (name.length < 2 || message.length < 5) {
      return res.status(400).json({ success: false, message: 'Please provide your name and a little more detail.' });
    }

    const text = [
      'KBA SOLUTIONS — NEW WEBSITE INQUIRY',
      '',
      'Name: ' + name,
      'Business: ' + (business || 'Not provided'),
      'Customer email: ' + customerEmail,
      'Interested in: ' + service,
      'Budget: ' + (budget || 'Not specified'),
      '',
      'What they want to improve:',
      message
    ].join('\n');

    await email.send({
      to: 'info.kbasolutions@gmail.com',
      replyTo: customerEmail,
      subject: 'New KBA Solutions inquiry — ' + name,
      text
    });

    return res.json({ success: true, message: 'Thanks! Your inquiry has been sent. We’ll get back to you as soon as we can.' });
  } catch (error) {
    console.error('Contact form email failed:', error?.message || error);
    return res.status(500).json({ success: false, message: 'We couldn’t send your inquiry right now. Please try again in a moment or contact us directly by email.' });
  }
}