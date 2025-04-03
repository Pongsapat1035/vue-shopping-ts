<script setup lang="ts">
import UserLayout from "../../layout/UserLayout.vue";
import ProductCard from "../../components/client/ProductCard.vue";
import SearchWrapper from "../../components/client/all-product/SearchWrapper.vue";
import FilterTab from "../../components/client/FilterTab.vue";
import { onMounted } from "vue";
import { useClientProductStore } from "../../store/client/product";
const productStore = useClientProductStore();
onMounted(async () => {
  try {
    await productStore.loadAllProducts();
    console.log(productStore.productLists);
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <UserLayout>
    <div
      class="bg-gray-400 rounded-lg h-70 w-full mb-8 flex justify-center items-center text-3xl font-bold">
      Badge
    </div>
    <div class="flex gap-5">
      <FilterTab></FilterTab>
      <div class="flex-auto flex flex-col gap-4">
        <SearchWrapper></SearchWrapper>
        <div class="grid grid-cols-3 gap-10 w-full">
          <ProductCard
            v-for="product in productStore.productLists"
            :data="product"></ProductCard>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
