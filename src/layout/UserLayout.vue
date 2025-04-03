<script setup lang="ts">
import { onMounted } from "vue";
import Navbar from "../components/client/layout/Navbar.vue";
import { useSellerProductStore } from "../store/seller/product";
const sellerProductStore = useSellerProductStore();
onMounted(async () => {
  try {
    await sellerProductStore.setConfig();
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
  </div>
</template>
