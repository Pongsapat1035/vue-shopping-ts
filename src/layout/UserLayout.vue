<script setup lang="ts">
import { onMounted } from "vue";
import { useAdminProductStore } from "../store/admin/product";
import { useCartStore } from "../store/client/cart";
import { useAuthStore } from "../store/auth";
import AlertBadge from "../components/AlertBadge.vue";
import Navbar from "../components/client/layout/Navbar.vue";

const cartStore = useCartStore();
const sellerProductStore = useAdminProductStore();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    await cartStore.loadCart();
    await sellerProductStore.setConfig();
    await authStore.loadUserInfo();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="w-screen flex justify-center">
    <div class="container h-screen flex flex-col sticky top-0">
      <Navbar></Navbar>
      <div class="flex-auto">
        <slot></slot>
      </div>
      <div class="flex justify-center items-center min-h-14">
        <span class="font-semibold"
          >“This is a portfolio project for educational purposes only. All
          product content belongs to Nike.”</span
        >
      </div>
    </div>
    <AlertBadge></AlertBadge>
  </div>
</template>
