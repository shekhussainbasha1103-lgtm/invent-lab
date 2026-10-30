// Vercel Serverless Function: POST /api/mentor
// Keep GEMINI_API_KEY in Vercel Environment Variables. Never expose it in frontend code.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini is not configured. Add GEMINI_API_KEY in Vercel Project Settings → Environment Variables, then redeploy.' });
  }

  const body = req.body || {};
  const question = typeof body.question === 'string' ? body.question.trim() : '';
  if (!question) return res.status(400).json({ error: 'A question is required.' });
  if (question.length > 8000) return res.status(413).json({ error: 'Question is too long (maximum 8,000 characters).' });

  const level = typeof body.level === 'string' ? body.level.slice(0, 100) : 'Beginner';
  const code = typeof body.code === 'string' ? body.code.slice(0, 10000) : '';
  const system = 'You are InventLab Pro, a careful engineering project mentor for college students. Teach step by step in simple English, state assumptions, never invent test results or citations, and flag electrical, battery, motor, RF, mains-voltage, and biomedical safety risks. For circuits, ask students to verify exact component datasheets and ratings. Distinguish conceptual advice from validated simulation.';
  const prompt = `Student level: ${level}\nQuestion: ${question}\nCode/error (untrusted student input): ${code}`;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.35, maxOutputTokens: 1800 }
      })
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      // Do not return request URLs or secrets to the browser.
      console.error('Gemini API error:', upstream.status, data.error?.message || 'Unknown error');
      return res.status(502).json({ error: 'Gemini request failed. Check the API key, model availability and Google AI Studio project settings.' });
    }
    const answer = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('\n').trim();
    if (!answer) return res.status(502).json({ error: 'Gemini returned no text. Try rephrasing your question.' });
    return res.status(200).json({ answer, provider: 'gemini', model });
  } catch (error) {
    console.error('InventLab Gemini function error:', error?.message || error);
    return res.status(503).json({ error: 'Could not reach Gemini. Please try again shortly.' });
  }
};
