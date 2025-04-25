<script setup lang="ts">
import type { AddressInfo } from "../../../types";

import InputTag from "@/components/InputTag.vue";

const addressInfo = defineModel<AddressInfo>("address", {
  default: {
    name: "",
    tel: "",
    address: "",
    district: "",
    province: "",
    postcode: "",
  },
});

const errMsg = defineModel<AddressInfo>("error", {
  default: {
    name: "",
    tel: "",
    address: "",
    district: "",
    province: "",
    postcode: "",
  },
});

</script>
<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-3xl font-bold">Address setting</h1>
    <p class="text-neutral-500 font-light mb-8">
      The Address Settings section enables users to manage their shipping
      details by adding, editing, or replacing their saved address, ensuring
      accurate delivery information is always up to date across the platform.
    </p>
    <div class="gap-5 grid grid-cols-2">
      <InputTag
        title="Reciever name"
        name="recievedName"
        v-model:value="addressInfo.name"
        v-model:error="errMsg.name"
        validateWith="isNotEmpty"
        type="text"></InputTag>
      <InputTag
        title="Tel."
        name="telephoneNumber"
        v-model:value="addressInfo.tel"
        v-model:error="errMsg.tel"
        validateWith="phoneNumber"
        type="text"></InputTag>
    </div>
    <InputTag
      title="Address"
      name="recievedName"
      v-model:value="addressInfo.address"
      v-model:error="errMsg.address"
      validateWith="isNotEmpty"
      type="text"></InputTag>
    <div class="gap-5 grid grid-cols-3">
      <InputTag
        title="District"
        name="recievedName"
        v-model:value="addressInfo.district"
        v-model:error="errMsg.district"
        validateWith="isNotEmpty"
        type="text"></InputTag>
      <InputTag
        title="Province"
        name="telephoneNumber"
        v-model:value="addressInfo.province"
        v-model:error="errMsg.province"
        validateWith="isNotEmpty"
        type="text"></InputTag>
      <InputTag
        title="Postcode"
        name="telephoneNumber"
        v-model:value="addressInfo.postcode"
        v-model:error="errMsg.postcode"
        validateWith="postcode"
        type="text"></InputTag>
    </div>
  </div>
</template>
