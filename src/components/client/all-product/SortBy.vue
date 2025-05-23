<script setup lang="ts">
import { useClientProductStore } from "../../../store/client/product";
import { watch } from "vue";
const productStore = useClientProductStore();

watch(
  () => productStore.productQuery.sortBy,
  () => {
    productStore.queryProduct();
  }
);
</script>
<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-xl font-semibold">Sort by</h1>
    <div class="flex flex-col gap-3">
      <div class="flex gap-2 items-center">
        <label for="radio-1" class="text-neutral-500 font-light text-sm">
          <input
            id="radio-1"
            type="radio"
            name="radio-1"
            value="Newest First"
            class="radio"
            v-model="productStore.productQuery.sortBy" />
          Newest first</label
        >
      </div>
      <div class="flex gap-2 items-center">
        <label for="radio-2" class="text-neutral-500 font-light text-sm">
          <input
            id="radio-2"
            type="radio"
            name="radio-2"
            value="Name A-Z"
            class="radio"
            v-model="productStore.productQuery.sortBy" />
          Name A-Z</label
        >
      </div>
      <div class="flex gap-2 items-center">
        <label for="radio-3" class="text-neutral-500 font-light text-sm">
          <input
            id="radio-3"
            type="radio"
            name="radio-3"
            value="Name Z-A"
            class="radio"
            v-model="productStore.productQuery.sortBy" />
          Name Z-A</label
        >
      </div>
    </div>
  </div>
</template>
