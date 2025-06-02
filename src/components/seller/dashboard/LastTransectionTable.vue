<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAdminDashboard } from "../../../store/admin/dashboard";
import {  watch, ref } from "vue";
import type { OrderDetail } from "../../../types";
import OrderLists from "../order/OrderLists.vue";
const dashboardStore = useAdminDashboard();

const orderList = ref<OrderDetail[]>([]);

watch(
  () => dashboardStore.orderLists,
  (newOrderLists) => {
    orderList.value = newOrderLists;
  },
  { immediate: true }
);
</script>
<template>
  <div class="flex flex-col gap-5">
    <div class="flex justify-between items-center">
      <h1 class="font-semibold text-2xl">Last transection</h1>
      <RouterLink
        class="font-light text-sm text-neutral-500 underline underline-offset-2"
        :to="{ name: 'admin-orders' }"
        >View more</RouterLink
      >
    </div>
    <p class="hidden sm:block font-light text-sm text-neutral-500">
      Keep track of your 10 most recent transactions at a glance.
    </p>
    <ul class="flex-1 basis-60 list bg-base-100 rounded-box shadow-md">
      <li class="list-row grid grid-cols-2 sm:grid-cols-5">
        <div class="hidden sm:block text-xs uppercase font-semibold">Customer name</div>
        <div class="text-xs uppercase font-semibold">Order ID</div>
        <div class="hidden sm:block text-xs uppercase font-semibold">order date</div>
        <div class="hidden sm:block text-xs uppercase font-semibold">amout</div>
        <div class="text-xs uppercase font-semibold text-center">Status</div>
      </li>
      <OrderLists
        v-if="orderList.length > 0"
        v-for="order in orderList"
        :orderData="order"></OrderLists>
      <div v-else class="flex justify-center items-center h-full w-full">
        There are currently no orders to display.
      </div>
    </ul>
  </div>
</template>
