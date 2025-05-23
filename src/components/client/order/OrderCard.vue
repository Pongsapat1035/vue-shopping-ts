<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { OrderDetail } from "../../../types";

import StatusBadge from "../../StatusBadge.vue";

type OrderList = Pick<OrderDetail, "id" | "status"> & {
  products?: string[];
};

const props = defineProps<{
  orderData: OrderList;
  index: number;
}>();

const convertedProductName = () => {
  return props.orderData.products?.join(", ");
};
const convertIndex = () => {
  const newIndex = props.index + 1;
  return newIndex < 10 ? "0" + newIndex.toString() : newIndex.toString();
};
</script>
<template>
  <li class="list-row flex justify-between">
    <div class="flex flex-row">
      <div class="hidden sm:block text-4xl font-thin opacity-30 tabular-nums">
        {{ convertIndex() }}
      </div>
      <div class="list-col-grow ml-6 flex flex-col gap-2">
        <div class="font-semibold">
          <span class="hidden sm:block">Order number : </span>{{ orderData.id }}
        </div>
        <StatusBadge :type="orderData.status"></StatusBadge>
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ convertedProductName() }}
        </div>
      </div>
    </div>
    <RouterLink
      :to="{ name: 'user-checkout', params: { id: orderData.id } }"
      class="btn btn-primary max-w-[120px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192 512"
        class="block sm:hidden size-[1rem] fill-white">
        <path
          d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-192-32 0c-17.7 0-32-14.3-32-32z" /></svg
      ><span class="hidden sm:block">view detail</span></RouterLink
    >
  </li>
</template>
