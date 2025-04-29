<script setup lang="ts">
import StatusBadge from "../../StatusBadge.vue";
import { RouterLink } from "vue-router";
import type { OrderDetail } from "../../../types";

type OrderList = Pick<OrderDetail, "id" | "status"> & {
  products?: string[]
}

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
  <li class="list-row">
    <div class="text-4xl font-thin opacity-30 tabular-nums">
      {{ convertIndex() }}
    </div>
    <div class="list-col-grow ml-6 flex flex-col gap-2">
      <div class="font-semibold">Order number : {{ orderData.id }}</div>
      <StatusBadge :type="orderData.status"></StatusBadge>
      <div class="text-xs uppercase font-semibold opacity-60">
        {{ convertedProductName() }}
      </div>
    </div>
    <RouterLink
      :to="{ name: 'user-checkout', params: { id: orderData.id } }"
      class="btn btn-primary"
      >view detail</RouterLink
    >
  </li>
</template>
