<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { ProductCardData } from "../../types";
import { onMounted, ref } from "vue";
import type { ProductVariants } from "../../types";

const props = defineProps<{
  data: ProductCardData;
}>();

const enabledVariants = ref<ProductVariants[]>([]);

onMounted(() => {
  console.log(props.data);
  const variantType = props.data.variantType;
  if (variantType !== "none")
    enabledVariants.value = props.data.variants.filter((item) => item.enable);
});
</script>

<template>
  <div class="card bg-base-100 w-90 rounded-2xl">
    <img
      class="h-[450px] object-contain rounded-lg"
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
      <div v-if="data.variantType === 'color'" class="flex gap-1">
        <div
          v-for="variant in enabledVariants"
          class="w-3 h-3 rounded-full"
          :style="{ backgroundColor: variant.name }"></div>
      </div>
      <div v-else-if="data.variantType === 'size'" class="flex gap-1">
        <div
          v-for="variant in enabledVariants"
          class="border border-neutral-200 rounded-lg p-1 text-xs min-w-6 min-h-6 flex items-center justify-center font-bold">
          {{ variant.name }}
        </div>
      </div>
      <p class="font-light text-neutral-500">{{ data.description }}</p>
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
