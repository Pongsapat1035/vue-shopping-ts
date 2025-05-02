<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

import { useOrderStore } from "../../store/client/order";
import { useAuthStore } from "../../store/auth";
import { allInputIsFilled } from "../../utils/validate.method";
import { useAlertStore } from "../../store/alert";

import UserLayout from "../../layout/UserLayout.vue";
import StatusBadge from "../../components/StatusBadge.vue";
import AddressWarpper from "../../components/client/checkout/AddressWarpper.vue";
import ProductCard from "../../components/client/checkout/ProductCard.vue";
import ConfirmModal from "../../components/ConfirmModal.vue";
import LoadingScreen from "../../components/LoadingScreen.vue";


const route = useRoute();
const orderStore = useOrderStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();
const orderId: string = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;
const confirmModalState = ref<boolean>(false)
const loadingState = ref<boolean>(false)

onMounted(async () => {
  try {
    await orderStore.loadOrder(orderId);
  } catch (error) {
    console.log(error);
  }
});

const handleCancel = async () => {
  console.log('call cancel order')
  await orderStore.cancel(orderId)
}

const handlePayment = async () => {
  try {
    if (!allInputIsFilled(authStore.userInfo.addressInfo))
      throw new Error("Please set your address");
    console.log("call payment");
    loadingState.value = true
    const paymentUrl: string | null = await orderStore.payment();
    if (paymentUrl) {
      location.href = paymentUrl;
      loadingState.value = false
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      alertStore.toggleAlert("Error", error.message);
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
            :to="{ name: 'user-order' }"
            class="text-neutral-400 font-light"
            >Order lists</RouterLink
          >
        </li>
        <li>Order Detail</li>
      </ul>
    </div>
    <div class="flex flex-col gap-3 mx-auto w-2/3 mt-10">
      <ul
        class="flex-auto flex flex-col gap-3 justify-between p-5 border border-gray-200 rounded-2xl">
        <li class="flex gap-5 items-center">
          <h1 class="text-xl font-semibold">Order number :</h1>
          <span class="font-light">{{ orderId }}</span>
        </li>
        <li class="flex gap-5 items-center">
          <h1 class="text-xl font-semibold">Order date :</h1>
          <h1 class="text-lg text-neutral-500 font-light">
            {{ orderStore.orderDetail.createdDate }}
          </h1>
        </li>
        <li class="flex gap-5 items-center">
          <h1 class="text-xl font-semibold">Status :</h1>
          <StatusBadge
            v-model:type="orderStore.orderDetail.status"></StatusBadge>
        </li>
      </ul>
      <AddressWarpper
        :address="authStore.userInfo.addressInfo"></AddressWarpper>
      <div class="divider"></div>
      <div class="flex flex-col gap-5 px-5">
        <ProductCard
          v-for="product in orderStore.orderDetail.products"
          :data="product"></ProductCard>
      </div>
      <div class="divider"></div>
      <div class="flex flex-col gap-5 rounded-2xl bg-gray-100 p-10">
        <div class="flex justify-between">
          <p>Discount</p>
          <p class="font-semibold">none</p>
        </div>
        <div class="flex justify-between">
          <p>Shipping price</p>
          <p class="font-semibold">
            {{ orderStore.orderDetail.totalShippingPrice.toLocaleString() }} THB
          </p>
        </div>
        <div class="flex justify-between">
          <p>Total price</p>
          <p class="font-semibold">{{ orderStore.orderDetail.totalPrice.toLocaleString() }} THB</p>
        </div>
      </div>
      <div class="divider"></div>
      <div
        v-if="orderStore.orderDetail.status === 'Pending'"
        class="flex justify-end items-center gap-5 mt-4">
        <Button class="btn btn-neutral rounded-xl" @click="confirmModalState = true">Cancel order</Button>
        <button class="btn btn-primary rounded-xl w-30" @click="handlePayment">
          Payment
        </button>
      </div>
    </div>
    <ConfirmModal v-if="confirmModalState" title="Cancel order" description="Are you sure to cancel order ?" :action="()=> handleCancel()" :cancel="()=> confirmModalState = false"></ConfirmModal>
    <LoadingScreen v-if="loadingState" text="Processing Payment"></LoadingScreen>
  </UserLayout>
</template>
