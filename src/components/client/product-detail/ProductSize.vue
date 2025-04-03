<script setup lang="ts">
import { useClientProductStore } from "../../../store/client/product";

const productStore = useClientProductStore();
</script>
<template>
  <div class="flex flex-col gap-2">
    <h1>Size</h1>
    <div class="flex gap-2">
      <label v-for="size in productStore.getSize" class="relative">
        <input
          type="radio"
          name="size"
          class="w-0 h-0 opacity-0 absolute peer"
          :value="size" />
        <div
          class="w-12 py-1 h-full border-2 text-sm border-gray-100 peer-checked:border-gray-400 rounded-lg flex justify-center items-center font-semibold">
          {{ size }}
        </div>
      </label>
    </div>
  </div>
</template>
