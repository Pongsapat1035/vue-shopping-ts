<script setup lang="ts">
import { RouterLink } from "vue-router";
import ProductListCart from "../../components/client/cart/ProductListCart.vue";
import UserLayout from "../../layout/UserLayout.vue";
import { useCartStore } from "../../store/client/cart";
import { useAlertStore } from "../../store/alert";
import { useRouter } from "vue-router";
import { watch, ref } from "vue";

const cartStore = useCartStore();
const alertStore = useAlertStore()
const router = useRouter()

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

const handleSubmit = async () => {
  try{
    const orderId:string = await cartStore.createOrder()
    alertStore.toggleAlert("success", "Create order success !")
    router.push({ name: 'user-checkout', params:{ id: orderId } })
  } catch(error){
    console.log(error)
  }
  
};
</script>

<template>
  <UserLayout>
    <div class="container mx-auto">
      <div class="flex w-3/4 p-10 mx-auto">
        <div class="w-3/4 p-5">
          <h1 class="font-bold text-2xl">Product lists</h1>
          <div class="flex flex-col gap-5 my-5">
            <ProductListCart
              v-for="(product, index) in productLists"
              :data="product"
              :index="index"></ProductListCart>
          </div>
        </div>
        <div class="w-2/4 p-5">
          <h1 class="font-bold text-2xl">Summary</h1>
          <div class="flex flex-col gap-4 mt-5">
            <div class="flex justify-between">
              <p>price</p>
              <p>{{ cartStore.getTotalProductPrice }}$</p>
            </div>
            <div class="flex justify-between">
              <p>
                Shipping price ( per product : {{ cartStore.shippingPrice }}$ )
              </p>
              <p>{{ cartStore.getTotalShipping }}$</p>
            </div>
            <div class="flex justify-between">
              <p>Total price</p>
              <p>{{ cartStore.getTotalPrice }}$</p>
            </div>
            <Button @click="handleSubmit" class="btn btn-primary"
              >Checkout</Button
            >
            <RouterLink to="/" class="btn">Shopping more</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
