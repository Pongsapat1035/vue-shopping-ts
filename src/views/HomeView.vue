<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useAuthStore } from "../store/auth";
import { useClientProductStore } from "../store/client/product";
import type { ProductCardData } from "../types";

import HeroSection from "@/components/HeroSection.vue";
import UserLayout from "@/layout/UserLayout.vue";
import ProductCard from "@/components/client/ProductCard.vue";

const productStore = useClientProductStore();
const authStore = useAuthStore();
const productLists = ref<ProductCardData[]>([])

const fetchProductLists = async () => {
  try {
    const productLimit = 4
    await authStore.checkAuth();
    const response = await productStore.loadHomeProducts(productLimit);
    if(response.length > 0){
      productLists.value = response
    }
    console.log('loaded product : ', response)
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
    <div class="flex flex-col gap-10 px-4 md:px-0">
      <h1 class="font-bold text-5xl my-8">Product lists</h1>
      <div class="flex gap-8 overflow-scroll">
        <ProductCard v-if="!productStore.isLoading"
          v-for="product in productLists"
          :data="product"></ProductCard>
          <div v-else
            v-if="productStore.isLoading"
            v-for="_ in 4"
            class="skeleton h-120 w-full"></div>
      </div>
      <RouterLink
        to="/user/all-product"
        class="btn btn-neutral w-40 self-center"
        >View more</RouterLink
      >
    </div>
  </UserLayout>
</template>
