// Firebase client configuration. Replace placeholders with your Firebase Web App config.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getStorage, ref, uploadString } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_WEB_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};
const configured = !Object.values(firebaseConfig).some(v=>String(v).includes("YOUR_"));
const status=document.getElementById("ilAuthStatus");
const login=document.getElementById("ilGoogleSignIn");
const save=document.getElementById("ilCloudSave");
if(!configured){
  status.textContent="Cloud not configured · add Firebase web config";
  login.disabled=true; save.disabled=true;
} else {
  try {
    const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app), storage=getStorage(app);
    const provider=new GoogleAuthProvider();
    login.addEventListener("click",async()=>{
      try { await signInWithPopup(auth,provider); }
      catch(e){status.textContent="Sign-in failed: "+e.message;}
    });
    onAuthStateChanged(auth,user=>{
      status.textContent=user?`Signed in: ${user.email}`:"Signed out";
      login.textContent=user?"Sign out":"Google Sign-In";
      login.onclick=user?async()=>{await signOut(auth)}:null;
    });
    save.addEventListener("click",async()=>{
      const user=auth.currentUser;
      if(!user){status.textContent="Sign in before saving";return}
      save.disabled=true;
      try{
        const snapshot={savedAt:new Date().toISOString(),app:"InventLab Pro Full AI",version:"Full AI Edition",
          localWorkspace:Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith("il_")).map(k=>[k,localStorage.getItem(k)]))};
        const id="workspace-"+Date.now();
        await setDoc(doc(db,"users",user.uid,"projects",id),{...snapshot,createdAt:serverTimestamp()});
        await uploadString(ref(storage,`users/${user.uid}/snapshots/${id}.json`),JSON.stringify(snapshot,null,2),"raw",{contentType:"application/json"});
        status.textContent="Workspace snapshot saved to your private cloud";
      }catch(e){status.textContent="Cloud save failed: "+e.message;}
      finally{save.disabled=false}
    });
  } catch(e){status.textContent="Firebase initialization error: "+e.message;}
}
