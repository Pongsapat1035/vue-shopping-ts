<script setup lang="ts">
import SellerLayout from "../../layout/SellerLayout.vue";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref, type Ref } from "vue";
import { useAdminProductStore } from "../../store/admin/product";
import InputTag from "../../components/InputTag.vue";
import ColorSelectField from "../../components/seller/product/ColorSelectField.vue";
import SizeSelectField from "../../components/seller/product/SizeSelectField.vue";
import CoverPicture from "../../components/seller/product/CoverPicture.vue";
import type { AdminProductFormData } from "../../types";

const route = useRoute();
const productStore = useAdminProductStore();

const productId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const productData: AdminProductFormData = reactive({
  coverImg: "",
  name: "",
  quantity: 0,
  price: 0,
  detail: "",
  colors: [],
  sizes: [],
});

interface InputValidate {
  name: string;
  quantity: string;
  price: string;
  description: string;
}

const inputError: InputValidate = reactive({
  name: "",
  quantity: "",
  price: "",
  description: "",
});
const checkColorState: Ref<boolean> = ref(false);
const checkSizeState: Ref<boolean> = ref(false);

onMounted(async () => {
  try {
    const response = await productStore.loadProduct(productId);
    if (response) {
      const { coverImg, name, remainQuantity, price, detail, colors, sizes } =
        response;
      productData.coverImg = coverImg;
      productData.name = name;
      productData.remainQuantity = remainQuantity;
      productData.price = price;
      productData.colors = colors;
      productData.sizes = sizes;
      productData.detail = detail;
    }
    // check if color enable
    const checkEnableColor = productData.colors.some(
      (color) => color.isCheck === true
    );
    checkColorState.value = checkEnableColor ? true : false;
    const checkEnableSize = productData.sizes.some(
      (size) => size.isCheck === true
    );
    checkSizeState.value = checkEnableSize ? true : false;
  } catch (error) {
    console.log(error);
  }
});

const handleSubmit = async () => {
  try {
    await productStore.updateProduct(productId, productData);
  } catch (error) {
    console.log("error from update doc : ", error);
  }
  console.log(productData);
};
</script>

<template>
  <SellerLayout>
    <form class="w-3/4 p-5" @submit.prevent="handleSubmit">
      <div class="flex justify-between mb-8">
        <h1 class="text-3xl font-semibold">Edit product</h1>
        <button type="submit" class="btn btn-primary">Update product</button>
      </div>
      <div class="flex flex-col gap-5">
        <CoverPicture v-model:imgUrl="productData.coverImg"></CoverPicture>
        <InputTag
          title="Product name"
          name="name"
          type="text"
          placeHolderText="name"
          v-model:value="productData.name"></InputTag>
        <!-- <div class="flex gap-5"> -->
          <!-- <div class="flex-auto">
            <InputTag
              title="Quality"
              name="quantity"
              type="number"
              placeHolderText="quantity"
              v-model:value="productData.quantity"
              v-model:error="inputError.quantity"></InputTag>
          </div> -->
          <div class="flex-auto">
            <InputTag
              title="Price"
              name="price"
              type="number"
              placeHolderText="price"
              v-model:value="productData.price"
              v-model:error="inputError.price"></InputTag>
          </div>
        <!-- </div> -->
        <fieldset class="flex flex-col gap-2">
          <legend class="font-semibold mb-2">Detail</legend>
          <div class="px-4 py-3 bg-gray-100 rounded-lg">
            <textarea
              class="bg-gray-100 rounded-lg outline-none w-full font-light"
              placeholder="detail"
              v-model="productData.detail"></textarea>
          </div>
        </fieldset>
        <div class="flex gap-5">
          <ColorSelectField
            v-model:colors="productData.colors"
            v-model:enable="checkColorState">
          </ColorSelectField>
          <SizeSelectField
            v-model:sizes="productData.sizes"
            v-model:enable="checkSizeState">
          </SizeSelectField>
        </div>
      </div>
    </form>
  </SellerLayout>
</template>
