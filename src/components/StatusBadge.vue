<script setup lang="ts">
import { computed } from "vue";

const type = defineModel("type");

const containerColor = computed(() => {
  return type.value === "Success"
    ? "bg-green-100 text-green-600"
    : type.value === "Failue"
    ? "bg-red-100 text-red-600"
    : "bg-blue-100 text-blue-600";
});

const iconBg = computed(() => {
  return type.value === "Success"
    ? "bg-green-600"
    : type.value === "Failue"
    ? "bg-red-600"
    : "bg-blue-600";
});
</script>
<template>
  <div
    class="px-2 p-1 rounded-4xl border w-max flex items-center gap-1 font-semibold"
    :class="containerColor">
    <div
      class="p-1 w-4 h-4 rounded-full flex justify-center items-center"
      :class="iconBg">
      <svg
        v-if="type === 'Success'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="size-[0.7rem]">
        <path
          fill="#ffffff"
          d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
      </svg>
      <svg
        v-else-if="type === 'Failue'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512">
        <path
          fill="#ffffff"
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 512"
        class="size-[0.7rem]">
        <path
          fill="#ffffff"
          d="M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32L96 64zM64 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
      </svg>
    </div>
    {{ type }}
  </div>
</template>
