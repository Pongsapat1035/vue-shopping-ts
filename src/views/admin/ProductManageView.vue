<script setup lang="ts">
import { RouterLink } from "vue-router";
import { onMounted } from "vue";

import { useAdminProductStore } from "../../store/admin/product";

import SellerLayout from "@/layout/SellerLayout.vue";
import ProductList from "@/components/seller/product/ProductList.vue";
import ProductCard from "../../components/seller/product/ProductCard.vue";

const productStore = useAdminProductStore();

onMounted(async () => {
  await productStore.loadAllProducts();
});
</script>
<template>
  <SellerLayout>
    <div
      class="h-full w-full flex flex-col gap-10 p-5  pb-25 overflow-scroll mb-25 sm:mb-0">
      <div class="flex-0">
        <div class="flex justify-end sm:justify-between">
          <h1 class="hidden sm:block text-2xl md:text-3xl font-semibold">
            Product management
          </h1>
          <RouterLink to="/admin/product/add" class="btn btn-primary"
            >Add new Product</RouterLink
          >
        </div>
      </div>
      <ul
        class="hidden sm:block flex-1 basis-60 list bg-base-100 rounded-box shadow-md">
        <li class="grid list-row grid-cols-6">
          <div class="text-xs uppercase font-semibold"></div>
          <div class="text-xs uppercase font-semibold">Name</div>
          <div class="text-xs uppercase font-semibold">Quantity</div>
          <div class="text-xs uppercase font-semibold">Stock</div>
          <div class="text-xs uppercase font-semibold">Status</div>
          <div class="text-xs uppercase font-semibold"></div>
        </li>
        <div
          v-if="productStore.isLoading"
          class="py-5 px-20 flex flex-col gap-8">
          <div v-for="_ in 8" class="w-full flex gap-8">
            <div class="skeleton rounded-full w-20 h-20"></div>
            <div class="skeleton w-full h-15"></div>
          </div>
        </div>
        <div v-else>
          <ProductList
            v-if="productStore.productLists.length > 0"
            v-for="product in productStore.productLists"
            :data="product"></ProductList>
          <div v-else class="flex justify-center items-center h-full w-full">
            No products found. Add a new product to get started.
          </div>
        </div>
      </ul>
      <div
        v-if="productStore.isLoading"
        class="flex sm:hidden flex-col gap-4 p-5">
        <div v-for="_ in 4" class="skeleton w-full h-40"></div>
      </div>
      <div v-else class="flex sm:hidden flex-col gap-4">
        <ProductCard
          v-if="productStore.productLists.length > 0"
          v-for="product in productStore.productLists"
          :data="product">
        </ProductCard>
        <div
          v-else
          class="flex justify-center items-center h-full w-full border-dashed border-2 rounded-lg p-8 border-neutral-300 text-neutral-500 text-center">
          No products found. Add a new product to get started.
        </div>
      </div>
    </div>
  </SellerLayout>
</template>
