<script setup lang="ts">
import { useClientProductStore } from "../../../store/client/product";

const productStore = useClientProductStore();
</script>
<template>
  <div>
    <p>Color</p>
    <div class="flex gap-2">
      <label v-for="color in productStore.getColor" class="relative">
        <input
          type="radio"
          name="color"
          class="w-0 h-0 opacity-0 absolute peer"
          :value="color" />
        <div
          class="w-8 h-8 rounded-md border-0 peer-checked:border-2"
          :style="{ backgroundColor: color }"></div>
      </label>
    </div>
  </div>
</template>
