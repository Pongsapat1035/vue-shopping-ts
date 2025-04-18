<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { ClientProductCard } from "../../types";

defineProps<{
  data: ClientProductCard;
}>();
</script>

<template>
  <div class="card bg-base-100 w-90 rounded-2xl">
    <img
      class="h-3/4 object-contain rounded-lg"
      :src="data.coverImg"
      :alt="data.name" />
    <div class="card-body flex flex-col gap-3 p-3">
      <div class="flex justify-between">
        <h2 class="card-title">{{ data.name }}</h2>
        <div
          v-if="data.remainQuantity === 0"
          class="bg-red-200 rounded-2xl py-1 px-2 text-xs text-red-800 font-semibold">
          Out of stock
        </div>
      </div>
      <p class="font-light text-neutral-500">{{ data.detail }}</p>
      <div class="card-actions justify-between items-center gap-2">
        <p class="font-semibold text-lg">
          {{ data.price.toLocaleString() }} THB
        </p>
        <RouterLink :to="`/product/${data.id}`" class="btn btn-primary"
          >View detail</RouterLink
        >
      </div>
    </div>
  </div>
</template>
