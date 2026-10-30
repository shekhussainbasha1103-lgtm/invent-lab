// Vercel Serverless Function: GET /api/health
module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }
  return res.status(200).json({
    ok: true,
    service: 'InventLab Pro AI backend',
    provider: process.env.GEMINI_API_KEY ? 'gemini' : 'not-configured',
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash'
  });
};
