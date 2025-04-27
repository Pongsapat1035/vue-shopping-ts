<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ProductCardData } from "../types";

import { useAuthStore } from "../store/auth";
import { useClientProductStore } from "../store/client/product";

import HeroSection from "@/components/HeroSection.vue";
import UserLayout from "@/layout/UserLayout.vue";
import ProductCard from "@/components/client/ProductCard.vue";

const productStore = useClientProductStore();
const authStore = useAuthStore();
const productLists = ref<ProductCardData[]>([]);

const fetchProductLists = async () => {
  try {
    await authStore.checkAuth();
    const response: ProductCardData[] = await productStore.loadHomeProduct();
    productLists.value = response;
  } catch (error) {
    console.log("error : ", error);
  }
};

onMounted(async () => {
  await fetchProductLists();
});

</script>
<template>
  <UserLayout>
    <HeroSection></HeroSection>
    <div class="flex flex-col gap-10">
      <h1 class="font-bold text-5xl my-8">Product lists</h1>
      <div class="flex gap-8">
        <ProductCard
          v-for="product in productLists"
          :data="product"></ProductCard>
      </div>
      <RouterLink
        to="/user/all-product"
        class="btn btn-neutral w-40 self-center"
        >View more</RouterLink
      >
    </div>
  </UserLayout>
</template>
