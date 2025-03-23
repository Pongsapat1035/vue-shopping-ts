import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// buyer view
import HomeView from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import CartView from "./views/client/CartView.vue";
import CheckoutView from "./views/client/CheckoutView.vue";
import ProductDetailView from "./views/client/ProductDetailView.vue";
import AllProductListView from "./views/client/AllProductListView.vue";
import ProfileView from "./views/client/ProfileView.vue";
import OrderView from "./views/client/OrderView.vue";
// seller view
import DashboardView from "./views/seller/DashboardView.vue";
import OrderManangeView from "./views/seller/OrderManangeView.vue";
import ProductManageView from "./views/seller/ProductManageView.vue";
import AddProductView from "./views/seller/AddProductView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView },
  { path: "/auth", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/user/cart", component: CartView },
  { path: "/user/checkout", component: CheckoutView },
  { path: "/user/all-product", component: AllProductListView },
  { path: "/user/profile", component: ProfileView },
  { path: "/user/order", component: OrderView },
  { path: "/product/:id", component: ProductDetailView },
  { path: "/seller/dashboard", component: DashboardView },
  { path: "/seller/orders", component: OrderManangeView },
  { path: "/seller/products", component: ProductManageView },
  { path: "/seller/product/add", component: AddProductView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
