# InventLab Pro v7 — optional real AI setup

## What is included
- Existing InventLab Pro features retained.
- AI Project Mentor page with local project-planning fallback.
- Optional Node.js backend that calls an OpenAI-compatible Responses API. The API key is read only by the backend, never embedded in the browser files.
- Standalone Boolean logic lab with AND/OR/XOR/NOT and a virtual LED. This is not an ESP32 firmware emulator, analogue circuit solver, or replacement for a full simulator.
- Local notebook save/export for mentor responses.

## Run the app on Windows
1. Extract the ZIP to a normal folder, e.g. `C:\Users\YourName\Documents\InventLab_Pro_v6`.
2. Open Command Prompt in the `InventLab_Pro` folder.
3. Run `py -m http.server 8000` (Python must be installed).
4. Open `http://localhost:8000` in your browser.
5. Without the backend, the AI Mentor uses a local guide template.

## Enable real AI (optional)
1. Install Node.js LTS from https://nodejs.org/.
2. Open a second Command Prompt in `InventLab_Pro\ai-backend`.
3. Run `npm install`.
4. Set your API key for this terminal only: `set OPENAI_API_KEY=YOUR_API_KEY_HERE` (Command Prompt) or `$env:OPENAI_API_KEY="YOUR_API_KEY_HERE"` (PowerShell). Replace the placeholder locally; never paste the key into chat or into `index.html`.
5. Optional: set `OPENAI_MODEL` to a model available to your account. Default is `gpt-4.1-mini`.
6. Run `npm start`. The backend listens only on `127.0.0.1:8787`.
7. Return to `http://localhost:8000`, open AI Project Mentor, and ask a question.
8. If the API request fails, check the key, account API access/billing, model availability, and terminal messages.

### Cost and privacy
A real AI API may incur usage charges. Review the provider's current pricing and data policies before use. Prompts and code entered while real AI mode is working are sent to the AI provider through your local backend. Do not submit secrets, passwords, personal records, or confidential university/company code. For production hosting, add authentication, rate limits, abuse protection, HTTPS, logging controls and a strict CORS allowlist before exposing a backend publicly.

## What is not claimed
- No Wokwi connection is included.
- No full ESP32/Arduino firmware emulation is included.
- The 3D-style designer remains an illustrative SVG, not dimensionally exact CAD.
- The existing SPICE feature exports a netlist but does not run ngspice. Install and use a validated local solver for real analogue simulation.
- AI answers are suggestions, not verified engineering results. Check datasheets, calculate ratings and test safely.
