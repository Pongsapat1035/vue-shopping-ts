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
    if (authStore.userId) {
      await authStore.loadUserInfo();
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="w-screen flex justify-center">
    <div class="container h-screen flex flex-col">
      <Navbar></Navbar>
      <div class="flex-auto">
        <slot></slot>
      </div>
      <div class="flex justify-center items-center min-h-14">
        <span class="font-semibold text-center text-xs sm:text-sm"
          >“This is a portfolio project for educational purposes only. All
          product content belongs to Nike.”</span>
      </div>
    </div>
    <AlertBadge></AlertBadge>
  </div>
</template>
