<script setup lang="ts">
import { ref } from "vue";

import { useCartStore } from "../../../store/client/cart";
import type { ProductCartDetail } from "../../../types";

import ProductQuantity from "./ProductQuantity.vue";
import ConfirmModal from "../../ConfirmModal.vue";

const cartStore = useCartStore();

const props = defineProps<{
  data: ProductCartDetail;
  index: number;
}>();

const confirmModalState = ref<boolean>(false);

const confirmModalInfo = {
  title: "Delete",
  desctiption: `Are you sure to delete ${props.data.productInfo?.name}`,
};
</script>
<template>
  <hr v-if="index != 0" class="w-full text-neutral-200 my-4"></hr>
  <div v-if="data.productInfo" class="flex gap-5 h-40">
    <div class="w-1/3 max-w-[180px] h-full">
      <img
        :src="data.productInfo.coverImg"
        class="w-full h-full rounded-lg object-scale-down" />
    </div>
    <div class="flex flex-col flex-auto p-2">
      <div class="flex justify-between">
        <h1 class="font-semibold text-xl">
          {{ data.productInfo.name }}
        </h1>
        <button class="btn btn-circle" @click="confirmModalState = true">
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
          <div
            v-if="data.variantType !== 'none'"
            class="flex gap-2 justify-center items-center">
            <span class="text-sm text-neutral-400 font-light"
              >{{ data.variantType.toUpperCase() }} :
            </span>
            <div
              v-if="data.variantType === 'color'"
              class="w-4 h-4 rounded-full"
              :style="{ backgroundColor: data.variant }"></div>
            <div
              v-else
              class="w-7 h-7 rounded-md border-1 border-gray-100 flex justify-center items-center text-xs">
              {{ data.variant }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-5 justify-between items-center">
        <ProductQuantity
          :currentQuantity="data.quantity"
          :remainQuantity="data.remainQuantity"
          :index="index"></ProductQuantity>
        <span class="text-semibold"
          >{{ data.totalPrice.toLocaleString() }} THB</span
        >
      </div>
    </div>
    <ConfirmModal
      v-if="confirmModalState"
      :action="() => cartStore.removeCart(data.id)"
      :title="confirmModalInfo.title"
      :description="confirmModalInfo.desctiption"
      :cancel="() => (confirmModalState = false)"></ConfirmModal>
  </div>
</template>
