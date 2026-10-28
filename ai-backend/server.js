import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({origin: ['http://localhost:8000','http://127.0.0.1:8000','http://localhost:8787','http://127.0.0.1:8787']}));
app.use(express.json({limit:'32kb'}));
app.post('/api/mentor', async (req,res)=>{
  const {question, level='Beginner', code=''} = req.body || {};
  if(typeof question !== 'string' || !question.trim()) return res.status(400).json({error:'A question is required.'});
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'Set OPENAI_API_KEY in your local environment first.'});
  try {
    const response = await fetch(process.env.OPENAI_API_URL || 'https://api.openai.com/v1/responses', {
      method:'POST', headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},
      body:JSON.stringify({model:process.env.OPENAI_MODEL || 'gpt-4.1-mini', instructions:'You are InventLab Pro, a careful engineering project mentor for college students. Teach step by step, state assumptions, never invent test results or citations, and flag electrical, battery, motor, RF, mains-voltage, and biomedical safety risks. For circuits, ask students to verify exact component datasheets and ratings. Distinguish conceptual advice from validated simulation.', input:`Student level: ${String(level).slice(0,100)}\nQuestion: ${question.trim().slice(0,8000)}\nCode/error (untrusted student input): ${String(code).slice(0,10000)}`, max_output_tokens:1200})
    });
    const data=await response.json();
    if(!response.ok) return res.status(502).json({error:'AI provider request failed. Check API access, model and billing.'});
    const answer=data.output?.flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\n') || 'The AI service returned no text.';
    res.json({answer});
  } catch(e) { res.status(500).json({error:'Could not reach the AI provider.'}); }
});
app.get('/api/health',(_,res)=>res.json({ok:true,service:'InventLab Pro AI backend'}));
app.listen(8787,'127.0.0.1',()=>console.log('InventLab AI backend at http://127.0.0.1:8787'));
