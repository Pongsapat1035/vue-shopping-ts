<script setup lang="ts">
import UserLayout from "../../layout/UserLayout.vue";
import { useOrderStore } from "../../store/client/order";
import { onMounted, watch, ref } from "vue";
import OrderCard from "../../components/client/order/OrderCard.vue";

const orderStore = useOrderStore();
const ordersData = ref<OrderData[]>([]);

interface OrderData {
  id: string;
  status: string;
  products: string[];
}

onMounted(async () => {
  await orderStore.loadAllOrders();
});

watch(
  () => orderStore.orderLists,
  () => {
    if (orderStore.orderLists.length > 0) {
      const orderLists: OrderData[] = orderStore.orderLists.map((order) => {
        const productsName: string[] = order.products.map(
          (product) => product.name
        );
        const convertOrder: OrderData = {
          id: order.id,
          status: order.status,
          products: productsName,
        };
        return convertOrder;
      });
      ordersData.value = orderLists;
    }
  }
);
</script>
<template>
  <UserLayout>
    <div class="p-5">
      <h1 class="font-semibold text-3xl mb-8">My order</h1>
      <ul class="list bg-base-100 rounded-box shadow-md flex flex-col">
        <OrderCard v-for="(order, index) in ordersData" :index="index" :orderData="order"></OrderCard>
      </ul>
    </div>
  </UserLayout>
</template>
