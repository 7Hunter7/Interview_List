import "./assets/main.css";
import "primevue/resources/theme/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Menubar from "primevue/menubar";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.component("app-menubar", Menubar);

app.mount("#app");
