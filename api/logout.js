module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Clear the session cookie by setting its expiration to the past
  res.setHeader('Set-Cookie', 'miss2_admin_session=; HttpOnly; Secure; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict');
  return res.status(200).json({ success: true });
}
