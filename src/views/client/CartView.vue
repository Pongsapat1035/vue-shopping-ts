<script setup lang="ts">
import { RouterLink } from "vue-router";
import ProductListCart from "../../components/client/cart/ProductListCart.vue";
import UserLayout from "../../layout/UserLayout.vue";
import { useCartStore } from "../../store/client/cart";
const cartStore = useCartStore();
</script>

<template>
  <UserLayout>
    <div class="container mx-auto">
      <div class="flex w-3/4 p-10 mx-auto">
        <div class="w-3/4 p-5">
          <h1 class="font-bold text-2xl">Product lists</h1>
          <ProductListCart
            v-for="product in cartStore.cartItems"></ProductListCart>
        </div>
        <div class="w-2/4 p-5">
          <h1 class="font-bold text-2xl">Summary</h1>
          <div class="flex flex-col gap-4 mt-5">
            <div class="flex justify-between">
              <p>price</p>
              <p>200$</p>
            </div>
            <div class="flex justify-between">
              <p>Shipping price</p>
              <p>10$</p>
            </div>
            <div class="flex justify-between">
              <p>Shipping price</p>
              <p>210$</p>
            </div>
            <RouterLink to="/user/checkout" class="btn btn-primary"
              >Checkout</RouterLink
            >
            <RouterLink to="/" class="btn">Shopping more</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
