import "virtual:windi.css";

import { createApp } from "vue";
import VueFinalModal from "vue-final-modal";
import axios from "axios";
import "./main.css";

// Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signOut, onAuthStateChanged } from "firebase/auth";

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
});
const auth = getAuth(firebaseApp);

// Application
import App from "./App.vue";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
// Register authentication functions.
app.config.globalProperties.$auth = {
    signIn: (token) => signInWithCustomToken(auth, token),
    signOut: () => signOut(auth),
    onAuthStateChanged: (observer) => onAuthStateChanged(auth, observer),
    getIdToken: (forceRefresh = false) => auth.currentUser.getIdToken(forceRefresh),
};
app.use(VueFinalModal());

app.mount("#app");
