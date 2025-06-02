<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="hero bg-[#252422] min-h-screen flex rounded-sm">
    <div class="flex-none lg:flex-1 h-full"></div>
    <div class="flex-1 flex flex-col items-end gap-5 p-10 h-full">
      <h1 class="text-6xl sm:text-7xl font-bold text-right text-white">
        Style That Speaks for You
      </h1>
      <p class="py-6 text-neutral-300 font-light">
        Discover the latest trends, timeless pieces, and everyday
        essentials—curated for you.
      </p>
      <div class="flex gap-5 bg-white rounded-full p-4 w-max">
        <RouterLink :to="{ name: 'user-products'}" class="btn btn-primary bg-[#EB5E28] text-white border-0">
          Shop Now
        </RouterLink>
        <RouterLink
          :to="{ name: 'admin-dashboard' }"
          class="btn bg-[#252422] text-white border-0">
          Shop Dashboard
        </RouterLink>
      </div>
    </div>
    <div class="max-w-md"></div>
  </div>
</template>
