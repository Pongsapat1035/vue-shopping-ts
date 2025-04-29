<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

import { useAdminProductStore } from "../../store/admin/product";
import type { ProductData } from "../../types";

import SellerLayout from "../../layout/SellerLayout.vue";
import InputTag from "../../components/InputTag.vue";
import ColorSelectField from "../../components/seller/product/ColorSelectField.vue";
import SizeSelectField from "../../components/seller/product/SizeSelectField.vue";
import CoverPicture from "../../components/seller/product/CoverPicture.vue";
import QuantityEdit from "../../components/seller/product/QuantityEdit.vue";

const route = useRoute();
const productStore = useAdminProductStore();

const productId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const productData: ProductData = reactive({
  productInfo: {
    name: "",
    price: 0,
    description: "",
    coverImg: "",
  },
  status: true,
  variantType: "",
  variants: [],
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
// const checkColorState: Ref<boolean> = ref(false);
// const checkSizeState: Ref<boolean> = ref(false);

onMounted(async () => {
  try {
    const response = (await productStore.loadProduct(productId)) as ProductData;
    Object.assign(productData, response);
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
    <form class="p-5" @submit.prevent="handleSubmit">
      <div class="flex justify-between mb-8">
        <h1 class="text-3xl font-semibold">Edit product</h1>
        <button type="submit" class="btn btn-primary">Update product</button>
      </div>
      <div class="flex gap-5">
        <div class="flex-1 p-5 h-[650px]">
          <CoverPicture
            v-model:imgUrl="productData.productInfo.coverImg"></CoverPicture>
        </div>
        <div class="flex-1 flex flex-col gap-5">
          <h1 class="text-2xl font-semibold">Product Info</h1>
          <InputTag
            title="Name"
            name="name"
            type="text"
            placeHolderText="name"
            v-model:value="productData.productInfo.name"></InputTag>
          <div class="flex gap-5">
            <div class="flex-1">
              <InputTag
                title="Price (THB)"
                name="price"
                type="number"
                placeHolderText="price"
                validateWith="number"
                v-model:value="productData.productInfo.price"></InputTag>
            </div>
           
          </div>
          <div v-if="productData.variantType === 'none'" class="flex flex-col gap-3">
              <h1 class="font-semibold ">Quantity</h1>
              <QuantityEdit :quantity="1"></QuantityEdit>
            </div>
          <fieldset class="flex flex-col gap-2">
            <legend class="font-semibold mb-2">Detail</legend>
            <div class="px-4 py-3 bg-gray-100 rounded-lg">
              <textarea
                class="bg-gray-100 rounded-lg outline-none w-full font-light"
                placeholder="detail"
                v-model="productData.productInfo.description"></textarea>
            </div>
          </fieldset>
          <div
            v-if="productData.variantType !== 'none'"
            class="flex flex-col gap-5">
            <h1 class="text-2xl font-semibold">Product quantity</h1>
            <div class="border border-neutral-200 rounded-2xl p-5">
              {{ productData.variantType }}
            </div>
          </div>
        </div>

        <!-- </div> -->

        <!-- <div class="flex gap-5">
          <ColorSelectField
            v-model:colors="productData.colors"
            v-model:enable="checkColorState">
          </ColorSelectField>
          <SizeSelectField
            v-model:sizes="productData.sizes"
            v-model:enable="checkSizeState">
          </SizeSelectField>
        </div> -->
      </div>
    </form>
  </SellerLayout>
</template>
