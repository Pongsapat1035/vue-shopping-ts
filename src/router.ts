import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import HomeView from "./views/HomeView.vue";
import AuthView from "./views/AuthView.vue";
import CartView from "./views/buyer/CartView.vue";
import CheckoutView from "./views/buyer/CheckoutView.vue";
import ProductDetailView from "./views/ProductDetailView.vue";
// ensure this object conform with vue-router route format
const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView },
  { path: "/auth", component: AuthView },
  { path: "/user/cart", component: CartView },
  { path: "/user/checkout", component: CheckoutView },
  { path: "/product/:id", component: ProductDetailView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
