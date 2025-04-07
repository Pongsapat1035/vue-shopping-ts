<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "../../../store/auth";
import { useCartStore } from "../../../store/client/cart";

const authStore = useAuthStore();
const cartStore = useCartStore();
</script>
<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">Mart.shop</RouterLink>
    </div>
    <div class="flex gap-2">
      <RouterLink
        v-if="!authStore.userId"
        class="btn btn-primary"
        to="/auth/login"
        >Get started</RouterLink
      >
      <RouterLink class="btn btn-primary" to="/seller/dashboard"
        >Seller</RouterLink
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
          class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
          <div class="card-body">
            <span class="text-lg font-bold"
              >{{ cartStore.getTotalItem }} Items</span
            >
            <span class="text-info"
              >Subtotal: ${{ cartStore.getTotalProductPrice }}</span
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
              :src="
                authStore.userInfo.profileImg ||
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              " />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <RouterLink to="/user/profile" class="justify-between">
              Profile
              <span class="badge">New</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/user/order">My order</RouterLink>
          </li>
          <li><a @click="authStore.signout()">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
