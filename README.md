# InventLab Pro v8 — Standalone Engineering Studio

A single mobile-responsive web app for engineering students. This package is a practical upgrade of the InventLab prototype and keeps the existing workspace while adding a clearer standalone engineering workflow. It does not connect to Wokwi.

## Included in this package
- Overview dashboard and project library with guided engineering blueprints.
- Visual circuit canvas: add and drag components, connect individual terminals, remove wires, use starter circuits, save circuits locally and run simplified educational DC estimates for supported examples.
- Product-to-Circuit Designer: generate a reference bill of materials, suggested pin map, firmware scaffold, schematic view and illustrative 3D-style concept view.
- Standalone Boolean logic lab (AND, OR, XOR, NOT) with virtual LED output.
- Engineering calculators, learning paths, firmware workspace, research templates and notebook.
- AI Project Mentor with an offline planning-guide fallback and optional Node.js backend for real AI responses. See `AI_SETUP.md`.
- Local browser saves and workspace JSON export.

## Run on Windows
1. Extract this ZIP.
2. Open Command Prompt in the `InventLab_Pro` folder.
3. Run `py -m http.server 8000`.
4. Open `http://localhost:8000`.
5. To stop the server, press `Ctrl+C` in Command Prompt.

You can also publish the static app folder contents to GitHub Pages. Ensure `index.html` is in the published root. GitHub Pages only hosts the front end; it does not run the Node.js AI backend.

## AI setup
Read `AI_SETUP.md`. Keep API keys on the backend only; never paste them into `index.html` or commit them to GitHub. API usage may cost money depending on the provider/account.

## Important technical limits
- Circuit results are simplified educational estimates, not a validated SPICE simulation. This package does not bundle or run ngspice.
- The logic lab demonstrates Boolean logic only; it does not emulate ESP32/Arduino firmware or peripherals.
- The 3D-style product view is an illustrative SVG concept, not dimensionally accurate 3D CAD.
- The embedded starter `.ino` is sample source code; compilation and flashing require Arduino IDE/CLI, suitable board packages and hardware.
- AI responses can be wrong. Verify component ratings, pinouts and calculations against datasheets and supervisor guidance. Use low-voltage, current-limited educational setups; never connect student projects directly to mains electricity.


## V8 Circuit Studio usability upgrade

- Components can be dragged around the canvas.
- Wire mode now connects individual terminal dots rather than component centers.
- Existing wires can be clicked and removed; Clear wires removes all connections without deleting parts.
- The LED estimator now checks for a closed component loop before reporting the ideal current.
- This remains an educational demo, not a validated SPICE solver or microcontroller emulator.


## v9 upgrade: local AI + Wokwi bridge

See `AI_SETUP.md` for a key-free local AI setup using Ollama. The left navigation includes a Wokwi ESP32 simulator bridge. The 3D-style SVG designer and existing project workspaces remain. Wokwi is opened externally; full ESP32/Arduino emulation is not bundled into this static site. The built-in circuit estimate is not a SPICE engine.
