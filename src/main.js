import { createApp } from "vue";
import VueFinalModal from "vue-final-modal";
import axios from "axios";
import "./main.css";

import * as firebase from "firebase/app";
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
app.use(VueFinalModal());

app.mount("#app");
