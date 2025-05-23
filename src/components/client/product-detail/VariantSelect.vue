<script setup lang="ts">
import { useClientProductStore } from "../../../store/client/product";

const productStore = useClientProductStore();
const selectedVariant = defineModel("value")

</script>
<template>
  <div class="flex flex-col gap-2">
    <p>{{ productStore.product.variantType.toLocaleUpperCase() }}</p>
    <div v-if="productStore.product.variantType === 'color'" class="flex gap-2">
      <label v-for="color in productStore.getVariant" class="relative">
        <input
          type="radio"
          name="variant"
          class="w-0 h-0 opacity-0 absolute peer"
          :value="color"
          v-model="selectedVariant" />
        <div
          class="w-8 h-8 rounded-md border-0 peer-checked:border-2 border-blue-500 p-[2px]">
        <div class="w-full h-full rounded-md" :style="{ backgroundColor: color }">

        </div>
      
      </div>
      </label>
    </div>
    <div
      v-else-if="productStore.product.variantType === 'size'"
      class="flex gap-2">
      <label v-for="size in productStore.getVariant" class="relative">
        <input
          type="radio"
          name="variant"
          class="w-0 h-0 opacity-0 absolute peer"
          :value="size"
          v-model="selectedVariant" />
        <div
          class="w-12 py-1 h-full border-2 text-sm border-gray-100 peer-checked:border-gray-400 rounded-lg flex justify-center items-center font-semibold">
          {{ size }}
        </div>
      </label>
    </div>
  </div>
</template>
