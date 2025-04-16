import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueApexCharts)
app.mount("#app");
