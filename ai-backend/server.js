import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (
      !origin ||
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
      /^https:\/\/[a-z0-9-]+\.github\.io$/.test(origin)
    ) {
      return cb(null, true);
    }
    return cb(new Error('Origin not allowed by InventLab AI backend'));
  }
}));

app.use(express.json({ limit: '32kb' }));

const system =
  'You are InventLab Pro, a careful engineering project mentor for college students. ' +
  'Teach step by step in simple English, state assumptions, never invent test results ' +
  'or citations, and flag electrical, battery, motor, RF, mains-voltage, and biomedical ' +
  'safety risks. For circuits, ask students to verify exact component datasheets and ratings. ' +
  'Distinguish conceptual advice from validated simulation.';

app.post('/api/mentor', async (req, res) => {
  const { question, level = 'Beginner', code = '' } = req.body || {};

  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'A question is required.' });
  }

  const prompt =
    `Student level: ${String(level).slice(0, 100)}\n` +
    `Question: ${question.trim().slice(0, 8000)}\n` +
    `Code/error (untrusted student input): ${String(code).slice(0, 10000)}`;

  const provider = (
    process.env.AI_PROVIDER ||
    (process.env.GEMINI_API_KEY ? 'gemini' :
      process.env.OPENAI_API_KEY ? 'openai' : 'ollama')
  ).toLowerCase();

  try {
    if (provider === 'gemini') {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: 'Gemini is selected but its server API key is not configured.'
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
      });

      const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
        contents: `${system}\n\n${prompt}`
      });

      const answer = response.text;

      if (!answer) {
        return res.status(502).json({
          error: 'Gemini returned no text.'
        });
      }

      return res.json({
        answer,
        provider: 'gemini',
        model: process.env.GEMINI_MODEL || 'gemini-2.5-flash'
      });
    }

    if (provider === 'openai') {
      if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({
          error: 'OpenAI is selected but its server API key is not configured.'
        });
      }

      const response = await fetch(
        process.env.OPENAI_API_URL ||
          'https://api.openai.com/v1/responses',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
            instructions: system,
            input: prompt,
            max_output_tokens: 1400
          })
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return res.status(502).json({
          error: 'OpenAI request failed. Check provider access and configuration.'
        });
      }

      const answer = data.output
        ?.flatMap(item => item.content || [])
        .filter(item => item.type === 'output_text')
        .map(item => item.text)
        .join('\n');

      return res.json({
        answer: answer || 'The AI service returned no text.',
        provider: 'openai',
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini'
      });
    }

    if (provider === 'ollama') {
      const host = process.env.OLLAMA_URL ||
        'http://127.0.0.1:11434/api/chat';
      const model = process.env.OLLAMA_MODEL || 'qwen2.5:3b';

      const response = await fetch(host, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          stream: false,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: prompt }
          ]
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return res.status(502).json({
          error: 'Ollama is not responding. Check its service and model.'
        });
      }

      const answer = data.message?.content;

      if (!answer) {
        return res.status(502).json({
          error: 'The local model returned no text.'
        });
      }

      return res.json({ answer, provider: 'ollama', model });
    }

    return res.status(400).json({
      error: 'Unknown AI provider. Choose gemini, openai, or ollama.'
    });
  } catch (error) {
    console.error('AI request failed:', error.message);
    return res.status(503).json({
      error: 'The AI service is unavailable. Check server configuration and logs.'
    });
  }
});

app.get('/api/health', (_, res) => {
  const provider = (
    process.env.AI_PROVIDER ||
    (process.env.GEMINI_API_KEY ? 'gemini' :
      process.env.OPENAI_API_KEY ? 'openai' : 'ollama')
  ).toLowerCase();

  res.json({
    ok: true,
    service: 'InventLab Pro AI backend',
    provider
  });
});

const port = Number(process.env.PORT) || 8787;

app.listen(port, '0.0.0.0', () => {
  console.log(`InventLab Pro AI backend listening on port ${port}`);
});
