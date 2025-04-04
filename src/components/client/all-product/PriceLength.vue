<script setup lang="ts">
import { useClientProductStore } from "../../../store/client/product";

const productStore = useClientProductStore();
const value = defineModel<string>();
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <h1 class="font-semibold text-2xl">Max Price</h1>
      <h1 class="font-medium text-lg">{{ value }} $</h1>
    </div>
    <div class="w-full max-w-xs">
      <input
        type="range"
        min="0"
        :max="productStore.getMaxPrice"
        v-model="value"
        class="range range-xs" />
      <div class="flex justify-between px-2.5 mt-2 text-xs">
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
      <div class="flex justify-between px-2.5 mt-2 text-xs">
        <span>0</span>
        <span>{{ productStore.getMaxPrice / 2 }}</span>
        <span>{{ productStore.getMaxPrice }}</span>
      </div>
    </div>
  </div>
</template>
