<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { useClientProductStore } from "../../store/client/product";

import UserLayout from "../../layout/UserLayout.vue";
import ProductCard from "../../components/client/ProductCard.vue";
import SearchWrapper from "../../components/client/all-product/SearchWrapper.vue";
import FilterTab from "../../components/client/all-product/FilterTab.vue";

const productStore = useClientProductStore();

onMounted(async () => {
  try {
    await productStore.loadProducts(10, false);
    const maxPrice = await productStore.getMaxPrice();
    nextTick(() => {
      productStore.productMaxprice = maxPrice;
      productStore.productQuery.priceFilter.max = maxPrice;
    });
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <UserLayout>
    <div
      class="hidden md:flex bg-primary rounded-lg h-70 w-full mb-8 justify-center items-center text-3xl font-bold">
      <h1 class="text-white">Baner</h1>
    </div>
    <div class="flex gap-5 relative">
      <FilterTab></FilterTab>
      <div class="flex-auto flex flex-col gap-4 relative">
        <SearchWrapper></SearchWrapper>
        <div class="flex flex-wrap gap-8 w-full">
          <div
            v-if="productStore.isLoading"
            v-for="i in 9"
            class="skeleton h-120 w-90"></div>
          <ProductCard
            v-else
            v-for="product in productStore.productLists"
            :data="product"></ProductCard>
        </div>
        <div class="join grid grid-cols-2">
          <button class="join-item btn btn-outline">Previous page</button>
          <button class="join-item btn btn-outline">Next</button>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
