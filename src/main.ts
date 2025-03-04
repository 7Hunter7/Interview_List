import "./assets/main.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { initializeApp } from "firebase/app";

import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

// Компонеты PrimeVue
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Radio from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textaria";
import Calendar from "primevue/calendar";
import Toast from "primevue/toast";
import ProgressSpinner from "primevue/progressspinner";
import Card from "primevue/card";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import ConfirmDialog from "primevue/confirmdialog";
import InlineMessage from "primevue/inlinemessage";
import Badge from "primevue/badge";
import Tooltip from "primevue/tooltip";

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

// Подключение плагинов
app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

// Директивы
app.directive("tooltip", Tooltip);

// Глобальные компоненты
app.component("app-menubar", Menubar);
app.component("app-button", Button);
app.component("app-radio", Radio);
app.component("app-input-text", InputText);
app.component("app-input-number", InputNumber);
app.component("app-textaria", Textarea);
app.component("app-calendar", Calendar);
app.component("app-toast", Toast);
app.component("app-progress", ProgressSpinner);
app.component("app-card", Card);
app.component("app-column", Column);
app.component("app-datatable", DataTable);
app.component("app-dialog", ConfirmDialog);
app.component("app-message", InlineMessage);
app.component("app-badge", Badge);

app.mount("#app");
