<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useCartStore } from "../../../store/client/cart";
import { useSellerProductStore } from "../../../store/seller/product";
const cartStore = useCartStore();
const productStore = useSellerProductStore();
interface Product {
  id: string;
  color?: string | null;
  size?: string | null;
  quantity: number | null;
}
const props = defineProps<{
  data: Product;
  index: number;
}>();
interface ProductData extends Product {
  coverImg: string;
  name: string;
  remainQuantity: number;
  price: number;
}
const productData = reactive<ProductData>({
  name: "",
  price: 0,
  remainQuantity: 0,
  coverImg: "",
  id: "",
  quantity: 0,
});
onMounted(async () => {
  try {
    const product = await productStore.loadProduct(props.data.id);
    if (product) {
      const { coverImg, name, remainQuantity, price } = product;
      productData.coverImg = coverImg;
      productData.name = name;
      productData.remainQuantity = remainQuantity;
      productData.price = price;
      productData.color = props.data.color;
      productData.size = props.data.size;
      productData.quantity = props.data.quantity;
    }
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="flex gap-5 h-40">
    <div class="w-1/3 h-full">
      <img :src="productData.coverImg" class="w-full h-full rounded-lg" />
    </div>
    <div class="flex flex-col flex-auto p-2">
      <h1 class="font-semibold text-xl">{{ productData.name }}</h1>
      <div class="flex-auto">
        <p>{{ productData.color }} {{ productData.size }}</p>
      </div>
      <div class="flex gap-5 justify-between items-center">
        <span>Quality : {{ productData.quantity }}</span>
        <span>Price : {{ productData.price }}$</span>
        <button class="btn btn-error" @click="cartStore.removeCart(index)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
