import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({origin: (origin, cb) => {
  if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) || /^https:\/\/[a-z0-9-]+\.github\.io$/.test(origin)) return cb(null, true);
  return cb(new Error('Origin not allowed by InventLab local AI backend'));
}}));
app.use(express.json({limit:'32kb'}));
const system = 'You are InventLab Pro, a careful engineering project mentor for college students. Teach step by step in simple English, state assumptions, never invent test results or citations, and flag electrical, battery, motor, RF, mains-voltage, and biomedical safety risks. For circuits, ask students to verify exact component datasheets and ratings. Distinguish conceptual advice from validated simulation.';
app.post('/api/mentor', async (req,res)=>{
  const {question, level='Beginner', code=''} = req.body || {};
  if(typeof question !== 'string' || !question.trim()) return res.status(400).json({error:'A question is required.'});
  const prompt = `Student level: ${String(level).slice(0,100)}\nQuestion: ${question.trim().slice(0,8000)}\nCode/error (untrusted student input): ${String(code).slice(0,10000)}`;
  try {
    // Gemini cloud path. The key is read only from the backend environment.
    if (process.env.AI_PROVIDER === 'gemini' || process.env.GEMINI_API_KEY) {
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY || '')}`;
      const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({
        systemInstruction:{parts:[{text:system}]},
        contents:[{role:'user',parts:[{text:prompt}]}],
        generationConfig:{temperature:0.35,maxOutputTokens:1800}
      })});
      const data = await response.json().catch(()=>({}));
      if (!response.ok) return res.status(502).json({error:data.error?.message || 'Gemini request failed. Check GEMINI_API_KEY, model access and billing.'});
      const answer = data.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('\\n').trim();
      if (!answer) return res.status(502).json({error:'Gemini returned no text. Check safety filters or model response.'});
      return res.json({answer,provider:'gemini',model});
    }
    // Key-free local AI path: install Ollama and pull a model, e.g. qwen2.5:3b.
    if (process.env.AI_PROVIDER !== 'openai' && !process.env.OPENAI_API_KEY) {
      const host = process.env.OLLAMA_URL || 'http://127.0.0.1:11434/api/chat';
      const model = process.env.OLLAMA_MODEL || 'qwen2.5:3b';
      const response = await fetch(host, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({model, stream:false, messages:[{role:'system',content:system},{role:'user',content:prompt}]})});
      const data = await response.json().catch(()=>({}));
      if (!response.ok) return res.status(502).json({error:'Local AI is not responding. Start Ollama and download the configured model. See AI_SETUP.md.'});
      const answer = data.message?.content;
      if (!answer) return res.status(502).json({error:'Local model returned no text.'});
      return res.json({answer, provider:'ollama', model});
    }
    const response = await fetch(process.env.OPENAI_API_URL || 'https://api.openai.com/v1/responses', {
      method:'POST', headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},
      body:JSON.stringify({model:process.env.OPENAI_MODEL || 'gpt-4.1-mini', instructions:system, input:prompt, max_output_tokens:1400})
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok) return res.status(502).json({error:'Cloud AI provider request failed. Check provider access, model and billing.'});
    const answer=data.output?.flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\n') || 'The AI service returned no text.';
    res.json({answer, provider:'openai', model:process.env.OPENAI_MODEL || 'gpt-4.1-mini'});
  } catch(e) {
    res.status(503).json({error:'Could not reach AI. For key-free AI, make sure Ollama is running locally and its model is downloaded.'});
  }
});
app.get('/api/health',(_,res)=>res.json({ok:true,service:'InventLab Pro AI backend',mode:process.env.GEMINI_API_KEY?'gemini':(process.env.OPENAI_API_KEY?'openai':'local-ollama')}));
app.listen(8787,'0.0.0.0',()=>console.log('InventLab AI backend listening on port 8787. Local Ollama is the default; see AI_SETUP.md.'));
