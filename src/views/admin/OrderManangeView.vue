<script setup lang="ts">
import SellerLayout from "../../layout/SellerLayout.vue";
import OrderListWarpper from "../../components/seller/order/OrderListWarpper.vue";
import { useAdminOrderStore } from "../../store/admin/order";

const orderStore = useAdminOrderStore();

</script>
<template>
  <SellerLayout>
    <div class="flex flex-col h-full gap-10 p-5 overflow-scroll">
      <div class="flex-0 flex flex-col gap-5">
        <h1 class="text-3xl font-semibold">Order management</h1>
        <div class="flex gap-5">
          <div class="w-60 p-5 border border-gray-200 rounded-2xl">
            <h1 class="font-light text-neutral-400 text-lg">Total Amout</h1>
            <h1 class="font-semibold text-2xl mt-4">
              {{ orderStore.totalAmout.toLocaleString() }} THB
            </h1>
          </div>
          <div class="w-60 p-5 border border-gray-200 rounded-2xl">
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
