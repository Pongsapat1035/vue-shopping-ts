<script setup lang="ts">
import type { ProductCartDetail } from '../../../types';
defineProps<{
  data: ProductCartDetail
}>()
</script>
<template>
  <div class="flex gap-5 items-start">
    <div class="w-16 h-16 bg-neutral-200 rounded-sm" >
      <img :src="data.productInfo?.coverImg" alt="">
    </div>
    <div class="flex-1 flex flex-col gap-2">
      <h1 class="text-sm">{{ data.productInfo?.name }}</h1>
      <div class="flex justify-between">
        <span class="text-xs text-neutral-500">x{{ data.quantity }}</span>
        <span class="text-xs text-neutral-500">{{ data.totalPrice.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>
