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
    <li class="list-row grid grid-cols-2 sm:grid-cols-5">
      <div class="hidden sm:block text-xs uppercase font-semibold">Customer name</div>
      <div class="text-xs uppercase font-semibold">Order ID</div>
      <div class="hidden sm:block text-xs uppercase font-semibold">order date</div>
      <div class="hidden sm:block text-xs uppercase font-semibold">amout</div>
      <div class="text-xs uppercase font-semibold text-center">Status</div>
    </li>
    <div v-if="orderStore.isLoading" class="flex flex-col gap-5 p-5">
      <div v-for="_ in 8" class="skeleton w-full h-14"></div>
    </div>
    <div v-else>
      <OrderLists
        v-if="orderStore.orderLists.length > 0"
        v-for="order in orderStore.orderLists"
        :orderData="order"></OrderLists>
      <div v-else class="flex justify-center items-center h-full w-full my-5 font-light text-neutral-500">
        There are currently no orders to display.
      </div>
    </div>
  </ul>
</template>
