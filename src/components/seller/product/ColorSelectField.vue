<script setup lang="ts">
import { watch, ref } from "vue";
import type { ProductVariants } from "../../../types";

import InputTag from "../../InputTag.vue";

const colors = defineModel<ProductVariants[]>("colors", {
  default: () => [{ enable: false, name: "", remainQuantity: 0 }],
});

const colorEnableLists = ref<ProductVariants[]>([]);
const errMsg = ref<string[]>([])

watch(
  () => colors,
  () => {
    colorEnableLists.value = colors.value.filter(
      (color) => color.enable === true
    );
  },
  { deep: true, immediate: true }
);
</script>
<template>
  <fieldset
    class="fieldset flex-auto flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-full">
    <legend class="fieldset-legend">Colors</legend>
    <div  class="flex flex-col gap-2">
      <div class="flex gap-2 flex-wrap">
        <label v-for="color in colors" class="w-8 h-8 relative">
          <input
            type="checkbox"
            class="w-0 h-0 opacity-0 absolute peer"
            v-model="color.enable" />
          <div
            class="w-full h-full opacity-30 border-white peer-checked:opacity-100 rounded-lg"
            :style="{ backgroundColor: color.name }"></div>
        </label>
      </div>
      <div v-if="colorEnableLists.length > 0">
        <div class="divider"></div>
        <h1 class="font-semibold">Product quantity</h1>
        <div class="flex flex-col gap-2">
          <div
            v-for="(color, index) in colorEnableLists"
            class="flex gap-3">
            <div
              class="rounded-md w-8 h-8 mt-2"
              :style="{ backgroundColor: color.name }"></div>
            <InputTag
              title=""
              name="price"
              type="number"
              placeHolderText="Qty"
              validate-with="number"
              :immediate="true"
              v-model:value="color.remainQuantity"
              v-model:error="errMsg[index]"></InputTag>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>
