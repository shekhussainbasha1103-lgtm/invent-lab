# InventLab Pro v9 — AI + Wokwi bridge setup

## What this upgrade does
- Keeps the existing Circuit Studio, Product-to-Circuit Designer, isometric SVG preview, project library, firmware editor and learning tools.
- Adds a Wokwi ESP32 simulator launch button. Wokwi opens in a separate browser tab; this is a bridge, not an embedded or independently owned simulator. Paste/export your `.ino` sketch into Wokwi and select a compatible board.
- Adds real AI responses through a local Ollama model without a cloud API key. A cloud provider can still be configured optionally.

## Real AI without a cloud API key (Windows)
1. Install Ollama from https://ollama.com/download/windows .
2. Open Command Prompt and run: `ollama pull qwen2.5:3b` (downloads a local model; storage and RAM are required).
3. In the `InventLab_Pro/ai-backend` folder, run `npm install`.
4. Run `npm start`. Keep that terminal open. The backend listens on port 8787 and uses Ollama by default when no `OPENAI_API_KEY` is set.
5. Open the deployed GitHub Pages app and ask the AI Project Mentor a question. If it cannot connect, try the app on your own PC and check the backend terminal. Browser/local-network security can vary by browser.

### Optional cloud AI
Cloud AI requires a provider account/key and may incur charges. Do not put keys in GitHub or browser JavaScript. Configure `OPENAI_API_KEY` only as a server environment variable and set `AI_PROVIDER=openai` before running the backend.

## Simulator and accuracy limits
- Wokwi is an external simulator opened separately; this project does not claim to bundle Wokwi's engine. Use Wokwi for supported ESP32/Arduino simulation. Component/library support depends on Wokwi.
- Circuit Studio's built-in estimate is simplified educational math, not a validated SPICE solver.
- The isometric SVG preview is a visual concept, not mechanical CAD. Check exact board revision, datasheets, pin mappings, supply rails, current and logic-level limits before building.
- Firmware Lab exports `.ino` starter code; it does not compile or flash firmware by itself. Use Arduino IDE or Wokwi to compile/run supported sketches.
