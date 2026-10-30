# InventLab Pro — Full AI Edition setup

## What is included
- Existing InventLab engineering workspaces and built-in educational MCU runtime.
- Universal AI assistant available from every tab.
- Gemini API support in the Node backend (API key remains on the server).
- Optional Firebase Google authentication, Firestore workspace snapshots and Storage JSON backups.
- Responsive web app/PWA foundation and Android packaging instructions.

## 1. Run the website locally
1. Extract the ZIP.
2. Install Node.js LTS.
3. In the `InventLab_Pro` folder run `npx http-server -p 8000` (or `py -m http.server 8000`).
4. Open `http://localhost:8000`.

## 2. Enable Gemini AI (real model responses)
1. Create a Gemini API key in Google AI Studio: https://aistudio.google.com/app/apikey
2. Deploy the `ai-backend` folder to a Node.js hosting service (Render, Railway, or your own server).
3. Set backend environment variables:
   - `AI_PROVIDER=gemini`
   - `GEMINI_API_KEY=your_secret_key`
   - `GEMINI_MODEL=gemini-2.5-flash` (or a model available to your key)
4. Backend start command: `npm start`; build command: `npm install`.
5. In `InventLab_Pro/config.js`, set `window.INVENTLAB_API_URL` to your deployed backend HTTPS URL.
6. Redeploy/refresh the website and test the floating **Ask InventLab AI** button.

Do not paste your Gemini key into `index.html`, `config.js`, GitHub Pages, screenshots, or public repositories. Only set it as a private backend environment variable.

## 3. Enable real Google Sign-In and cloud storage
1. Create a Firebase project: https://console.firebase.google.com/
2. Add a Web App and copy its Firebase web configuration.
3. Enable **Authentication → Sign-in method → Google**.
4. Add your website domain under **Authentication → Settings → Authorized domains** (include localhost for local testing).
5. Enable **Cloud Firestore** and **Storage**.
6. Copy the Firebase web config into `firebase-cloud.js`, replacing every `YOUR_...` placeholder.
7. Set Firestore rules so users can access only their own data, for example:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/projects/{projectId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

8. Set Storage rules:

```text
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

9. Publish rules. Sign in and use **Save to Cloud**. This saves a snapshot of the app's `il_` local workspace data to that signed-in user's Firestore account and Storage bucket.

Firebase web config is intended to be present in client apps; security comes from Authentication and correctly restrictive Firestore/Storage rules. Never use open/public database rules.

## 4. Android application / Play preparation
The ZIP is a responsive PWA website, not a compiled APK. For an Android package:
1. Deploy the website on HTTPS.
2. Install Android Studio and Node.js.
3. Use Capacitor in a separate wrapper project:
   `npm create @capacitor/app`
4. Configure the app ID/name, add the Android platform, and point the WebView assets/server URL to the deployed app.
5. Test Google sign-in on a real Android device; popup-based Firebase auth may require redirect-based sign-in or a native Firebase plugin in a packaged app.
6. Create a signed Android App Bundle (AAB), prepare screenshots, privacy policy, data safety form, content rating and Play listing, then submit through Play Console.

A Play Store release requires your own developer account, signing credentials, policy declarations and testing. This ZIP does not contain a signed APK/AAB.

## 5. Engineering safety and accuracy
- Circuit calculations and MCU runtime remain educational approximations, not SPICE or instruction-accurate MCU emulation.
- AI-generated wiring, code, calculations and research must be independently checked against official datasheets, toolchains and measurements.
- Never connect student circuits directly to mains electricity. Use current-limited low-voltage supplies and qualified supervision.
- Do not upload confidential student data or credentials.
