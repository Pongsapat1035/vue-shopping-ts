<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../../../store/auth";
import { useCartStore } from "../../../store/client/cart";
import ConfirmModal from "../../ConfirmModal.vue";

const authStore = useAuthStore();
const cartStore = useCartStore();
const confirmModalState = ref<boolean>(false);
</script>
<template>
  <div class="navbar bg-base-100 sticky top-0 z-6">
    <div class="flex-1 z-6">
      <RouterLink to="/" class="btn btn-ghost text-xl">Mart.shop</RouterLink>
    </div>
    <div class="flex gap-2">
      <RouterLink v-if="!authStore.userId" class="btn btn-primary" to="/auth"
        >Get started</RouterLink
      >
    </div>
    <div v-if="authStore.userId" class="flex-none flex gap-3">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="badge badge-sm indicator-item">{{
              cartStore.getTotalItem
            }}</span>
          </div>
        </div>
        <div
          tabindex="0"
          class="card card-compact dropdown-content bg-base-100 mt-3 w-52 shadow">
          <div class="card-body z-15">
            <span class="text-lg font-bold"
              >{{ cartStore.getTotalItem }} Items</span
            >
            <span class="text-neutral-500 font-light"
              >Subtotal: THB
              {{ cartStore.getTotalProductPrice.toLocaleString() }}</span
            >
            <div class="card-actions">
              <RouterLink to="/user/cart" class="btn btn-primary btn-block"
                >View cart</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              class="object-contain"
              :src="
                authStore.userInfo.profileImg ||
                'https://www.thaimediafund.or.th/wp-content/uploads/2024/04/blank-profile-picture-973460_1280.png'
              " />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <RouterLink
              :to="{ name: 'user-profile-auth' }"
              class="justify-between">
              Profile
              <span class="badge">New</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'user-order-auth' }">My order</RouterLink>
          </li>
          <li><a @click="() => (confirmModalState = true)">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  <ConfirmModal
    v-if="confirmModalState"
    title="Logout"
    description="Are you sure to logout ?"
    :action="authStore.signout"
    :cancel="() => (confirmModalState = false)"></ConfirmModal>
</template>
