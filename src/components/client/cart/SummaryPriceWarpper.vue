<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCartStore } from "../../../store/client/cart";
import { useAlertStore } from "../../../store/alert";

const props = defineProps<{
  isEmpty: Boolean;
}>();

const alertStore = useAlertStore();
const cartStore = useCartStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    const isEmpty = props.isEmpty;
    if (!isEmpty) throw new Error("Cart is empty !");
    const orderId: string = await cartStore.createOrder();
    alertStore.toggleAlert("Success", "Create order success !");
    router.push({ name: "user-checkout", params: { id: orderId } });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      alertStore.toggleAlert("Warning", error.message);
    }
  }
};
</script>
<template>
  <div class="w-full lg:w-2/4 h-max p-8 border border-gray-200 rounded-2xl">
    <h1 class="font-bold text-2xl">Summary</h1>
    <div class="flex flex-col gap-4 mt-5">
      <div
        v-if="cartStore.isLoading"
        v-for="_ in 3"
        class="skeleton w-full h-8"></div>
      <div v-else class="flex flex-col gap-4">
        <div class="flex justify-between">
          <p>price</p>
          <p>{{ cartStore.getTotalProductPrice.toLocaleString() }} THB</p>
        </div>
        <div class="flex justify-between">
          <p>Shipping price</p>
          <p>{{ cartStore.getTotalShipping.toLocaleString() }} THB</p>
        </div>
        <div class="flex justify-between">
          <p>Total price</p>
          <p>{{ cartStore.getTotalPrice.toLocaleString() }} THB</p>
        </div>
        <button
          @click="handleSubmit"
          class="btn btn-primary"
          :disabled="cartStore.isLoading">
          Checkout
        </button>
        <RouterLink :to="{ name: 'user-products' }" class="btn btn-neutral"
          >Shopping more</RouterLink
        >
      </div>
    </div>
  </div>
</template>
