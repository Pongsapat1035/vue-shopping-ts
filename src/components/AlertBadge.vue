<script setup lang="ts">
import { useAlertStore } from "../store/alert";
const alertStore = useAlertStore();
</script>
<template>
  <div v-if="alertStore.alertState" class="alert-container">
    <div class="h-max p-2 border border-neutral-200 rounded-lg">
      <svg
        v-if="alertStore.alertType === 'Success'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="size-[1rem] fill-green-600">
        <path
          d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        class="size-[1rem] fill-red-600">
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-md font-semibold">{{ alertStore.alertType }}</span>
      <span class="text-sm font-light">{{ alertStore.alertMessage }}</span>
    </div>
    <button
      class="btn btn-square absolute top-3 right-3"
      @click="alertStore.alertState = false">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        class="size-[1rem] fill-neutral-500">
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
    </button>
  </div>
</template>
<style scoped>
@reference "tailwindcss";

.alert-container {
  @apply p-5 border border-neutral-200 rounded-2xl fixed bottom-5 right-5 flex gap-4 min-w-[300px] bg-white shadow-xl;
}
</style>
