<script setup lang="ts">
import SellerLayout from "../../layout/SellerLayout.vue";
import InputTag from "../../components/InputTag.vue";
import ColorSelectField from "../../components/seller/product/ColorSelectField.vue";
import SizeSelectField from "../../components/seller/product/SizeSelectField.vue";
import CoverPicture from "../../components/seller/product/CoverPicture.vue";

import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useSellerProductStore } from "../../store/seller/product";
import { ref, type Ref } from "vue";

const productStore = useSellerProductStore();
const router = useRouter();

type CheckBoxOption = { name: string; isCheck: boolean };

interface FormData {
  coverImg: string;
  name: string;
  quantity: number;
  price: number;
  detail: string;
  colors: CheckBoxOption[];
  sizes: CheckBoxOption[];
}

interface InputValidate {
  name: string;
  quantity: string;
  price: string;
  description: string;
}

const colorLists: Ref<CheckBoxOption[]> = ref([]);
const sizeLists: Ref<CheckBoxOption[]> = ref([]);

watch(
  () => productStore.colorsConfig,
  () => {
    const colorsConfig = productStore.colorsConfig;
    const convertColors = colorsConfig.map((color) => ({
      name: color,
      isCheck: false,
    }));
    colorLists.value = convertColors;

    const sizesConfig = productStore.sizesConfig;
    const convertSizes = sizesConfig.map((size) => ({
      name: size,
      isCheck: false,
    }));
    sizeLists.value = convertSizes;
  },
  { immediate: true }
);

const inputError: InputValidate = reactive({
  name: "",
  quantity: "",
  price: "",
  description: "",
});

const formData: FormData = reactive({
  coverImg: "",
  name: "",
  quantity: 0,
  price: 0,
  detail: "",
  colors: colorLists,
  sizes: sizeLists,
});

const handleSubmit = async () => {
  console.log(formData);

  try {
    const validateInput =
      inputError.name ||
      inputError.quantity ||
      inputError.price ||
      inputError.description;
    if (validateInput) {
      throw new Error("input error ");
    }

    await productStore.addProduct(formData);
    router.push({ name: "seller-products" });
    alert("create product success !");
  } catch (error) {
    console.log("error : ", error);
  }
};
const checkColorState: Ref<boolean> = ref(false);
const checkSizeState: Ref<boolean> = ref(false);
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
        <CoverPicture v-model:imgUrl="formData.coverImg"></CoverPicture>
        <InputTag
          title="Product name"
          name="name"
          type="text"
          placeHolderText="name"
          v-model:value="formData.name"></InputTag>
        <div class="flex gap-5">
          <div class="flex-auto">
            <InputTag
              title="Quality"
              name="quantity"
              type="number"
              placeHolderText="quantity"
              v-model:value="formData.quantity"
              v-model:error="inputError.quantity"></InputTag>
          </div>
          <div class="flex-auto">
            <InputTag
              title="Price"
              name="price"
              type="number"
              placeHolderText="price"
              v-model:value="formData.price"
              v-model:error="inputError.price"></InputTag>
          </div>
        </div>
        <fieldset class="flex flex-col gap-2">
          <legend class="font-semibold mb-2">Detail</legend>
          <div class="px-4 py-3 bg-gray-100 rounded-lg">
            <textarea
              class="bg-gray-100 rounded-lg outline-none w-full font-light"
              placeholder="detail"
              v-model="formData.detail"></textarea>
          </div>
        </fieldset>
        <div class="flex gap-5">
          <ColorSelectField
            v-model:colors="formData.colors"
            v-model:enable="checkColorState">
          </ColorSelectField>
          <SizeSelectField
            v-model:sizes="formData.sizes"
            v-model:enable="checkSizeState"></SizeSelectField>
        </div>
      </div>
    </form>
  </SellerLayout>
</template>
