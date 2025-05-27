<script setup lang="ts">
import { watch, ref } from "vue";
import { useCartStore } from "../../store/client/cart";
import type { ProductCartDetail } from "../../types";

import ProductListCart from "../../components/client/cart/ProductListCart.vue";
import UserLayout from "../../layout/UserLayout.vue";
import SummaryPriceWarpper from "../../components/client/cart/SummaryPriceWarpper.vue";

const cartStore = useCartStore();
const productLists = ref<ProductCartDetail[]>([]);

watch(
  () => cartStore.productLists,
  () => {
    productLists.value = cartStore.productLists;
  }
);
</script>

<template>
  <UserLayout>
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row w-full lg:w-3/4 gap-8 p-10 mx-auto">
        <div class="w-full lg:w-3/4">
          <h1 class="font-bold text-2xl">Product lists</h1>
          <div
            class="flex flex-col h-max lg:h-[600px] overflow-scroll gap-3 my-5">
            <div v-if="cartStore.isLoading" v-for="_ in 3" class="flex gap-5 w-full px-6">
              <div class="skeleton h-40 w-2/3"></div>
              <div class="flex flex-col py-5 gap-4 w-full">
                <div class="skeleton h-6 w-28"></div>
                <div class="skeleton h-6 w-2/3"></div>
                <div class="skeleton h-6 w-2/3"></div>
              </div>
            </div>
            <div v-else>
              <ProductListCart
                v-if="productLists.length > 0"
                v-for="(product, index) in productLists"
                :data="product"
                :index="index"></ProductListCart>
              <div
                v-else
                class="flex justify-center items-center font-semibold p-10 border-dashed border-2 border-neutral-300 rounded-2xl text-neutral-500">
                Cart is empty
              </div>
            </div>
          </div>
        </div>
        <SummaryPriceWarpper
          :isEmpty="productLists.length > 0"></SummaryPriceWarpper>
      </div>
    </div>
  </UserLayout>
</template>
