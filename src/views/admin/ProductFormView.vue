<script setup lang="ts">
import { reactive, watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { v4 as uuidv4 } from 'uuid';
import { useAdminProductStore } from "../../store/admin/product";
import { useAlertStore } from "../../store/alert";
import type {
  ProductVariants,
  ProductInfo,
  ProductFormData,
} from "../../types";
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
const productUuid = ref<string>("")

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

    const productData: ProductFormData = {
      productInfo,
      variantType: variantType.value,
      variants: variantType.value === "none" ? [] : variants.value,
      quantity: productQty.value,
    };

    if (formMode.value === "create") {
      await productStore.addProduct(productUuid.value, productData);
    } else {
      await productStore.updateProduct(productId, productData);
    }
    const successMsg =
      formMode.value === "create"
        ? "Create new product success"
        : "Update product success";
    alertStore.toggleAlert("Success", successMsg);
    router.push({ name: "admin-products" });
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
  

  if (productId) {
    formMode.value = "edit";
    fetchProduct(productId);
  } else {
    loadDefaultOptions();
    productUuid.value = uuidv4()
  }

});
</script>
<template>
  <SellerLayout>
    <form class="p-5 mb-20 sm:mb-0" @submit.prevent="handleSubmit">
      <div class="flex items-center justify-between mb-8">
        <RouterLink
          :to="{ name: 'admin-products' }"
          class="hidden sm:block text-3xl font-semibold">
          {{ formMode === "create" ? "Create new product" : "Edit product" }}
        </RouterLink>
        <RouterLink
          class="block sm:hidden text-sm text-neutral-500 underline"
          :to="{ name: 'admin-products' }">Back</RouterLink>
        <button type="submit" class="btn btn-primary">
          {{ formMode === "create" ? "Create product" : "Update product" }}
        </button>
      </div>
      <div class="flex flex-col lg:flex-row gap-5 sm:p-5">
        <div class="flex-1 p-5 h-[650px] min-h-[500px]">
          <CoverPicture :productId="productUuid" v-model:imgUrl="productInfo.coverImg"></CoverPicture>
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
