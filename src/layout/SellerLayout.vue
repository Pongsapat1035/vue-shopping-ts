<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

import AlertBadge from "../components/AlertBadge.vue";
import NavLink from "../components/seller/layout/NavLink.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

const confirmState = ref<boolean>(false);
const authStore = useAuthStore();
const sideBarState = ref<boolean>(true);

const navData = [
  {
    name: "Dashboard",
    path: "/seller/dashboard",
  },
  {
    name: "Order Management",
    path: "/seller/orders",
  },
  {
    name: "Product Management",
    path: "/seller/products",
  },
];
</script>
<template>
  <div class="container mx-auto flex gap-5 relative h-max min-h-screen">
    <div
      class="my-5 rounded-2xl py-8 px-5 bg-slate-900 overflow-hidden duration-300 transition-all"
      :class="sideBarState ? 'w-[350px] min-w-[350px]' : 'w-[100px]'">
      <div class="sticky top-5">
        <div class="flex justify-between" :class="sideBarState ? 'justify-between': 'justify-center'">
          <RouterLink
            v-if="sideBarState"
            to="/"
            class="text-4xl font-semibold text-white"
            >Mart.shop</RouterLink
          >
          <button
            class="btn bg-transparent text-black border-0"
            @click="sideBarState = !sideBarState">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              class="size-[1rem] fill-white transition-all duration-300 ease-in-out"
              :class="sideBarState ? '' : 'rotate-180'">
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>
        </div>
        <div class="flex flex-col mt-10">
          <NavLink
            :state="sideBarState"
            v-for="data in navData"
            :name="data.name"
            :path="data.path"></NavLink>
          <button
            @click="() => (confirmState = true)"
            class="flex items-center gap-5 p-4 rounded-lg cursor-pointer text-white hover:text-black hover:bg-white transition duration-500 fill-white hover:fill-black"
            :class="!sideBarState ? 'justify-center' : ''">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="size-[1.2rem]">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            <span v-if="sideBarState">Logout</span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex-auto p-8">
      <slot></slot>
    </div>
  </div>
  <AlertBadge></AlertBadge>
  <ConfirmModal
    v-if="confirmState"
    title="Logout"
    description="Are you sure to logout"
    :action="authStore.signout"
    :cancel="() => (confirmState = false)"></ConfirmModal>
</template>
