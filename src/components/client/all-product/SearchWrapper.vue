<script setup lang="ts">
import { useClientProductStore } from "../../../store/client/product";

const productStore = useClientProductStore();
</script>
<template>
  <div
    class="w-full py-4 flex justify-end item-center sticky top-0 z-5 bg-white">
    <div class="flex gap-4 w-full sm:w-2/3  px-8 sm:p-0 justify-end">
      <label class="input w-full sm:w-96 pl-4 py-1 pr-1 outline-0">
        <input
          type="search"
          placeholder="What are you looking for ?"
          v-model="productStore.productQuery.searchText" />
      </label>
      <button
        class="btn btn-primary btn-circle"
        @click="() => productStore.queryProduct()">
        <svg
          class="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      </button>
      <button
        class="btn btn-ghost"
        :class="productStore.filterState ? 'bg-blue-50' : ''"
        @click="productStore.filterState = !productStore.filterState">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="size-[1rem]">
          <path
            d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
        </svg>
        <span class="hidden md:block">{{
          productStore.filterState ? "Hide filter" : "Show filter"
        }}</span>
      </button>
    </div>
  </div>
</template>
