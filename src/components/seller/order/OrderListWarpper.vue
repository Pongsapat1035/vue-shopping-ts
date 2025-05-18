<script setup lang="ts">
import { onMounted } from "vue";
import { useAdminOrderStore } from "../../../store/admin/order";

import OrderLists from "./OrderLists.vue";

const orderStore = useAdminOrderStore();

onMounted(async () => {
  await orderStore.loadOrders();
});

</script>
<template>
  <ul class="flex-1 basis-60 list bg-base-100 rounded-box shadow-md">
    <li class="list-row grid grid-cols-5">
      <div class="text-xs uppercase font-semibold">Customer name</div>
      <div class="text-xs uppercase font-semibold">Order ID</div>
      <div class="text-xs uppercase font-semibold">order date</div>
      <div class="text-xs uppercase font-semibold">amout</div>
      <div class="text-xs uppercase font-semibold">Status</div>
    </li>
    <OrderLists
      v-if="orderStore.orderLists.length > 0"
      v-for="order in orderStore.orderLists"
      :orderData="order"></OrderLists>
    <div v-else class="flex justify-center items-center h-full w-full">
      There are currently no orders to display.
    </div>
  </ul>
</template>
