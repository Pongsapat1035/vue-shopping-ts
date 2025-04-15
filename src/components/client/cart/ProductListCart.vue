<script setup lang="ts">
import { useCartStore } from "../../../store/client/cart";
import ProductQuantity from "./ProductQuantity.vue";

const cartStore = useCartStore();

interface ProductData {
  id: string;
  color?: string | null;
  size?: string | null;
  quantity: number;
  name: string;
  price: number;
  totalPrice: number;
  remainQuantity: number;
  coverImg: string;
}

defineProps<{
  data: ProductData;
  index: number;
}>();
</script>
<template>
  <div v-if="index != 0" class="divider"></div>
  <div class="flex gap-5 h-40">
    <div class="w-1/3 h-full">
      <img
        :src="data.coverImg"
        class="w-full h-full rounded-lg object-scale-down" />
    </div>
    <div class="flex flex-col flex-auto p-2">
      <div class="flex justify-between">
        <h1 class="font-semibold text-xl">
          {{ data.name }}
        </h1>
        <button class="btn btn-circle" @click="cartStore.removeCart(data.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="2.5"
            stroke="currentColor"
            class="size-[1.2em]"
            viewBox="0 0 448 512">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
      </div>
      <div class="flex-auto flex gap-2 items-start">
        <div class="flex gap-2">
          <div v-if="data.color" class="flex gap-2 justify-center items-center">
            <span class="text-sm text-neutral-400 font-light">Color : </span>
            <div
              class="w-4 h-4 rounded-full"
              :style="{ backgroundColor: data.color }"></div>
          </div>
          <div v-if="data.size" class="flex gap-2 justify-center items-center">
            <span class="text-sm text-neutral-400 font-light">Size : </span>
            <div
              class="w-7 h-7 rounded-md border-1 border-gray-100 flex justify-center items-center text-xs">
              {{ data.size }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-5 justify-between items-center">
        <ProductQuantity
          :currentQuantity="data.quantity"
          :remainQuantity="data.remainQuantity"
          :index="index"></ProductQuantity>
        <span class="text-semibold">{{ data.price }}$</span>
      </div>
    </div>
  </div>
</template>
