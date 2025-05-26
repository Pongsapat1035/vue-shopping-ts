<script setup lang="ts">
import { watch, ref } from "vue";
import type { ProductVariants } from "../../../types";

import InputTag from "@/components/InputTag.vue";

const sizes = defineModel<ProductVariants[]>("sizes", {
  default: () => [{ enable: false, name: "", remainQuantity: 0 }],
});

const sizeEnableLists = ref<ProductVariants[]>([]);
const errMsg = ref<string[]>([]);

watch(
  () => sizes,
  () => {
    sizeEnableLists.value = sizes.value.filter((size) => size.enable === true);
  },
  { immediate: true,deep: true }
);
</script>
<template>
  <fieldset
    class="fieldset flex-auto flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-full">
    <legend class="fieldset-legend">Size</legend>
    <div  class="flex flex-col gap-2">
      <div class="flex gap-2 flex-wrap">
        <label v-for="size in sizes" class="w-8 h-8 relative">
          <input
            type="checkbox"
            class="w-0 h-0 opacity-0 absolute peer"
            :value="size.name"
            v-model="size.enable" />
          <div
            class="w-full h-full border-2 border-gray-100 peer-checked:border-gray-400 rounded-lg flex justify-center items-center font-semibold">
            {{ size.name }}
          </div>
        </label>
      </div>
      <div v-if="sizeEnableLists.length > 0">
        <div class="divider"></div>
        <h1 class="font-semibold">Product quantity</h1>
        <div class="flex flex-col gap-2">
          <div v-for="(size, index) in sizeEnableLists" class="flex gap-3">
            <div
              class="mt-2 w-8 h-8 border-2 border-gray-100 peer-checked:border-gray-400 rounded-lg flex justify-center items-center font-semibold">
              {{ size.name }}
            </div>
            <InputTag
              title=""
              name="price"
              type="number"
              placeHolderText="Qty"
              validate-with="number"
              :immediate="true"
              v-model:value="size.remainQuantity"
              v-model:error="errMsg[index]"></InputTag>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>
