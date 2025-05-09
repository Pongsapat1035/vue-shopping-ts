<script setup lang="ts">
import { onMounted } from "vue";
import { useClientProductStore } from "../../../store/client/product";
import { useAdminProductStore } from "../../../store/admin/product";

import VariantsFilter from "./VariantsFilter.vue";
import PriceLength from "./PriceLength.vue";

const productStore = useClientProductStore();
const adminProductStore = useAdminProductStore();

onMounted(async () => {
  await adminProductStore.loadConfig();
});

</script>

<template>
  <div
    :class="productStore.filterState ? 'block' : 'hidden'"
    class="w-1/4 max-w-[350px] h-max sticky top-5 flex flex-col gap-5 px-5 py-8 border border-gray-200 rounded-2xl overflow-hidden">
    <h1 class="text-3xl font-semibold">Filter</h1>
    <VariantsFilter variantType="Color" v-model="productStore.productQuery.variants"></VariantsFilter>
    <VariantsFilter variantType="Size" v-model="productStore.productQuery.variants"></VariantsFilter>
    <PriceLength></PriceLength>
  </div>
</template>
