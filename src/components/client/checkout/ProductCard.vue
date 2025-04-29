<script setup lang="ts">
import type { ProductCartDetail } from "../../../types";

defineProps<{
  data: ProductCartDetail;
}>();
</script>
<template>
  <div class="flex gap-5 h-40">
    <div class="w-1/3 h-full">
      <img
        :src="data.productInfo?.coverImg"
        class="w-full h-full rounded-lg object-scale-down" />
    </div>
    <div class="flex flex-col flex-auto p-2">
      <div class="flex justify-between">
        <h1 class="font-semibold text-xl">
          {{ data.productInfo?.name }}
        </h1>
      </div>
      <div class="flex-auto flex gap-2 items-start mt-2">
        <div v-if="data.variant" class="flex gap-2">
          <div
            v-if="data.variantType === 'color'"
            class="flex gap-2 justify-center items-center">
            <span class="text-sm text-neutral-400 font-light">Color : </span>
            <div
              class="w-4 h-4 rounded-full"
              :style="{ backgroundColor: data.variant }"></div>
          </div>
          <div
            v-if="data.variantType === 'size'"
            class="flex gap-2 justify-center items-center">
            <span class="text-sm text-neutral-400 font-light">Size : </span>
            <div
              class="w-7 h-7 rounded-md border-1 border-gray-100 flex justify-center items-center text-xs">
              {{ data.variant }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-5 justify-between items-center">
        <span class="font-light text-neutral-400"
          >Qty : {{ data.quantity }}</span>
        <span class="text-semibold">{{ data.totalPrice }}$</span>
      </div>
    </div>
  </div>
</template>
