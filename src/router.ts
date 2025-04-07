import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { useAuthStore } from "./store/auth";

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
import EditProductView from "./views/seller/EditProductView.vue";


const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView },
  { path: "/auth/login", name: "auth-login", component: LoginView },
  { path: "/auth/register", name: "auth-register", component: RegisterView },
  { path: "/user/cart", name: "user-cart", component: CartView },
  { path: "/user/checkout/:id", name: "user-checkout", component: CheckoutView },
  {
    path: "/user/all-product",
    name: "user-products",
    component: AllProductListView,
  },
  { path: "/user/profile", name: "user-profile", component: ProfileView },
  { path: "/user/order", name: "user-order", component: OrderView },
  {
    path: "/product/:id",
    name: "user-productDetail",
    component: ProductDetailView,
  },
  {
    path: "/seller/dashboard",
    name: "seller-dashboard",
    component: DashboardView,
  },
  {
    path: "/seller/orders",
    name: "seller-orders",
    component: OrderManangeView,
  },
  {
    path: "/seller/products",
    name: "seller-products",
    component: ProductManageView,
  },
  {
    path: "/seller/product/add",
    name: "seller-addProduct",
    component: AddProductView,
  },{
    path: '/seller/product/edit/:id',
    name: "seller-editproduct",
    component: EditProductView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuth();
  const role = authStore.role;
  // check if not admin can't access seller page
  if (
    typeof to.name === "string" &&
    to.name.includes("seller") &&
    role !== "admin"
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
