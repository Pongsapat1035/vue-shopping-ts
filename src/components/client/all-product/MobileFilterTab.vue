<script setup lang="ts">
import { onMounted } from "vue";
import { useClientProductStore } from "../../../store/client/product";
import { useAdminProductStore } from "../../../store/admin/product";
const adminProductStore = useAdminProductStore();

import PriceLength from "./PriceLength.vue";
import VariantsFilter from "./VariantsFilter.vue";
import SortBy from "./SortBy.vue";

onMounted(async () => {
  await adminProductStore.loadConfig();
});

const productStore = useClientProductStore();
</script>
<template>
  <div
    :class="productStore.filterState ? 'h-full' : 'h-0'"
    class="block lg:hidden w-full bg-white z-10 fixed bottom-0 left-0 transition-all duration-300 overflow-hidden">
    <button
      v-if="productStore.filterState"
      class="btn border-0 bg-transparent absolute right-5 top-5 hover:bg-neutral-100 transition duration-300 px-3 py-2"
      @click="productStore.filterState = false">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        class="size-[1.2rem]">
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
    </button>
    <div class="flex flex-col gap-5 w-3/4 sm:w-1/2 mx-auto my-8">
      <h1 v-if="productStore.filterState" class="text-3xl font-semibold">
        Filter
      </h1>
      <SortBy uniqueId="mobile" v-if="productStore.filterState"></SortBy>
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
  </div>
</template>
