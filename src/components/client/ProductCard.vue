<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { ClientProductCard } from '../../types'

defineProps<{
  data: ClientProductCard;
}>();

</script>

<template>
  <div class="card bg-base-100 w-90 border border-gray-200 rounded-2xl p-5">
    <figure class="h-80">
      <img class="h-full" :src="data.coverImg" :alt="data.name" />
    </figure>
    <div class="card-body">
      <div class="flex justify-between">
        <h2 class="card-title">{{ data.name }}</h2>
        <button class="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="size-[1.2em]">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>
      <p>{{ data.detail }}</p>
      <p>{{ data.price }} $</p>
      <div class="card-actions justify-end gap-2">
        <RouterLink :to="`/product/${data.id}`" class="btn btn-primary"
          >View detail</RouterLink
        >
      </div>
    </div>
  </div>
</template>
