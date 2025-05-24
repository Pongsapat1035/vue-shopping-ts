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
    <div class="h-full flex flex-col gap-10  sm:p-5 overflow-scroll mb-25 sm:mb-0">
      <div class="flex-0">
        <div class="flex justify-end sm:justify-between">
          <h1 class="hidden sm:block text-2xl md:text-3xl font-semibold">Product management</h1>
          <RouterLink to="/admin/product/add" class="btn btn-primary"
            >Add new Product</RouterLink
          >
        </div>
      </div>
      <ul class="hidden sm:block flex-1 basis-60 list bg-base-100 rounded-box shadow-md">
        <li class="grid list-row grid-cols-6">
          <div class="text-xs uppercase font-semibold"></div>
          <div class="text-xs uppercase font-semibold">Name</div>
          <div class="text-xs uppercase font-semibold">Quantity</div>
          <div class="text-xs uppercase font-semibold">Stock</div>
          <div class="text-xs uppercase font-semibold">Status</div>
          <div class="text-xs uppercase font-semibold"></div>
        </li>
        <ProductList
          v-if="productStore.productLists.length > 0"
          v-for="product in productStore.productLists"
          :data="product"></ProductList>
        <div v-else class="flex justify-center items-center h-full w-full">
          No products found. Add a new product to get started.
        </div>
      </ul>
      <div class="flex sm:hidden  flex-col gap-4">
        <ProductCard
          v-if="productStore.productLists.length > 0"
          v-for="product in productStore.productLists" :data="product">
        </ProductCard>
          <div v-else class="flex justify-center items-center h-full w-full">
            No products found. Add a new product to get started.
          </div>
      </div>
    </div>
  </SellerLayout>
</template>
