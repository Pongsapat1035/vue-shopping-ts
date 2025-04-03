<script setup lang="ts">
import { ref } from "vue";
import { useClientProductStore } from "../../../store/client/product";
const productStore = useClientProductStore();

const priceSortState = ref<string>("Low to Hight");
const nameSortState = ref<string>("A - Z");
const handlePriceSortState = () => {
  priceSortState.value === "Low to Hight"
    ? (priceSortState.value = "High to Low")
    : (priceSortState.value = "Low to Hight");
  // productStore.sortProductByName(priceSortState.value);
  productStore.sortProductByPrice(priceSortState.value)
};

const handleNameSortState = () => {
  nameSortState.value === "A - Z"
    ? (nameSortState.value = "Z - A")
    : (nameSortState.value = "A - Z");
  productStore.sortProductByName(nameSortState.value);
};
</script>
<template>
  <div class="flex flex-col gap-5">
    <h1 class="font-semibold text-3xl">Sort by</h1>
    <div class="flex justify-between">
      <h1 class="font-semibold">Price</h1>
      <button class="btn" @click="handlePriceSortState">
        {{ priceSortState }}
        <svg
          v-if="priceSortState === 'Low to Hight'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          class="size-[1rem]">
          <path
            d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192l72 0 0 288c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-288 72 0c9.6 0 18.2-5.7 22-14.5z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          class="size-[1rem]">
          <path
            d="M2 334.5c-3.8 8.8-2 19 4.6 26l136 144c4.5 4.8 10.8 7.5 17.4 7.5s12.9-2.7 17.4-7.5l136-144c6.6-7 8.4-17.2 4.6-26s-12.5-14.5-22-14.5l-72 0 0-288c0-17.7-14.3-32-32-32L128 0C110.3 0 96 14.3 96 32l0 288-72 0c-9.6 0-18.2 5.7-22 14.5z" />
        </svg>
      </button>
    </div>
    <div class="flex justify-between">
      <h1 class="font-semibold">Name</h1>
      <button class="btn" @click="handleNameSortState">
        {{ nameSortState }}
      </button>
    </div>
  </div>
</template>
