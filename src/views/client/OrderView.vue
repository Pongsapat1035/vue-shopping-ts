<script setup lang="ts">
import UserLayout from "../../layout/UserLayout.vue";
import { useOrderStore } from "../../store/client/order";
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import OrderCard from "../../components/client/order/OrderCard.vue";

const orderStore = useOrderStore();

onMounted(async () => {
  await orderStore.loadAllOrders();
});

</script>
<template>
  <UserLayout>
    <div class="p-5">
      <h1 class="font-semibold text-3xl mb-8">My order</h1>
      <ul
        v-if="orderStore.orderLists.length > 0"
        class="list bg-base-100 rounded-box shadow-md flex flex-col">
        <OrderCard
          v-for="(order, index) in orderStore.orderLists"
          :index="index"
          :orderData="order"></OrderCard>
      </ul>
      <div
        v-else
        class="border border-dashed border-neutral-300 px-5 py-10 text-neutral-500 text-center rounded-2xl font-light">
        Order is empty
        <RouterLink
          :to="{ name: 'user-products' }"
          class="underline px-2 font-medium"
          >view product</RouterLink
        >
      </div>
    </div>
  </UserLayout>
</template>
