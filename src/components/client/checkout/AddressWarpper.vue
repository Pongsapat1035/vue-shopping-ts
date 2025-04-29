<script setup lang="ts">
import { RouterLink } from "vue-router";

import type { AddressInfo } from "../../../types";
import { allInputIsFilled } from "../../../utils/validate.method";

defineProps<{
  address: AddressInfo;
}>();


</script>
<template>
  <div
    class="flex-auto flex flex-col gap-2 p-5 border border-gray-200 rounded-2xl">
    <div class="flex justify-between">
      <div class="flex gap-4 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="size-[1.2rem]">
          <path
            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>
        <h1 class="text-xl font-semibold">Shipping to</h1>
      </div>
      <RouterLink to="/user/profile" class="btn btn-primary"
        >Change address</RouterLink
      >
    </div>
    <div v-if="allInputIsFilled(address)" class="flex flex-col gap-2">
      <h1 class="text-md text-neutral-500 font-light">
        {{ address.name }} Tel. {{ address.tel }}
      </h1>
      <h1 class="text-sm text-neutral-500 font-light">
        {{ address.address }} {{ address.district }} {{ address.province }}
        {{ address.postcode }}
      </h1>
    </div>
    <div v-else class="flex flex-col gap-2">
      <h1 class="text-md text-red-400 font-semibold">
        Please set your address
      </h1>
    </div>
  </div>
</template>
