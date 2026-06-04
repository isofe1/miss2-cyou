const crypto = require('crypto');

const ADMIN_PASSWORD_HASH = '37b72274ed7a3c1f23781857c0c9961f27629bcec31193950be5e746111df081';
// In a real app, this should be an environment variable. Using a static secret for now but hashing it.
const SESSION_SECRET = process.env.SESSION_SECRET || 'miss2-cyou-fallback-secret-key-2024';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex');

  if (hash === ADMIN_PASSWORD_HASH) {
    // Create a secure signature for the session cookie
    const expiresAt = Date.now() + 86400000; // 24 hours
    const payload = `auth=${expiresAt}`;
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    const cookieValue = `${payload}.${signature}`;

    // Set a secure, HTTP-only cookie for session management
    res.setHeader('Set-Cookie', `miss2_admin_session=${cookieValue}; HttpOnly; Secure; Path=/; Max-Age=86400; SameSite=Strict`);
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Incorrect password' });
  }
}
