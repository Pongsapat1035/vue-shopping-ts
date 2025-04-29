<script setup lang="ts">
defineProps<{
  quantity: number;
}>();

</script>
<template>
  <div class="flex gap-3">
    <div class="bg-neutral-100 w-30 p-2 rounded-lg">
      <h1 class="text-center">{{ quantity }}</h1>
    </div>
    <div class="flex gap-2">
      <div class="btn border bg-blue-100 rounded-lg border-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="size-[.8rem] fill-blue-800">
          <path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
        <span class="font-semibold text-blue-800">Add</span>
      </div>
      <div class="btn border border-transparent  bg-red-100 rounded-lg ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="size-[.8rem] fill-red-700">
          <path
            d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
        </svg>
        <span class="font-semibold text-red-700">Remove</span>
      </div>
    </div>
  </div>
</template>
