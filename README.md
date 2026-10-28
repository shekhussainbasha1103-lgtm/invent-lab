# InventLab Pro v10 — Built-in MCU Learning Simulator

A mobile-responsive engineering learning studio. This version removes the Wokwi simulator redirect and adds an in-app educational sketch runtime. Existing circuit canvas, project library, 3D-style SVG designer, calculators, firmware workspace, learning paths and notebook remain.

## Included
- Circuit Studio with component placement, draft wires, saved circuits and simplified educational DC estimates.
- Product-to-Circuit Designer with BOM draft, pin-map suggestions, schematic and illustrative 3D-style SVG concept view.
- **Built-in MCU Simulator:** select a virtual Arduino Uno or ESP32 DevKit, edit a beginner Arduino sketch, run supported GPIO/Serial commands, watch virtual pin states and LED, and view Serial Monitor output. It stays inside InventLab Pro and does not redirect to another simulator site.
- Boolean logic lab, engineering calculators, firmware workspace, project blueprints, learning paths, research templates and local notebook.
- AI Project Mentor: local planning fallback; optional Node.js backend supports key-free local AI using Ollama.

## Run on Windows
1. Extract this ZIP.
2. Open Command Prompt in the `InventLab_Pro` folder.
3. Run `py -m http.server 8000`.
4. Open `http://localhost:8000`.
5. To stop the server, press `Ctrl+C`.

For GitHub Pages, upload the **contents** of `InventLab_Pro` to the published repository root so `index.html` is at the root. The website is static; it cannot run the Node.js backend itself.

## Real AI without an API key
See `AI_SETUP.md`. Install Ollama and download a model locally, then start the Node.js backend. The key-free path uses your laptop's local model. It requires sufficient RAM/storage and the backend terminal to remain open.

## Simulator accuracy boundary — read this
The built-in simulator is an **educational subset**, not full Wokwi-level emulation. It handles simple `setup()` / `loop()` sketches with `pinMode`, `digitalWrite`, constant `analogWrite`, `delay`, and `Serial.print/println`. It does not compile arbitrary C++, run precompiled ESP32 binaries, emulate Arduino libraries, Wi-Fi/Bluetooth, interrupts, timers, sensor models, I²C/SPI devices, or flash hardware. The board SVG is illustrative. A complete instruction-accurate ESP32/Arduino emulator would require a dedicated CPU/peripheral engine and extensive testing; this ZIP does not claim that is implemented.

Circuit Studio's DC calculations are simplified estimates, not a validated SPICE solver. The 3D-style preview is illustrative SVG, not dimensionally accurate CAD. Verify all real designs against official datasheets and use low-voltage, current-limited educational setups; never connect student projects directly to mains electricity. AI output may be wrong and should be checked.
