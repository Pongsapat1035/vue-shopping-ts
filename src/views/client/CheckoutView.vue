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
const confirmModalState = ref<boolean>(false);
const loadingState = ref<boolean>(false);

onMounted(async () => {
  try {
    await orderStore.loadOrder(orderId);
  } catch (error) {
    console.log(error);
  }
});

const handleCancel = async () => {
  await orderStore.cancel(orderId);
  window.location.reload();
};

const handlePayment = async () => {
  try {
    if (!allInputIsFilled(authStore.userInfo.addressInfo))
      throw new Error("Please set your address");
    loadingState.value = true;
    const paymentUrl: string | null = await orderStore.payment();
    if (paymentUrl) {
      location.href = paymentUrl;
      loadingState.value = false;
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
            :to="{ name: 'user-order-auth' }"
            class="text-neutral-400 font-light"
            >Order lists</RouterLink
          >
        </li>
        <li>Order Detail</li>
      </ul>
    </div>
    <div class="flex flex-col gap-3 mx-auto p-5 sm:w-2/3 sm:mt-10">
      <div
        v-if="orderStore.isLoading"
        class="flex flex-col gap-3 p-5 border border-gray-200 rounded-2xl">
        <div class="skeleton h-8 w-2/3"></div>
        <div class="skeleton h-8 w-1/3"></div>
        <div class="skeleton h-8 w-1/3"></div>
      </div>
      <ul
        v-else
        class="flex-auto flex flex-col gap-3 justify-between p-5 border border-gray-200 rounded-2xl">
        <li class="flex gap-5 items-center">
          <h1 class="text-md sm:text-xl font-semibold w-1/3 md:w-max">
            Order number :
          </h1>
          <span class="font-light text-neutral-500">{{ orderId }}</span>
        </li>
        <li class="flex gap-5">
          <h1 class="text-md sm:text-xl font-semibold w-1/3 md:w-max">
            Date :
          </h1>
          <h1 class="text-neutral-500 font-light text-sm sm:text-lg">
            {{ orderStore.orderDetail.createdDate }}
          </h1>
        </li>
        <li class="flex gap-5">
          <h1 class="text-md sm:text-xl font-semibold">Status :</h1>
          <StatusBadge
            v-model:type="orderStore.orderDetail.status"></StatusBadge>
        </li>
      </ul>
      <div
        v-if="orderStore.isLoading"
        class="flex flex-col gap-3 p-5 border border-gray-200 rounded-2xl">
        <div class="skeleton h-8 w-1/3"></div>
        <div class="skeleton h-8 w-full"></div>
        <div class="skeleton h-8 w-full"></div>
      </div>
      <AddressWarpper
        v-else
        :address="orderStore.orderDetail.address"></AddressWarpper>
      <hr class="w-full text-neutral-200 my-4"></hr>
      <div class="flex flex-col gap-5 px-5">
        <div
          v-if="orderStore.isLoading"
          v-for="_ in 3"
          class="w-full h-40 flex gap-8">
          <div class="skeleton w-1/3 h-full"></div>
          <div class="flex-1 flex flex-col gap-5">
            <div class="w-1/3 h-8 skeleton"></div>
            <div class="w-2/3 h-8 skeleton"></div>
            <div class="w-2/3 h-8 skeleton"></div>
          </div>
        </div>
        <ProductCard
          v-else
          v-for="product in orderStore.orderDetail.products"
          :data="product"></ProductCard>
      </div>
      <hr class="w-full text-neutral-200 my-4"></hr>
      <div v-if="orderStore.isLoading" class="w-full h-40 skeleton"></div>
      <div v-else class="flex flex-col gap-5 rounded-2xl bg-gray-100 p-10">
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
          <p class="font-semibold">
            {{ orderStore.orderDetail.totalPrice.toLocaleString() }} THB
          </p>
        </div>
      </div>
      <hr class="w-full text-neutral-200 my-4"></hr>
      <div
        v-if="orderStore.orderDetail.status === 'Pending'"
        class="flex justify-end items-center gap-5 mt-4">
        <button
          class="btn btn-neutral rounded-xl"
          @click="confirmModalState = true">
          Cancel order
        </button>
        <button class="btn btn-primary rounded-xl w-30" @click="handlePayment">
          Payment
        </button>
      </div>
    </div>
    <ConfirmModal
      v-if="confirmModalState"
      title="Cancel order"
      description="Are you sure to cancel order ?"
      :action="() => handleCancel()"
      :cancel="() => (confirmModalState = false)"></ConfirmModal>
    <LoadingScreen
      v-if="loadingState"
      text="Processing Payment"></LoadingScreen>
  </UserLayout>
</template>
