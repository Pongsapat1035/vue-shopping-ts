<script setup lang="ts">
import { onMounted } from "vue";
import { useClientProductStore } from "../../store/client/product";

import UserLayout from "../../layout/UserLayout.vue";
import ProductCard from "../../components/client/ProductCard.vue";
import SearchWrapper from "../../components/client/all-product/SearchWrapper.vue";
import FilterTab from "../../components/client/FilterTab.vue";

const productStore = useClientProductStore();

onMounted(async () => {
  try {
    await productStore.loadProducts();
    await productStore.searchProduct();
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <UserLayout>
    <div
      class="bg-primary rounded-lg h-70 w-full mb-8 flex justify-center items-center text-3xl font-bold">
      <h1 class="text-white">Baner</h1>
    </div>
    <div class="flex gap-5 relative">
      <FilterTab></FilterTab>
      <div class="flex-auto flex flex-col gap-4 relative">
        <SearchWrapper></SearchWrapper>
        <div class="flex flex-wrap gap-8 w-full">
          <ProductCard
            v-for="product in productStore.productLists"
            :data="product"></ProductCard>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
