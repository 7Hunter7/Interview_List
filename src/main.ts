import "./assets/main.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Menubar from "primevue/menubar";
import { initializeApp } from "firebase/app";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZXrBVCAvd7-hO5HmLGK7irbyXQuUIQd4",
  authDomain: "interview-list-87bd1.firebaseapp.com",
  projectId: "interview-list-87bd1",
  storageBucket: "interview-list-87bd1.firebasestorage.app",
  messagingSenderId: "182458649351",
  appId: "1:182458649351:web:0e21ac695d542622b013a2",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.component("app-menubar", Menubar);

app.mount("#app");
