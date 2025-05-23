<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { useClientProductStore } from "../../store/client/product";

import UserLayout from "../../layout/UserLayout.vue";
import ProductCard from "../../components/client/ProductCard.vue";
import SearchWrapper from "../../components/client/all-product/SearchWrapper.vue";
import FilterTab from "../../components/client/all-product/FilterTab.vue";
import MobileFilterTab from "../../components/client/all-product/MobileFilterTab.vue";

const productStore = useClientProductStore();

onMounted(async () => {
  try {
    productStore.productQuery.searchText = ""
    productStore.productQuery.variants = []
    
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
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-cols-min gap-8 w-full  px-8 sm:px-0">
          <div
            v-if="productStore.isLoading"
            v-for="_ in 9"
            class="skeleton h-120 w-full"></div>
          <ProductCard
            v-else
            v-for="product in productStore.productLists"
            :data="product"></ProductCard>
        </div>
      </div>
    </div>
    <MobileFilterTab></MobileFilterTab>
  </UserLayout>
</template>
