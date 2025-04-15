<script setup lang="ts">
import UserLayout from "../layout/UserLayout.vue";
import ProductCard from "../components/client/ProductCard.vue";
import { useAuthStore } from "../store/auth";
import { useClientProductStore } from "../store/client/product";
import { onMounted, ref } from "vue";
import type { ClientProductCard } from "../types";


const productStore = useClientProductStore();
const authStore = useAuthStore();
const productLists = ref<ClientProductCard[]>([]);

const fetchProductLists = async () => {
  try {
    await authStore.checkAuth();
    const response: ClientProductCard[] = await productStore.loadHomeProduct();
    console.log("response : ", response);
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
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-10">
      <h1 class="font-bold text-5xl my-8">Product lists</h1>
      <div class="flex gap-8">
        <ProductCard
          v-for="product in productLists"
          :data="product"></ProductCard>
      </div>
      <RouterLink
        to="/user/all-product"
        class="btn btn-primary w-40 self-center"
        >View more</RouterLink
      >
    </div>
  </UserLayout>
</template>
