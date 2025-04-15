<script setup lang="ts">
import StatusBadge from "../../StatusBadge.vue";
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

defineProps<{
  orderData: OrderDetail;
}>();
</script>
<template>
  <li class="list-row grid grid-cols-5 items-center">
    <div class="flex gap-5">
      <div class="list-col-grow">
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ orderData.name || "Customer name" }}
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
</template>
