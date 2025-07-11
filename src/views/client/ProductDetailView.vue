<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useClientProductStore } from "../../store/client/product";
import { useCartStore } from "../../store/client/cart";
import { useAuthStore } from "../../store/auth";
import { useAlertStore } from "../../store/alert";
import type { ProductCart } from "../../types";

import UserLayout from "@/layout/UserLayout.vue";
import ProductQuantity from "@/components/client/product-detail/ProductQuantity.vue";
import ProductImg from "@/components/client/product-detail/ProductImg.vue";
import VariantSelect from "../../components/client/product-detail/VariantSelect.vue";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const productStore = useClientProductStore();
const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();

const productId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const productRemainQty = ref<number>(0);
const selectedVariant = ref<string>("");

onMounted(async () => {
  try {
    await productStore.loadProduct(productId);
    productRemainQty.value = productStore.product.totalQuantity?.remainQty ?? 0;
  } catch (error) {
    console.log(error);
  }
});

const handleSubmit = (e: Event) => {
  if (!authStore.userId) {
    alertStore.toggleAlert(
      "Warning",
      "Please login before add product to cart"
    );
    router.push({ name: "auth" });
    return;
  }
  try {
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);
    const variant = data.get("variant") ? String(data.get("variant")) : "";
    const quantity = data.get("quantity") ? Number(data.get("quantity")) : 0;

    // check size and color option
    if (!selectedVariant.value && productStore.product.variantType !== "none")
      throw new Error(`please select ${productStore.product.variantType}`);

    const productData: ProductCart = {
      id: productId,
      quantity,
      variant,
      variantType: productStore.product.variantType,
    };
    cartStore.addItemToCart(productData);
    alertStore.toggleAlert("Success", "Add item to cart success");
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      const errMsg = error.message;
      const checkWarningMessage =
        errMsg === "please select color" || errMsg === "please select size";
      alertStore.toggleAlert(checkWarningMessage ? "Warning" : "Error", errMsg);
    }
  }
};

const findQuantity = (variant: string) => {
  const variants = productStore.product.variants;
  if (variants) {
    const selectedIndex = variants.findIndex((item) => item.name === variant);
    if (selectedIndex !== -1) {
      productRemainQty.value = Number(variants[selectedIndex].remainQuantity);
    }
  }
};

watch(
  () => selectedVariant.value,
  () => {
    const selectedValue = selectedVariant.value;
    findQuantity(selectedValue);
  }
);
</script>

<template>
  <UserLayout>
    <div class="breadcrumbs text-md px-7 my-5 ">
      <ul>
        <li>
          <RouterLink
            :to="{ name: 'user-products' }"
            class="text-neutral-400 font-light"
            >Product lists</RouterLink
          >
        </li>
        <li class="text-clip">{{ productStore.product.productInfo.name }}</li>
      </ul>
    </div>
    <div
      class="w-4/5 mx-auto mt-10 flex flex-col items-center lg:flex-row lg:h-[600px]">
      <div
        v-if="productStore.isLoading"
        class="skeleton w-full md:w-3/4 lg:w-1/2 h-full"></div>
      <ProductImg
        v-else
        :coverImg="productStore.product.productInfo.coverImg"></ProductImg>
      <div
        v-if="productStore.isLoading"
        class="flex flex-col gap-6 w-full lg:w-1/2 h-full p-5">
        <div class="skeleton h-8 w-1/3"></div>
        <div class="skeleton h-8 w-1/4"></div>
        <div class="skeleton h-8 w-1/4"></div>
        <div class="skeleton h-20 w-2/4"></div>

        <div class="skeleton h-8 w-3/4"></div>
        <div class="skeleton h-20 w-full"></div>
      </div>
      <form
        v-else
        class="flex-auto w-full lg:w-1/2 p-4 md:p-8 flex flex-col gap-5"
        @submit.prevent="handleSubmit">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-semibold w-full break-words">
            {{ productStore.product.productInfo.name }}
          </h1>
          <div
            v-if="productStore.product.totalQuantity?.remainQty === 0"
            class="bg-red-200 rounded-2xl py-1 px-2 text-sm text-red-800 font-semibold h-max">
            Out of stock
          </div>
        </div>
        <p class="text-5xl">
          {{ productStore.product.productInfo.price.toLocaleString() }} ฿
        </p>
        <VariantSelect
          v-if="productStore.product.variantType !== 'none'"
          v-model:value="selectedVariant"></VariantSelect>
        <ProductQuantity :maxQuantity="productRemainQty"></ProductQuantity>
        <div class="flex gap-5">
          <button
            type="submit"
            class="flex-auto btn btn-primary"
            :disabled="productStore.product.totalQuantity?.remainQty === 0">
            Add to cart
          </button>
        </div>
        <div class="rounded-xl bg-neutral-100/70 p-5 mt-2">
          <h1 class="font-semibold text-xl">Description</h1>
          <hr class="w-full text-neutral-200 my-4"></hr>
          <p class="font-light text-neutral-500">
            {{ productStore.product.productInfo.description }}
          </p>
        </div>
      </form>
    </div>
  </UserLayout>
</template>
