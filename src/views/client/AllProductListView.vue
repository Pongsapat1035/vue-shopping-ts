<script setup lang="ts">
import UserLayout from "../../layout/UserLayout.vue";
import ProductCard from "../../components/client/ProductCard.vue";
import SearchWrapper from "../../components/client/all-product/SearchWrapper.vue";
import FilterTab from "../../components/client/FilterTab.vue";
import { onMounted, watch, reactive } from "vue";
import { useClientProductStore } from "../../store/client/product";

const productStore = useClientProductStore();

interface FilterProduct {
  searchText: string;
  sortBy: string;
  colorFilter: string[];
  sizeFilter: string[];
  priceFilter: string;
}

const filterData = reactive<FilterProduct>({
  searchText: "",
  sortBy: "A - Z",
  colorFilter: [],
  sizeFilter: [],
  priceFilter: "",
});

watch(
  filterData,
  () => {
    productStore.queryProduct(filterData);
  },
  { deep: true }
);

const toggleSort = () =>
  (filterData.sortBy =
    filterData.sortBy === "A - Z"
      ? (filterData.sortBy = "Z - A")
      : (filterData.sortBy = "A - Z"));

onMounted(async () => {
  try {
    await productStore.loadAllProducts();
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <UserLayout>
    <div
      class="bg-gray-400 rounded-lg h-70 w-full mb-8 flex justify-center items-center text-3xl font-bold">
      Baner
    </div>
    <div class="flex gap-5 relative">
      <FilterTab v-model="filterData" :toggleSort="toggleSort"></FilterTab>
      <div class="flex-auto flex flex-col gap-4 relative">
        <SearchWrapper v-model="filterData.searchText"></SearchWrapper>
        <div class="flex flex-wrap gap-8 w-full">
          <ProductCard
            v-for="product in productStore.productLists"
            :data="product"></ProductCard>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
