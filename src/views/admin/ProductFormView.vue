<script setup lang="ts">
import { reactive, watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAdminProductStore } from "../../store/admin/product";
import { useAlertStore } from "../../store/alert";
import type { ProductVariants, ProductInfo, ProductData } from "../../types";
import { allInputIsFilled, allErrorEmpty } from "../../utils/validate.method";

import ProductForm from "../../components/seller/product/ProductForm.vue";
import SellerLayout from "@/layout/SellerLayout.vue";
import CoverPicture from "@/components/seller/product/CoverPicture.vue";

interface InputValidate {
  name: string;
  price: string;
  description: string;
  quantity: string;
}

const productStore = useAdminProductStore();
const alertStore = useAlertStore();
const router = useRouter();
const route = useRoute();

const productId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const formMode = ref<string>("create");

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

type VariantConfig = { size: ProductVariants[]; color: ProductVariants[] };
const variantConfig = reactive<VariantConfig>({
  size: [],
  color: [],
});

const variantType = ref<string>("none");
const variants = ref<ProductVariants[]>([]);
const productQty = ref<number>(0);

const validateQuantity = () => {
  if (variantType.value !== "none") {
    variants.value.forEach((item) => {
      if (!item.enable) {
        item.remainQuantity = 0;
      }
    });

    const enabledVariants = variants.value.filter(
      (item) => item.enable === true
    );
    console.log("check enabled variants : ", enabledVariants);
    if (enabledVariants.length <= 0)
      throw new Error("Please select at least one variants");

    const checkQty = (value: ProductVariants) =>
      (value.remainQuantity ?? 0) > 0;

    const result = enabledVariants.every(checkQty);
    if (!result) throw new Error("Quantity can less than 0");

    const totalQuantity = enabledVariants.reduce(
      (acc, currentValue) => currentValue.remainQuantity + acc,
      0
    );
    productQty.value = totalQuantity;
    productInfoErrMsg.quantity = "";
  } else {
    if (productQty.value <= 0) {
      throw new Error("Quantity can't less or eual 0");
    }
  }

  const result = allErrorEmpty(productInfoErrMsg);
  if (!result) throw new Error("input is invalid please check input again");
};

const validation = () => {
  // check all input is field
  const productImg = productInfo.coverImg;
  if (productImg === "") throw new Error("Please add product image");

  const checkEmptyField = allInputIsFilled(productInfo);
  if (!checkEmptyField) throw new Error("Please fill all input");

  const checkPrice = productInfo.price !== 0;
  if (!checkPrice) throw new Error("Price can't be 0");

  validateQuantity();
};

const handleSubmit = async () => {
  try {
    validation();

    const productData: ProductData = {
      productInfo,
      variantType: variantType.value,
      variants: variantType.value === "none" ? [] : variants.value,
      totalQuantity: {
        remainQty: productQty.value,
        soldQty: 0,
        serveQty: 0,
      },
      status: true,
    };
    console.log("check product data : ", productData);
    if (formMode.value === "create") {
      await productStore.addProduct(productData);
    } else {
      await productStore.updateProduct(productId, productData);
    }

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

const loadDefaultOptions = async () => {
  await productStore.loadConfig();
  if (
    productStore.colorsConfig.length > 0 ||
    productStore.sizesConfig.length > 0
  ) {
    variantConfig.color = productStore.convertedConfig(
      productStore.colorsConfig
    );
    variantConfig.size = productStore.convertedConfig(productStore.sizesConfig);
  }
};

watch(
  () => variantType.value,
  () => {
    const type = variantType.value;
    if (type === "size" || type === "color")
      variants.value = variantConfig[type];
  }
);

const fetchProduct = async (productId: string) => {
  try {
    const response = await productStore.loadProduct(productId);
    Object.assign(productInfo, response?.productInfo);
    variantType.value = response?.variantType ?? "";

    if (variantType.value === "size" || variantType.value === "color") {
      variantConfig[variantType.value] = response?.variants ?? [];
    }

    productQty.value = response?.totalQuantity?.remainQty ?? 0;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadDefaultOptions();

  if (productId) {
    formMode.value = "edit";
    fetchProduct(productId);
  }
});
</script>
<template>
  <SellerLayout>
    <form class="p-5" @submit.prevent="handleSubmit">
      <div class="flex justify-between mb-8">
        <h1 class="text-3xl font-semibold">
          {{ formMode === "create" ? "Create new product" : "Edit product" }}
        </h1>
        <button type="submit" class="btn btn-primary">
          {{ formMode === "create" ? "Create product" : "Update product" }}
        </button>
      </div>
      <div class="flex gap-5 p-5">
        <div class="flex-1 p-5 h-[650px]">
          <CoverPicture v-model:imgUrl="productInfo.coverImg"></CoverPicture>
        </div>
        <ProductForm
          v-model:productInfo="productInfo"
          v-model:errMsg="productInfoErrMsg"
          v-model:variantType="variantType"
          v-model:variants="variants"
          v-model:productQuantity="productQty"
          :mode="formMode"></ProductForm>
      </div>
    </form>
  </SellerLayout>
</template>
