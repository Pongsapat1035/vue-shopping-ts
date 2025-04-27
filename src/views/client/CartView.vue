<script setup lang="ts">
import { watch, ref } from "vue";
import { useCartStore } from "../../store/client/cart";
import type {  ProductCartDetail } from "../../types";

import ProductListCart from "../../components/client/cart/ProductListCart.vue";
import UserLayout from "../../layout/UserLayout.vue";
import SummaryPriceWarpper from "../../components/client/cart/SummaryPriceWarpper.vue";

const cartStore = useCartStore();
const productLists = ref<ProductCartDetail[]>([]);

watch(
  () => cartStore.productLists,
  () => {
    productLists.value = [...cartStore.productLists];
  }
);
</script>

<template>
  <UserLayout>
    <div class="container mx-auto">
      <div class="flex w-3/4 gap-5 p-10 mx-auto">
        <div class="w-3/4 p-5">
          <h1 class="font-bold text-2xl">Product lists</h1>
          <div class="flex flex-col h-[600px] overflow-scroll gap-3 my-5">
            <ProductListCart v-if="productLists.length > 0"
              v-for="(product, index) in productLists"
              :data="product"
              :index="index"></ProductListCart>
              <div v-else class="flex justify-center items-center font-semibold">
                Cart is empty
              </div>
          </div>
        </div>
        <SummaryPriceWarpper :isEmpty="productLists.length > 0"></SummaryPriceWarpper>
      </div>
    </div>
  </UserLayout>
</template>
