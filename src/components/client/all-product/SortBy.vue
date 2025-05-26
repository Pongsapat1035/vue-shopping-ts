<script setup lang="ts">
import { useClientProductStore } from "../../../store/client/product";
const productStore = useClientProductStore();

defineProps<{
  uniqueId: string;
}>();
</script>
<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-xl font-semibold text-nowrap">Sort by</h1>
    <div class="flex flex-col gap-3 w-60">
      <div class="flex gap-2 items-center">
        <label
          :for="`radio-1-${uniqueId}`"
          class="text-neutral-500 font-light text-sm">
          <input
            :id="`radio-1-${uniqueId}`"
            type="radio"
            :name="`sortby-${uniqueId}`"
            value="Newest First"
            class="radio"
            v-model="productStore.productQuery.sortBy" />
          Newest first</label
        >
      </div>
      <div class="flex gap-2 items-center">
        <label
          :for="`radio-2-${uniqueId}`"
          class="text-neutral-500 font-light text-sm">
          <input
            :id="`radio-2-${uniqueId}`"
            type="radio"
            :name="`sortby-${uniqueId}`"
            value="Name A-Z"
            class="radio"
            v-model="productStore.productQuery.sortBy" />
          Name A-Z</label
        >
      </div>
      <div class="flex gap-2 items-center">
        <label
          :for="`radio-3-${uniqueId}`"
          class="text-neutral-500 font-light text-sm">
          <input
            :id="`radio-3-${uniqueId}`"
            type="radio"
            :name="`sortby-${uniqueId}`"
            value="Name Z-A"
            class="radio"
            v-model="productStore.productQuery.sortBy" />
          Name Z-A</label
        >
      </div>
    </div>
  </div>
</template>
