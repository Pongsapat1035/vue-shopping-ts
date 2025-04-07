<script setup lang="ts">
import { onMounted } from "vue";
import Navbar from "../components/client/layout/Navbar.vue";
import { useSellerProductStore } from "../store/seller/product";
import { useCartStore } from "../store/client/cart";
import AlertBadge from "../components/AlertBadge.vue";
import { useAuthStore } from "../store/auth";
const cartStore = useCartStore()
const sellerProductStore = useSellerProductStore();
const authStore = useAuthStore()
onMounted(async () => {
  try {
    await cartStore.loadCart()
    await sellerProductStore.setConfig();
    await authStore.loadUserInfo()
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
        <span class="text-">Created by : Mart</span>
      </div>
    </div>
    <AlertBadge></AlertBadge>
  </div>
</template>
