<script setup lang="ts">
import ProductListCart from "../../components/client/cart/ProductListCart.vue";
import UserLayout from "../../layout/UserLayout.vue";
import { useCartStore } from "../../store/client/cart";
import { watch, ref } from "vue";
import SummaryPriceWarpper from "../../components/client/cart/SummaryPriceWarpper.vue";

const cartStore = useCartStore();

interface ProductData {
  id: string;
  color?: string | null;
  size?: string | null;
  quantity: number;
  name: string;
  price: number;
  totalPrice: number;
  remainQuantity: number;
  coverImg: string;
}

const productLists = ref<ProductData[]>([]);
watch(
  () => cartStore.productLists,
  () => {
    productLists.value = [...cartStore.productLists];
  }
);

</script>

<template>
  <UserLayout>
    <div class="container mx-auto">
      <div class="flex w-3/4 gap-5 p-10 mx-auto">
        <div class="w-3/4 p-5">
          <h1 class="font-bold text-2xl">Product lists</h1>
          <div class="flex flex-col h-[600px] overflow-scroll gap-3 my-5">
            <ProductListCart
              v-for="(product, index) in productLists"
              :data="product"
              :index="index"></ProductListCart>
             
          </div>
        </div>
        <SummaryPriceWarpper></SummaryPriceWarpper>
      </div>
    </div>
  </UserLayout>
</template>
