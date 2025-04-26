<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useClientProductStore } from "../../store/client/product";
import { useCartStore } from "../../store/client/cart";
import { useAuthStore } from "../../store/auth";
import { useAlertStore } from "../../store/alert";

import UserLayout from "@/layout/UserLayout.vue";
import ProductColor from "@/components/client/product-detail/ProductColor.vue";
import ProductSize from "@/components/client/product-detail/ProductSize.vue";
import ProductQuantity from "@/components/client/product-detail/ProductQuantity.vue";
import ProductImg from "@/components/client/product-detail/ProductImg.vue";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const productStore = useClientProductStore();
const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();

const productId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

onMounted(async () => {
  try {
    await productStore.loadProduct(productId);
  } catch (error) {
    console.log(error);
  }
});

interface ProductCart {
  id: string;
  quantity: number | 0;
  color: string | "";
  size: string | "";
}

const handleSubmit = (e: Event) => {
  if (!authStore.userId) router.push({ name: "auth-login" });

  try {
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);

    const color = data.get("color") ? String(data.get("color")) : "";
    const quantity = data.get("quantity") ? Number(data.get("quantity")) : 0;
    const size = data.get("size") ? String(data.get("size")) : "";

    // check size and color option
    if (productStore.getColor.length > 0 && !color)
      throw new Error("please select color");
    if (productStore.getSize.length > 0 && !size)
      throw new Error("please select size");

    const productData: ProductCart = {
      id: productStore.product.id,
      quantity,
      color,
      size,
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
</script>

<template>
  <UserLayout>
    <div class="breadcrumbs text-md px-7 my-5">
      <ul>
        <li>
          <RouterLink
            :to="{ name: 'user-products' }"
            class="text-neutral-400 font-light"
            >Product lists</RouterLink
          >
        </li>
        <li>{{ productStore.product.name }}</li>
      </ul>
    </div>
    <div class="w-4/5 mx-auto mt-10 flex h-[600px]">
      <ProductImg :coverImg="productStore.product.coverImg"></ProductImg>
      <form
        class="flex-auto w-1/2 p-8 flex flex-col gap-5"
        @submit.prevent="handleSubmit">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-semibold">
            {{ productStore.product.name }}
          </h1>
          <div
            v-if="productStore.product.remainQuantity === 0"
            class="bg-red-200 rounded-2xl py-1 px-2 text-sm text-red-800 font-semibold h-max">
            Out of stock
          </div>
        </div>
        <p class="text-5xl">{{ productStore.product.price }}$</p>
        <ProductColor></ProductColor>
        <ProductSize></ProductSize>
        <ProductQuantity
          v-if="productStore.product.remainQuantity !== 0"></ProductQuantity>
        <div class="flex gap-5">
          <button
            type="submit"
            class="flex-auto btn btn-primary"
            :disabled="productStore.product.remainQuantity === 0">
            Add to cart
          </button>
        </div>
        <div class="rounded-xl bg-neutral-100/70 p-5 mt-2">
          <h1 class="font-semibold text-xl">Description</h1>
          <div class="divider"></div>
          <p class="font-light text-neutral-500">
            {{ productStore.product.detail }}
          </p>
        </div>
      </form>
    </div>
  </UserLayout>
</template>
