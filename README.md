# InventLab Pro — Professional Engineering Studio (Prototype)

A mobile-responsive PWA prototype for ECE/EEE learning and project planning, spanning B.E./B.Tech through M.E./M.Tech and research workflows.

## New in this build
- Expanded advanced project library: MPPT algorithm comparison, battery SOC estimation, BLDC/FOC simulation study, SDR BER experiments, FPGA FIR verification, TinyML predictive maintenance, microgrid digital twin, PLL, vibration analysis, secure IoT telemetry, solar forecasting, audio DSP, simulated grid-tied inverter control, robot sensor fusion, MEMS calibration, power-quality analysis and wearable activity classification.
- Project guides now include stages from fundamentals and design through validation, measurements, analysis, documentation and advanced extensions. Project guides can be exported as text and saved into the local notebook.
- Firmware workspace with editable Arduino/ESP32 starter sketch and `.ino` export.
- Illustrative ngspice netlist exporter for an ideal source/resistor example; exports `.cir` but does not run a SPICE solver.
- Research planning template and JSON research hand-off export/import for file-based collaboration.
- Research integrity checklist, local notebook and existing project/circuit export features.

## Run
1. Extract the ZIP.
2. Open `index.html` in a browser. PWA installation/service worker usually requires HTTPS or localhost.
3. For local testing, run `python -m http.server 8000` from this folder and open `http://localhost:8000`.
4. For a phone install, publish via GitHub Pages or another HTTPS static host, then choose “Add to Home screen” in your browser.

## Engineering status — read carefully
This remains a **prototype**, not a finished professional engineering platform.

- **SPICE:** The app generates an illustrative netlist; it does not bundle or execute ngspice. Download the `.cir` file and run it in a locally installed SPICE tool. Real simulation needs a validated netlist builder, device models, solver integration and regression tests.
- **Firmware:** The app exports `.ino` starter files. Compilation and uploading require Arduino IDE/arduino-cli, correct board packages, USB drivers, board selection and hardware access on a computer. The web page does not flash a board.
- **AI:** The research helper is a local template generator, not a connected AI model. It does not search papers, verify citations or guarantee technical correctness.
- **Collaboration:** Research JSON hand-off is file-based. There is no live multi-user editing, cloud storage or conflict management.
- **Authentication:** The local demo profile is not secure authentication. Real Google sign-in requires Firebase or another trusted identity provider, authorised domains, security rules, privacy disclosures and account deletion/export flows.
- **Native app:** This ZIP is a PWA, not an APK. Play Store release requires a native Android implementation/wrapper, testing, signed release builds, Play Console setup and required disclosures.

## Recommended production architecture
1. Front end: TypeScript + a component framework, with accessible mobile and desktop layouts.
2. Circuit model: pin-aware components, explicit electrical nets, netlist generation and schema/version migration.
3. Simulation: isolated ngspice service or a well-tested client-side solver; resource limits, validation fixtures and clear solver diagnostics.
4. Firmware: local desktop companion/IDE workflow or secure sandbox compilation. Hardware flashing should remain explicit and user-authorised.
5. AI research assistant: authenticated backend, model/API configuration, source-grounded literature search, citation verification and privacy controls. Never label generated content as verified without checking.
6. Collaboration: authenticated users, versioned projects, comments, roles, audit history and backups.
7. Research reproducibility: datasets, units, calibration metadata, code/tool versions, raw/processed data separation and uncertainty reporting.

## Safety
Use low-voltage, current-limited educational setups. Never connect a student prototype directly to mains or the public grid. Battery, motor, RF, biomedical and power-electronics projects require appropriate isolation, protection, datasheets and qualified supervision. Never rely on an unvalidated simulation for safety-critical decisions.


## Product-to-Circuit Designer update
- Describe a product and select a curated reference template: ESP32 smart irrigation, IoT weather station, obstacle-avoiding robot, air-quality monitor, solar monitor, or custom brief.
- Generate a bill of materials, suggested pin map, detailed staged build plan, engineering validation checklist, firmware scaffold and JSON hand-off.
- Switch between a functional block schematic and an illustrative isometric 3D-style SVG preview.
- Export the design brief as JSON, download the starter `.ino`, and save a summary into the local notebook.

### Important precision boundary
The isometric SVG is a visual concept, not an exact mechanical 3D CAD assembly. The pin map is a reference template and must be checked against the exact board revision, module datasheets, supply rails, logic levels and current ratings. The browser does not run a circuit solver, compile/flash firmware, or guarantee that a generated circuit will work. For true physical 3D design, use an ECAD/MCAD workflow with exact component footprints, STEP models, connector geometry and design-rule checks. For simulation, integrate a validated SPICE solver.


## v6 standalone upgrade
- Added AI Project Mentor with local fallback and an optional secure local Node.js backend (see `AI_SETUP.md`).
- Added Standalone Logic Lab for Boolean gate learning and virtual LED output.
- No Wokwi connection is included. Existing circuit designer, project library, learning paths, calculators, firmware tools, research templates and notebook are retained.
- Full microcontroller simulation, exact CAD and SPICE execution remain separate integrations; see the engineering boundaries above.
