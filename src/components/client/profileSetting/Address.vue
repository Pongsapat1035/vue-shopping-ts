<script setup lang="ts">
import InputTag from "../../InputTag.vue";

interface AddressInfo {
  name: string;
  tel: string;
  address: string;
  district: string;
  province: string;
  postcode: string;
}

const addressInfo = defineModel<AddressInfo>( {
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
    <p class="text-slate-400 font-light mb-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum autem
      corrupti sapiente odio. Mollitia sequi ducimus deleniti odit!
    </p>
    <div class="gap-5 grid grid-cols-2">
      <InputTag
        title="Reciever name"
        name="recievedName"
        v-model:value="addressInfo.name"
        type="text"></InputTag>
      <InputTag
        title="Tel."
        name="telephoneNumber"
        v-model:value="addressInfo.tel"
        type="text"></InputTag>
    </div>
    <InputTag
      title="Address"
      name="recievedName"
      v-model:value="addressInfo.address"
      type="text"></InputTag>
    <div class="gap-5 grid grid-cols-3">
      <InputTag
        title="District"
        name="recievedName"
        v-model:value="addressInfo.district"
        type="text"></InputTag>
      <InputTag
        title="Province"
        name="telephoneNumber"
        v-model:value="addressInfo.province"
        type="text"></InputTag>
      <InputTag
        title="Postcode"
        name="telephoneNumber"
        v-model:value="addressInfo.postcode"
        type="text"></InputTag>
    </div>
  </div>
</template>
