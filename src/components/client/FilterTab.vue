<script setup lang="ts">
import PriceLength from "./all-product/PriceLength.vue";
import ColorFilter from "../../components/client/all-product/ColorFilter.vue";
import SizeFilter from "./all-product/SizeFilter.vue";
import SortTab from "./all-product/SortTab.vue";
import { useClientProductStore } from "../../store/client/product";

const productStore = useClientProductStore();
interface FilterProduct {
  sortBy: string;
  colorFilter: string[];
  sizeFilter: string[];
  priceFilter: string;
}

defineProps<{
  toggleSort: Function;
}>();

const filterData = defineModel<FilterProduct>({
  default: { sortBy: "", colorFilter: [], sizeFilter: [], priceFilter: "" },
});

</script>

<template>
  <div
    :class="productStore.filterState ? 'block' : 'hidden'"
    class="w-1/4 max-w-[350px] flex flex-col gap-5 px-5 py-8 border border-gray-200 rounded-2xl overflow-hidden">
    <SortTab v-model="filterData.sortBy" :toggleSort="toggleSort"></SortTab>
    <h1 class="text-3xl font-semibold">Filter</h1>
    <ColorFilter v-model="filterData.colorFilter"></ColorFilter>
    <SizeFilter v-model="filterData.sizeFilter"></SizeFilter>
    <PriceLength v-model="filterData.priceFilter"></PriceLength>
  </div>
</template>
