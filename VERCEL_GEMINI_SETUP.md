# InventLab Pro — Vercel + Gemini edition

## What this update changes
- Adds Vercel serverless endpoints at `/api/mentor` and `/api/health`.
- Connects both AI assistant entry points to the same-origin `/api/mentor` endpoint.
- Keeps the Gemini key on Vercel's server-side environment; it is not included in browser JavaScript.
- Retains the original Node/Express backend in `ai-backend/` for a separate host if needed.

## Deploy this updated version to your existing Vercel project
1. Keep a backup of your current project files.
2. Extract this ZIP. Open the `InventLab_Pro` folder. The `index.html`, `api` folder, `config.js`, `vercel.json`, and other files must be at the project root selected for Vercel.
3. Upload/deploy the contents of that folder to the **existing** Vercel project (do not create a new project). If using the Vercel dashboard's manual upload flow, create a new deployment from the extracted folder. If the project is connected to GitHub, commit/push these updated files instead.
4. In Vercel → Project → Settings → Environment Variables, add:
   - Name: `GEMINI_API_KEY` (exact uppercase spelling)
   - Value: your newly created Gemini API key
   - Environment: Production (also select Preview/Development if desired)
   - Optional: `GEMINI_MODEL` = `gemini-2.5-flash`
5. Save the variables, then redeploy the latest deployment so the functions receive them.
6. Open `https://YOUR-PROJECT.vercel.app/api/health`. Expected JSON includes `"ok":true` and `"provider":"gemini"`.
7. Open the website, use the InventLab AI assistant, and ask a simple question. Expected status is Gemini connected.

## Security — important
A prior screenshot exposed part of an API key. Delete/revoke that exposed key in Google AI Studio and create a replacement. Add only the replacement to Vercel as `GEMINI_API_KEY`. Never put it in `config.js`, `index.html`, GitHub, chat, or screenshots. If the key is ever exposed again, revoke it immediately.

## Important deployment note
This ZIP is source code, not an already-hosted update or Android APK. You must deploy the extracted updated files to your existing Vercel project. Vercel functions require the project root to be the `InventLab_Pro` folder (the folder containing `index.html`, `api/`, and `vercel.json`).

## Firebase and Android
Firebase Google Sign-In/Firestore/Storage still require your own Firebase project configuration and secure rules as described in the original FULL_AI_SETUP.md. This update does not create a signed APK/AAB. Android packaging and Play Store submission are separate steps.

## Engineering accuracy
The built-in MCU runtime remains an educational subset, not a cycle-accurate emulator or validated SPICE simulator. Verify designs against datasheets and real measurements; never connect student circuits directly to mains voltage.
