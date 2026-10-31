import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7-RiyazikjV_8yqptPFWFHcRRPGCZZBM",
  authDomain: "inventlab-pro.firebaseapp.com",
  projectId: "inventlab-pro",
  storageBucket: "inventlab-pro.firebasestorage.app",
  messagingSenderId: "175048317391",
  appId: "1:175048317391:web:35cf50fe0c8ee224d1daba",
  measurementId: "G-DVXLDKDS1P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const appShell = document.getElementById("appShell");

// Keep the application hidden until Firebase checks authentication.
if (appShell) appShell.style.visibility = "hidden";

const loginScreen = document.createElement("div");
loginScreen.id = "mandatoryGoogleLogin";

loginScreen.style.cssText = `
  position:fixed;
  inset:0;
  z-index:999999;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#07111f;
  color:white;
  font-family:Arial,sans-serif;
  padding:20px;
`;

loginScreen.innerHTML = `
  <div style="width:100%;max-width:390px;text-align:center;
    padding:30px 22px;border:1px solid #29445b;
    border-radius:18px;background:#101e30">
    <h1 style="margin:0 0 12px;color:#39d9f5">
      InventLab PRO
    </h1>
    <h2 style="font-size:21px">Welcome to InventLab Pro</h2>
    <p style="color:#b8c7d9;line-height:1.6">
      Sign in with your Google account to access the engineering studio.
    </p>
    <button id="mandatoryGoogleButton"
      style="width:100%;padding:14px;border:0;border-radius:9px;
      background:#ffffff;color:#111;font-size:16px;
      font-weight:bold;cursor:pointer">
      Continue with Google
    </button>
    <p id="mandatoryLoginStatus"
      style="color:#b8c7d9;font-size:13px;margin-top:16px"></p>
  </div>
`;

document.body.appendChild(loginScreen);

const loginButton = document.getElementById("mandatoryGoogleButton");
const loginStatus = document.getElementById("mandatoryLoginStatus");

loginButton.addEventListener("click", async () => {
  loginButton.disabled = true;
  loginStatus.textContent = "Connecting to Google...";

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    loginStatus.textContent = "Sign-in failed: " + error.message;
    loginButton.disabled = false;
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginScreen.style.display = "none";

    if (appShell) appShell.style.visibility = "visible";

    // Create a sign-out button in the account section.
    const accountNav = document.querySelector(".sidebar .nav");
    let accountButton = document.getElementById("accountBtn");

    if (accountButton) {
      accountButton.innerHTML = `
        <span>◎</span>
        ${user.email || "Google Account"}
      `;
      accountButton.onclick = async () => {
        if (confirm("Are you sure you want to sign out?")) {
          await signOut(auth);
        }
      };
    }
  } else {
    if (appShell) appShell.style.visibility = "hidden";

    loginScreen.style.display = "flex";
    loginButton.disabled = false;
    loginStatus.textContent = "";
  }
});
