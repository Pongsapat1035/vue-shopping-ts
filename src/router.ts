import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { useAuthStore } from "./store/auth";

// buyer view
import HomeView from "./views/HomeView.vue";
import AuthView from "./views/AuthView.vue";

import CartView from "./views/client/CartView.vue";
import CheckoutView from "./views/client/CheckoutView.vue";
import ProductDetailView from "./views/client/ProductDetailView.vue";
import AllProductListView from "./views/client/AllProductListView.vue";
import ProfileView from "./views/client/ProfileView.vue";
import OrderView from "./views/client/OrderView.vue";
// seller view
import DashboardView from "./views/admin/DashboardView.vue";
import OrderManangeView from "./views/admin/OrderManangeView.vue";
import ProductManageView from "./views/admin/ProductManageView.vue";
import ProductFormView from "./views/admin/ProductFormView.vue"

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView },
  { path: "/auth", name: "login", component: AuthView },
  { path: "/user/cart", name: "user-cart-auth", component: CartView },
  {
    path: "/user/checkout/:id",
    name: "user-checkout-auth",
    component: CheckoutView,
  },
  {
    path: "/user/all-product",
    name: "user-products",
    component: AllProductListView,
  },
  { path: "/user/profile", name: "user-profile-auth", component: ProfileView },
  { path: "/user/order", name: "user-order-auth", component: OrderView },
  {
    path: "/product/:id",
    name: "user-productDetail",
    component: ProductDetailView,
  },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    component: DashboardView,
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: OrderManangeView,
  },
  {
    path: "/admin/products",
    name: "admin-products",
    component: ProductManageView,
  },
  {
    path: "/admin/product/add",
    name: "admin-addProduct",
    component: ProductFormView,
  },
  {
    path: "/admin/product/edit/:id",
    name: "admin-editproduct",
    component: ProductFormView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuth();
  const role = authStore.role;

  // check if not admin can't access seller page
  const pathName = (to.name?.toString() ?? "")
  if (pathName.includes("admin") && role !== "admin") {
    next({ name: "home" });
  } else if (pathName.includes("auth") && role === "") {
    next({ name: "home" });
  } else {
    next()
  }
});

export default router;
