# InventLab — ready-to-deploy web app / PWA

InventLab is a responsive, offline-friendly electronics learning and invention prototype. It works as a website and can be installed as a PWA on compatible Android browsers when served over HTTPS.

## Included working features
- Responsive dark-neon interface for phone and desktop
- Home, Workbench, Projects, Learn, and My Ideas sections
- Component picker for circuit drafts; add/remove/clear parts
- Basic parts checklist for a draft
- Visual LED circuit demo that estimates current from selected supply voltage and resistor value (simplified ideal model; not a general-purpose simulator)
- Six beginner project guides with parts and steps
- Four expandable electronics lessons with quick checks
- Idea starter that generates a structured plan locally (not AI)
- Save circuit drafts, saved projects, and notes in browser local storage
- PWA manifest and service worker for basic offline caching

## Important limitations
- The LED demo is a simplified educational calculation only. The component draft does not model arbitrary wire connections or validate custom circuits.
- Local saves stay in the same browser/device. There is no cloud sync or user account.
- The idea planner is a template, not an AI service.
- Follow datasheets and get qualified supervision for physical builds. Never connect hobby circuits directly to mains electricity.

## Fastest way to publish using GitHub Pages
1. Create a new public GitHub repository named `inventlab` (or another name).
2. Upload `index.html`, `manifest.webmanifest`, `icon.svg`, and `sw.js` to the repository root. Keep filenames unchanged.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
5. Wait for GitHub Pages to publish the site. Open the URL shown on the Pages settings screen.
6. On Android, open that HTTPS URL in Chrome and use the browser menu's **Install app** or **Add to Home screen** option if available.

GitHub Pages serves the website; it does not automatically create a native APK. This project can be used as an installable web app (PWA). For a native Android APK, a later step would wrap the web app with a tool such as Capacitor or rebuild it in Flutter.

## Run locally
You can open `index.html` directly for most interactive features. PWA install/offline caching require a local web server or HTTPS. A simple local server:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Free tools
GitHub Pages is suitable for static hosting within its current plan limits. Check GitHub's official documentation and current usage terms before publishing.
