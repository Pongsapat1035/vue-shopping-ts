<script setup lang="ts">
import OrderLists from "./OrderLists.vue";
import { useAdminOrderStore } from "../../../store/admin/order";
import { onMounted, ref, watch } from "vue";

const orderStore = useAdminOrderStore();

interface ProductData {
  name: string;
  price: number;
  totalPrice: number;
  remainQuantity: number;
  coverImg: string;
  id: string;
  color: string | "";
  size: string | "";
  quantity: number;
}
interface OrderDetail {
  id: string;
  name: string;
  totalProductPrice: number;
  totalShippingPrice: number;
  totalPrice: number;
  status: string;
  createdDate: Date;
  products: ProductData[];
}
const orderLists = ref<OrderDetail[]>([]);

onMounted(async () => {
  await orderStore.loadOrders();
});

watch(
  () => orderStore.orderLists,
  () => {
    if (orderStore.orderLists.length > 0) {
      orderLists.value = orderStore.orderLists;
    }
  }
);
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
      v-if="orderLists.length > 0"
      v-for="order in orderLists"
      :orderData="order"></OrderLists>
    <div v-else class="flex justify-center items-center h-full w-full">
      There are currently no orders to display.
    </div>
  </ul>
</template>
