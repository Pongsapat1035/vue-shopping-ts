<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import { useRouter } from "vue-router";

import { useAdminProductStore } from "../../store/admin/product";
import { useAlertStore } from "../../store/alert";
import type { ProductVariants, ProductInfo, ProductData } from "../../types";
import { allInputIsFilled } from "../../utils/validate.method";

import SellerLayout from "@/layout/SellerLayout.vue";
import InputTag from "@/components/InputTag.vue";
import ColorSelectField from "@/components/seller/product/ColorSelectField.vue";
import SizeSelectField from "@/components/seller/product/SizeSelectField.vue";
import CoverPicture from "@/components/seller/product/CoverPicture.vue";

const productStore = useAdminProductStore();
const alertStore = useAlertStore();
const router = useRouter();
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

interface InputValidate {
  name: string;
  price: string;
  description: string;
  quantity: string;
}

const productInfoErrMsg: InputValidate = reactive({
  name: "",
  price: "",
  description: "",
  quantity: "",
});

const productInfo: ProductInfo = reactive({
  coverImg: "",
  name: "",
  price: 0,
  description: "",
});

const variantType = ref<string>("none");
const variants = ref<ProductVariants[]>([]);
const productQty = ref<number>(0);

const loadDefaultOptions = (type: string) => {
  if (
    productStore.colorsConfig.length > 0 ||
    productStore.sizesConfig.length > 0
  ) {
    const variantsConfig =
      type === "color" ? productStore.colorsConfig : productStore.sizesConfig;
    variants.value = productStore.convertedConfig(variantsConfig);
    console.log("check variants : ", variants.value);
  }
};

const validateQuantity = () => {
  if (variantType.value !== "none") {
    const selectedVariants = variants.value.filter(
      (item) => item.enable === true
    );
    if (selectedVariants.length > 0) {
      // have selected variants
      const checkQty = (value: ProductVariants) => (value.quantity ?? 0) > 0;

      const result = selectedVariants.every(checkQty);
      if (!result) throw new Error("Quantity can less than 0");
      selectedVariants.forEach((item) => (item.remainQuantity = item.quantity));
    } else {
      throw new Error("Please select at least one variants");
    }
  } else {
    if (productInfo.price === 0) {
      throw new Error("Price can't be 0");
    }
    if (productQty.value === 0) {
      throw new Error("Quantity can be 0");
    }
  }
};

const handleSubmit = async () => {
  try {
    const checkEmptyField = allInputIsFilled(productInfo);
    if (!checkEmptyField) throw new Error("Please fill all input");

    validateQuantity();

    const totalVariantsQty = variants.value.reduce(
      (acc, currentValue) => acc + (currentValue.quantity ?? 0),
      0
    );
    const totalQty =
      variantType.value === "none" ? productQty.value : totalVariantsQty;

    const productData: ProductData = {
      productInfo,
      variantType: variantType.value,
      variants: variantType.value === "none" ? [] : variants.value,
      totalQuantity: {
        quantity: totalQty,
        remainQty: totalQty,
        usedQty: 0,
        serveQty: 0,
      },
      status: true,
    };
    await productStore.addProduct(productData);
    alertStore.toggleAlert("Success", "Create new product success !");
    router.push({ name: "seller-products" });
  } catch (error) {
    console.log("add product error : ", error);
    alertStore.toggleAlert(
      "Error",
      error instanceof Error ? error.message : String(error)
    );
  }
};

watch(
  () => variantType.value,
  () => {
    loadDefaultOptions(variantType.value);
  },
  { immediate: true }
);
</script>
<template>
  <SellerLayout>
    <form class="w-3/4 p-5" @submit.prevent="handleSubmit">
      <div class="flex justify-between mb-8">
        <h1 class="text-3xl font-semibold">Create new product</h1>
        <button type="submit" class="btn btn-primary">
          Create new product
        </button>
      </div>
      <div class="flex flex-col gap-5">
        <CoverPicture v-model:imgUrl="productInfo.coverImg"></CoverPicture>
        <div class="flex flex-col gap-5">
          <InputTag
            title="Product name"
            name="name"
            type="text"
            placeHolderText="name"
            validateWith="isNotEmpty"
            v-model:value="productInfo.name"
            v-model:error="productInfoErrMsg.name"></InputTag>
          <div class="flex gap-5">
            <div class="flex-1">
              <InputTag
                title="Price (THB)"
                name="price"
                type="number"
                placeHolderText="price"
                validateWith="number"
                v-model:value="productInfo.price"
                v-model:error="productInfoErrMsg.price"></InputTag>
            </div>
            <div v-if="variantType === 'none'" class="flex-1">
              <InputTag
                title="Quantity"
                name="quantity"
                type="number"
                placeHolderText="quantity"
                validateWith="number"
                v-model:value="productQty"
                v-model:error="productInfoErrMsg.quantity"></InputTag>
            </div>
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
        <div class="flex gap-5">
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
        <ColorSelectField
          v-if="variantType === 'color'"
          v-model:colors="variants">
        </ColorSelectField>
        <SizeSelectField
          v-else-if="variantType === 'size'"
          v-model:sizes="variants">
        </SizeSelectField>
      </div>
    </form>
  </SellerLayout>
</template>
