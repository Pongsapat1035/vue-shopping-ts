<script setup lang="ts">
import { ref } from "vue";
import { useClientProductStore } from "../../../store/client/product";

const productStore = useClientProductStore();
const quantity = ref<number>(1);

const handleQuantity = (e: Event) => {
  const target = e.currentTarget as HTMLInputElement;
  if (target) {
    const targetName = target.name;
    if (
      targetName === "increase" &&
      quantity.value < productStore.product.remainQuantity
    ) {
      quantity.value++;
    } else if (targetName === "decrease" && quantity.value > 1) {
      quantity.value--;
    }
  }
};
</script>

<template>
  <div class="flex items-center">
    <button
      type="button"
      class="border border-gray-200 w-8 h-8 flex justify-center items-center cursor-pointer"
      name="decrease"
      @click="handleQuantity">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="size-[.7em]">
        <path
          d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
      </svg>
    </button>
    <div
      class="border border-gray-200 text-md w-8 h-8 flex justify-center items-center">
      <input
        type="number"
        name="quantity"
        :value="quantity"
        :max="productStore.product.remainQuantity"
        disabled
        disableAppearance
        class="w-full disableAppearance text-center" />
      <input type="number" name="quantity" :value="quantity" hidden />
    </div>
    <button
      type="button"
      class="border border-gray-200 w-8 h-8 flex justify-center items-center cursor-pointer"
      @click="handleQuantity"
      name="increase">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="size-[.7em]">
        <path
          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
      </svg>
    </button>
    <div class="text-xs text-gray-400 ml-4">
      Stock : {{ productStore.product.remainQuantity }}
    </div>
  </div>
</template>

<style>
.disableAppearance {
  appearance: none;
  -moz-appearance: textfield;
}
</style>
