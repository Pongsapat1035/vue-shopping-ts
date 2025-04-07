<script setup lang="ts">
import { onMounted, ref } from "vue";
import UserLayout from "../../layout/UserLayout.vue";
import ProductColor from "../../components/client/product-detail/ProductColor.vue";
import ProductSize from "../../components/client/product-detail/ProductSize.vue";
import ProductQuantity from "../../components/client/product-detail/ProductQuantity.vue";
import ProductImg from "../../components/client/product-detail/ProductImg.vue";
import { useClientProductStore } from "../../store/client/product";
import { useRoute } from "vue-router";
import { useCartStore } from "../../store/client/cart";
import { useAuthStore } from "../../store/auth";
import { useAlertStore } from "../../store/alert";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();
const productStore = useClientProductStore();
const cartStore = useCartStore();
const route = useRoute();
const productId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

interface CheckBoxOption {
  name: string;
  isCheck: boolean;
}

interface ProductData {
  id: string;
  coverImg: string;
  name: string;
  quantity: number;
  remainQuantity: number;
  price: number;
  detail: string;
  colors: CheckBoxOption[];
  sizes: CheckBoxOption[];
}

const product = ref<ProductData>({
  id: "",
  coverImg: "",
  name: "",
  quantity: 0,
  remainQuantity: 0,
  price: 0,
  detail: "",
  colors: [],
  sizes: [],
});

onMounted(async () => {
  try {
    await productStore.loadProduct(productId);
    if (productStore.product) {
      product.value = productStore.product;
    }
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
  if (!authStore.userId) {
    router.push({ name: "auth-login" });
  }
  const target = e.target as HTMLFormElement;
  const data = new FormData(target);

  const color = data.get("color") ? String(data.get("color")) : "";
  const quantity = data.get("quantity") ? Number(data.get("quantity")) : 0;
  const size = data.get("size") ? String(data.get("size")) : "";

  if (productStore.getColor.length > 0 && !color) {
    alertStore.toggleAlert("Error", "please enter color");
    return;
  }
  if (productStore.getSize.length > 0 && !size) {
    alertStore.toggleAlert("Error", "please select size");
    return;
  }

  const productData: ProductCart = {
    id: product.value.id,
    quantity,
    color,
    size,
  };
  cartStore.addItemToCart(productData);
  console.log("add to cart : ", productData);
  alertStore.toggleAlert("success", "Add item to cart success");
};
</script>

<template>
  <UserLayout>
    <div class="w-4/5 mx-auto mt-20 flex">
      <ProductImg :coverImg="product.coverImg"></ProductImg>
      <form
        class="flex-auto w-1/2 p-8 flex flex-col gap-5"
        @submit.prevent="handleSubmit">
        <div class="flex gap-3 items-center">
          <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          <h1 class="font-semibold">Shop.name</h1>
        </div>
        <h1 class="text-3xl font-semibold">{{ product.name }}</h1>
        <p class="text-5xl">{{ product.price }}$</p>
        <ProductColor></ProductColor>
        <ProductSize></ProductSize>
        <ProductQuantity></ProductQuantity>
        <div class="flex gap-5">
          <button type="submit" class="flex-auto btn btn-primary">
            Add to cart
          </button>
          <button type="button" class="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="size-[1.2em]">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </UserLayout>
</template>
