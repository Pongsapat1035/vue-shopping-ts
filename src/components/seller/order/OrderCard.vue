<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useAdminOrderStore } from "../../../store/admin/order";

import OrderTag from "./OrderTag.vue";
import ProductList from "./ProductList.vue";
import ConfirmModal from "../../ConfirmModal.vue";
import type { OrderDetail } from "../../../types";

const orderStore = useAdminOrderStore();

const props = defineProps<{
  closeModal: Function;
  orderId: string;
}>();

const confirmModalState = ref<boolean>(false);
const orderDetail = reactive<OrderDetail>({
  customerName: "",
  userId: "",
  totalProductPrice: 0,
  totalShippingPrice: 0,
  totalPrice: 0,
  createdDate: new Date(),
  products: [],
  status: "",
  address: {
    name: "",
    tel: "",
    address: "",
    district: "",
    province: "",
    postcode: "",
  },
});

onMounted(async () => {
  const { orderId } = props;
  const response = await orderStore.loadOrder(orderId);
  Object.assign(orderDetail, response);
});

const customerInfoText = computed(() => {
  const addressValue = Object.values(orderDetail.address);
  addressValue.splice(0, 1);
  const addressText = addressValue.join(" ");
  return addressText;
});
</script>
<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-neutral-800/30 flex justify-center items-center z-9"
    @click="closeModal()">
    <div
      class="border border-neutral-200 rounded-2xl bg-white w-[350px] relative z-10">
      <div class="absolute top-5 right-5 cursor-pointer" @click="closeModal()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          class="size-[1rem]">
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>
      <div class="flex flex-col gap-3 p-8">
        <h1 class="text-2xl font-medium text-purple-900">Order detail</h1>
        <h1>
          Order :
          <span class="text-neutral-500 text-sm font-light">{{ orderId }}</span>
        </h1>
        <div class="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="size-[1rem] fill-neutral-300">
            <path
              d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z" />
          </svg>
          <span class="text-sm">{{ orderDetail.createdDate }}</span>
        </div>
        <OrderTag :status="orderDetail.status"></OrderTag>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              class="size-[.9rem] fill-neutral-300">
              <path
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
            <h1>Customer info</h1>
          </div>
          <p class="font-light text-sm text-neutral-500">
            {{ orderDetail.address.name }}
          </p>
          <p class="font-light text-sm text-neutral-500">
            {{ customerInfoText }}
          </p>
        </div>
        <div class="flex flex-col gap-2 my-5">
          <ProductList
            v-for="product of orderDetail.products"
            :data="product"></ProductList>
        </div>
      </div>
      <div
        class="flex justify-between items-center p-2 border-t border-neutral-200">
        <div class="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            class="size-[1rem] fill-neutral-300">
            <path
              d="M48 32C48 14.3 62.3 0 80 0s32 14.3 32 32l0 32 32 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32c0 1.5-.1 3.1-.3 4.5C254.1 82.2 288 125.1 288 176c0 24.2-7.7 46.6-20.7 64.9c31.7 19.8 52.7 55 52.7 95.1c0 61.9-50.1 112-112 112l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-32 0 0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-6.3 0C18.7 448 0 429.3 0 406.3L0 288l0-22.3L0 224 0 101.6C0 80.8 16.8 64 37.6 64L48 64l0-32zM64 224l112 0c26.5 0 48-21.5 48-48s-21.5-48-48-48L64 128l0 96zm112 64L64 288l0 96 144 0c26.5 0 48-21.5 48-48s-21.5-48-48-48l-32 0z" />
          </svg>
          <span class="text-neutral-700">{{
            orderDetail.totalPrice.toLocaleString()
          }}</span>
        </div>
        <button
          v-if="orderDetail.status === 'Pending'"
          @click="confirmModalState = true"
          class="py-1 px-2 rounded-lg bg-red-100 text-red-700 text-sm cursor-pointer">
          Cancel order
        </button>
      </div>
    </div>
    <ConfirmModal
      v-if="confirmModalState"
      title="Cancel order?"
      description="Are you sure to cancel order"
      :action="() => orderStore.cancelOrder(orderId)"
      :cancel="() => (confirmModalState = false)"></ConfirmModal>
  </div>
</template>
