<script setup lang="ts">
import { useCartStore } from "../../../store/client/cart";
import { useAlertStore } from "../../../store/alert";
import { useRouter } from "vue-router";

defineProps<{
  isEmpty: Boolean;
}>();

const alertStore = useAlertStore();
const cartStore = useCartStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    const orderId: string = await cartStore.createOrder();
    alertStore.toggleAlert("success", "Create order success !");
    router.push({ name: "user-checkout", params: { id: orderId } });
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="w-2/4 h-max p-8 border border-gray-200 rounded-2xl">
    <h1 class="font-bold text-2xl">Summary</h1>
    <div class="flex flex-col gap-4 mt-5">
      <div class="flex justify-between">
        <p>price</p>
        <p>{{ cartStore.getTotalProductPrice }}$</p>
      </div>
      <div class="flex justify-between">
        <p>Shipping price ( per product : {{ cartStore.shippingPrice }}$ )</p>
        <p>{{ cartStore.getTotalShipping }}$</p>
      </div>
      <div class="flex justify-between">
        <p>Total price</p>
        <p>{{ cartStore.getTotalPrice }}$</p>
      </div>
      <Button @click="handleSubmit" class="btn btn-primary" :disabled="!isEmpty"
        >Checkout</Button
      >
      <RouterLink to="/" class="btn btn-neutral">Shopping more</RouterLink>
    </div>
  </div>
</template>
