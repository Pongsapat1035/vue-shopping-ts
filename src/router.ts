import { createMemoryHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; 

import HomeView from "./views/HomeView.vue";


// ensure this object conform with vue-router route format
const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView },
];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});

