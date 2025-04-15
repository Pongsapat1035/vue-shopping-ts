<script setup lang="ts">
import { RouterLink } from "vue-router";
import NavLink from "../components/seller/layout/NavLink.vue";
import { useAdminProductStore } from "../store/admin/product";
import AlertBadge from "../components/AlertBadge.vue";

import { onMounted } from "vue";
const productStore = useAdminProductStore();
onMounted(async () => {
  try {
    await productStore.setConfig();
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="container mx-auto flex gap-5 relative h-screen">
    <div
      class="w-[350px] min-w-[350px] sticky top-0 my-5 rounded-2xl py-8 px-5 bg-slate-900">
      <RouterLink to="/" class=" text-4xl font-semibold text-white "
        >Mart.shop</RouterLink
      >
      <div class="flex flex-col mt-10">
        <NavLink name="Dashboard" path="/seller/dashboard"></NavLink>
        <NavLink name="Order Management" path="/seller/orders"></NavLink>
        <NavLink name="Product Management" path="/seller/products"></NavLink>
        <NavLink name="Logout" path="/"></NavLink>
      </div>
    </div>
    <div class="flex-auto p-5">
      <slot></slot>
    </div>
    
  </div>
  <AlertBadge></AlertBadge>
</template>
