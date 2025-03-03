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
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { initializeApp } from "firebase/app";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import ProgressSpinner from "primevue/progressspinner";
import Card from "primevue/card";

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
app.use(ToastService);

app.component("app-menubar", Menubar);
app.component("app-button", Button);
app.component("app-input-text", InputText);
app.component("app-toast", Toast);
app.component("app-progress", ProgressSpinner);
app.component("app-card", Card);

app.mount("#app");
