// InventLab Pro - Gemini AI Mentor with automatic retries

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Gemini API key is missing. Check Vercel Environment Variables.'
    });
  }

  const body = req.body || {};
  const question = typeof body.question === 'string'
    ? body.question.trim()
    : '';

  if (!question) {
    return res.status(400).json({ error: 'A question is required.' });
  }

  if (question.length > 8000) {
    return res.status(413).json({ error: 'Question is too long.' });
  }

  const level = typeof body.level === 'string'
    ? body.level.slice(0, 100)
    : 'Beginner';

  const code = typeof body.code === 'string'
    ? body.code.slice(0, 10000)
    : '';

  const system = 'You are InventLab Pro, a careful engineering project mentor for college students. Teach step by step in simple English. State assumptions, never invent test results or citations, and flag electrical, battery, motor, RF, mains-voltage, and biomedical safety risks.';

  const prompt =
    `Student level: ${level}\nQuestion: ${question}\nCode/error: ${code}`;

  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const delays = [0, 1000, 2500];

  try {
    let lastError = '';

    for (let attempt = 0; attempt < delays.length; attempt++) {

      if (delays[attempt] > 0) {
        await new Promise(resolve =>
          setTimeout(resolve, delays[attempt])
        );
      }

      let upstream;

      try {
        upstream = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: system }]
            },
            contents: [{
              role: 'user',
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature: 0.35,
              maxOutputTokens: 1800
            }
          })
        });
      } catch (error) {
        lastError = error.message || 'Network error';

        if (attempt < delays.length - 1) continue;

        console.error('Gemini network error:', lastError);

        return res.status(503).json({
          error: 'Could not connect to Gemini. Please try again shortly.'
        });
      }

      const data = await upstream.json().catch(() => ({}));

      if (upstream.ok) {
        const answer = data.candidates?.[0]?.content?.parts
          ?.map(part => part.text || '')
          .join('\n')
          .trim();

        if (!answer) {
          return res.status(502).json({
            error: 'Gemini returned no answer. Please try again.'
          });
        }

        return res.status(200).json({
          answer,
          provider: 'gemini',
          model
        });
      }

      lastError = data.error?.message || 'Unknown Gemini error';

      console.error(
        'Gemini API error:',
        upstream.status,
        lastError
      );

      // Retry temporary capacity and rate-limit errors.
      if (
        [429, 500, 502, 503, 504].includes(upstream.status) &&
        attempt < delays.length - 1
      ) {
        continue;
      }

      return res.status(502).json({
        error: upstream.status === 503
          ? 'Gemini is temporarily busy. Please try again in a moment.'
          : upstream.status === 429
          ? 'Gemini request limit reached. Please try again later.'
          : 'Gemini request failed. Check model availability and API configuration.'
      });
    }

    return res.status(503).json({
      error: 'Gemini is experiencing high demand. Please try again shortly.'
    });

  } catch (error) {
    console.error('InventLab AI error:', error.message);

    return res.status(503).json({
      error: 'AI service temporarily unavailable. Please try again.'
    });
  }
};
