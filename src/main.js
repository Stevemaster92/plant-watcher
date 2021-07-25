import { createApp } from "vue";
import axios from "axios";
import "./main.css";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyCwSksedRGnznHuVNaPM-TCT6GXm56A0bQ",
    authDomain: "plantwatcher-api.firebaseapp.com",
    projectId: "plantwatcher-api",
    storageBucket: "plantwatcher-api.appspot.com",
    messagingSenderId: "187674331765",
    appId: "1:187674331765:web:6a49f241ff30bf9393c63c",
});

import App from "./App.vue";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.mount("#app");
