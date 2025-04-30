<script setup lang="ts">
import type { ProductInfo, ProductVariants } from "../../../types";

import InputTag from "../../InputTag.vue";
import ColorSelectField from "./ColorSelectField.vue";
import SizeSelectField from "./SizeSelectField.vue";

interface InputValidate {
  name: string;
  price: string;
  description: string;
  quantity: string;
}

defineProps<{
  mode: string
}>()

const productInfo = defineModel<ProductInfo>("productInfo", {
  default: {
    name: "",
    price: 0,
    coverImg: "",
    description: "",
  },
});
const variantType = defineModel<string>("variantType");
const variants = defineModel<ProductVariants[]>("variants", {
  
});
const errMsg = defineModel<InputValidate>("errMsg", {
  default: {
    name: "",
    price: "",
    description: "",
    quantity: "",
  },
});

const productQuantity = defineModel<number>("productQuantity")

const radioVariantData = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "color",
    label: "Color",
  },
  {
    value: "size",
    label: "Size",
  },
];

</script>
<template>
  <div class="flex-1 flex flex-col gap-5">
    <h1 class="text-2xl font-semibold">Product info</h1>
    <InputTag
      title="Name"
      name="name"
      type="text"
      placeHolderText="name"
      validateWith="isNotEmpty"
      v-model:value="productInfo.name"
      v-model:error="errMsg.name"></InputTag>
    <div class="flex gap-5">
      <div class="flex-1">
        <InputTag
          title="Price (THB)"
          name="price"
          type="number"
          placeHolderText="price"
          validateWith="number"
          v-model:value="productInfo.price"
          v-model:error="errMsg.price"></InputTag>
      </div>
      <div v-if="variantType === 'none'" class="flex-1">
        <InputTag
          title="Quantity"
          name="quantity"
          type="number"
          placeHolderText="quantity"
          validateWith="number"
          v-model:value="productQuantity"
          v-model:error="errMsg.quantity"></InputTag>
      </div>
    </div>
    <fieldset class="flex flex-col gap-2">
      <legend class="font-semibold mb-2">Description</legend>
      <div class="px-4 py-3 bg-gray-100 rounded-lg">
        <textarea
          class="bg-gray-100 rounded-lg outline-none w-full font-light"
          placeholder="detail"
          v-model="productInfo.description"></textarea>
      </div>
    </fieldset>
    <div v-if="mode === 'create'" class="flex gap-5">
      <h1 class="font-semibold">Variant</h1>
      <div class="flex gap-4">
        <label
          v-for="item in radioVariantData"
          class="text-neutral-500 text-sm">
          <input
            type="radio"
            name="radio-1"
            class="radio text-black"
            :value="item.value"
            v-model="variantType" />
          {{ item.label }}
        </label>
      </div>
    </div>
    <div v-else-if="mode ==='edit' && variantType !=='none'">
      <h1 class="text-2xl font-semibold">Variants quantity</h1>
    </div>
    <ColorSelectField v-if="variantType === 'color'" v-model:colors="variants">
    </ColorSelectField>
    <SizeSelectField
      v-else-if="variantType === 'size'"
      v-model:sizes="variants">
    </SizeSelectField>
  </div>
</template>
