<script setup lang="ts">
import { ref } from "vue";
import type { OrderDetail } from "../../../types";

import StatusBadge from "../../StatusBadge.vue";
import OrderCard from "./OrderCard.vue";

defineProps<{
  orderData: OrderDetail;
}>();
const orderModalState = ref<boolean>(false);
</script>
<template>
  <li
    class="list-row grid grid-cols-5 items-center cursor-pointer"
    @click="orderModalState = true">
    <div class="flex gap-5">
      <div class="list-col-grow">
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ orderData.customerName || "Customer name" }}
        </div>
      </div>
    </div>
    <div class="list-col-grow">
      <div class="text-xs uppercase font-semibold opacity-60">
        {{ orderData.id }}
      </div>
    </div>
    <div class="list-col-grow">
      <div class="text-xs uppercase font-semibold opacity-60">
        {{ orderData.createdDate }}
      </div>
    </div>
    <div class="flex gap-5">
      <div class="list-col-grow">
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ orderData.totalPrice.toLocaleString() }} THB
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <StatusBadge v-model:type="orderData.status"></StatusBadge>
    </div>
  </li>
  <OrderCard
    v-if="orderModalState"
    :closeModal="() => (orderModalState = false)"
    :orderId="(orderData.id ?? '')"></OrderCard>
</template>
