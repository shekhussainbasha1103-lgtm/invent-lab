# InventLab Pro v10 — Optional real AI setup

The app's AI Mentor can show a local planning guide when no backend is connected. For actual model-generated responses without a cloud API key, run Ollama locally with the Node.js backend.

## Windows steps (key-free local model)
1. Install Node.js LTS and Ollama for Windows from their official websites.
2. Open Command Prompt and run `ollama pull qwen2.5:3b` (downloads the model; needs storage and memory).
3. Open a Command Prompt in `InventLab_Pro/ai-backend`.
4. Run `npm install`.
5. Run `npm start` and keep the terminal open. The backend listens on port `8787` and calls the local Ollama service.
6. Run InventLab Pro on the same laptop. Open `http://localhost:8000`, go to AI Project Mentor and ask a question. The frontend currently connects to `http://localhost:8787/api/mentor`.

If the local backend does not start, check that Ollama is running and that `qwen2.5:3b` finished downloading. If you use the hosted GitHub Pages site, browser restrictions and local-network permissions may prevent it from reaching the backend; testing the app locally on the same laptop is the recommended first check.

## Optional cloud provider
The backend can use an OpenAI-compatible Responses API when configured with `AI_PROVIDER=openai`, `OPENAI_API_KEY`, and optionally `OPENAI_MODEL` / `OPENAI_API_URL`. Never put API keys in the website files or GitHub. Cloud use may cost money.

## Safety and limitations
AI answers are not verified engineering results. Check datasheets, board pinouts, current limits, voltage levels, and test evidence. The built-in MCU simulator is a beginner educational subset, not a complete ESP32/Arduino emulator or a substitute for a validated simulator.
