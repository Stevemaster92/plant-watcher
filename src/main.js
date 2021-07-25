import { createApp } from "vue";
import axios from "axios";
import "./main.css";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

firebase.initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

import App from "./App.vue";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$firebase = firebase;
app.config.globalProperties.$auth = firebase.auth();
app.mount("#app");
