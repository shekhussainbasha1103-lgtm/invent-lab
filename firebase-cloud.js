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

const notice = document.querySelector(".notice");

if (notice) {
  notice.innerHTML = `
    <div style="text-align:center;padding:10px">
      <h3>Sign in to InventLab Pro</h3>
      <button id="googleLogin"
        style="padding:12px 20px;border-radius:9px;cursor:pointer;font-weight:bold">
        Continue with Google
      </button>
      <p id="loginStatus" style="margin-top:12px"></p>
    </div>
  `;
}

const loginButton = document.getElementById("googleLogin");
const status = document.getElementById("loginStatus");

if (loginButton) {
  loginButton.addEventListener("click", async () => {
    loginButton.disabled = true;
    status.textContent = "Connecting to Google...";

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      status.textContent = "Login failed: " + error.message;
      loginButton.disabled = false;
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (!notice) return;

  if (user) {
    notice.innerHTML = `
      <div style="text-align:center;padding:10px">
        <h3>Welcome to InventLab Pro!</h3>
        <p>${user.email}</p>
        <button id="googleLogout"
          style="padding:10px 18px;border-radius:9px;cursor:pointer">
          Sign Out
        </button>
      </div>
    `;

    document.getElementById("googleLogout")
      .addEventListener("click", () => signOut(auth));
  } else {
    notice.innerHTML = `
      <div style="text-align:center;padding:10px">
        <h3>Sign in to InventLab Pro</h3>
        <button id="googleLogin"
          style="padding:12px 20px;border-radius:9px;cursor:pointer;font-weight:bold">
          Continue with Google
        </button>
        <p id="loginStatus" style="margin-top:12px"></p>
      </div>
    `;

    document.getElementById("googleLogin")
      .addEventListener("click", async () => {
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          document.getElementById("loginStatus").textContent =
            "Login failed: " + error.message;
        }
      });
  }
});
