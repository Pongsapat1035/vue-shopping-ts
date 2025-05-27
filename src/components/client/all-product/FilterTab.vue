<script setup lang="ts">
import { onMounted } from "vue";
import { useClientProductStore } from "../../../store/client/product";
import { useAdminProductStore } from "../../../store/admin/product";

import VariantsFilter from "./VariantsFilter.vue";
import PriceLength from "./PriceLength.vue";
import SortBy from "./SortBy.vue";

const productStore = useClientProductStore();
const adminProductStore = useAdminProductStore();

onMounted(async () => {
  await adminProductStore.loadConfig();
});
</script>

<template>
  <div
    :class="
      productStore.filterState
        ? 'w-[350px] min-w-[350px] px-5 py-8 border border-gray-200'
        : 'w-0 p-0'
    "
    class="h-max sticky top-20 hidden lg:flex flex-col gap-5 z-4 bg-white rounded-2xl overflow-hidden transition-all duration-300">
    <h1 v-if="productStore.filterState" class="text-3xl font-semibold">
      Filter
    </h1>
    <SortBy uniqueId="desktop" v-if="productStore.filterState"></SortBy>
    <VariantsFilter
      v-if="productStore.filterState"
      variantType="Color"
      v-model="productStore.productQuery.variants"></VariantsFilter>
    <VariantsFilter
      v-if="productStore.filterState"
      variantType="Size"
      v-model="productStore.productQuery.variants"></VariantsFilter>
    <PriceLength v-if="productStore.filterState"></PriceLength>
  </div>
</template>
