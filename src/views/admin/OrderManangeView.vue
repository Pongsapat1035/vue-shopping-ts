<script setup lang="ts">
import { useAdminOrderStore } from "../../store/admin/order";

import SellerLayout from "../../layout/SellerLayout.vue";
import OrderListWarpper from "../../components/seller/order/OrderListWarpper.vue";

const orderStore = useAdminOrderStore();
</script>
<template>
  <SellerLayout>
    <div class="flex flex-col h-full gap-10 p-5 overflow-scroll mb-20 sm:mb-0">
      <div class="flex-0 flex flex-col gap-5">
        <h1 class="text-2xl sm:text-3xl font-semibold">Order management</h1>
        <div v-if="orderStore.isLoading" class="flex gap-5">
          <div v-for="_ in 2" class="skeleton w-1/4 h-40"></div>
        </div>
        <div v-else class="flex gap-5 flex-wrap">
          <div
            class="flex-1 xl:flex-none xl:basis-80 min-w-60 p-5 border border-gray-200 rounded-2xl">
            <h1 class="font-light text-neutral-400 text-lg">Total Amout</h1>
            <h1 class="font-semibold text-2xl mt-4">
              {{ orderStore.totalAmout.toLocaleString() }} THB
            </h1>
          </div>
          <div
            class="flex-1 xl:flex-none xl:basis-80 min-w-60 p-5 border border-gray-200 rounded-2xl">
            <h1 class="font-light text-neutral-400 text-lg">Total Orders</h1>
            <h1 class="font-semibold text-2xl mt-4">
              {{ orderStore.totalOrder }} Orders
            </h1>
          </div>
        </div>
      </div>
      <OrderListWarpper></OrderListWarpper>
    </div>
  </SellerLayout>
</template>
