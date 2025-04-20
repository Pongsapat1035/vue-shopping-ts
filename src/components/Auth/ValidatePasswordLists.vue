<script setup lang="ts">
interface Rule {
  isValid: boolean;
  text: string;
}

defineProps<{
  validateLists: Array<Rule>;
}>();
</script>
<template>
  <div class="bg-gray-100 rounded-lg p-3">
    <h1 class="font-semibold mb-2">Password vertification</h1>
    <div v-for="list in validateLists" class="flex gap-2 items-center my-1">
      <div
        v-if="list.isValid"
        class="p-1 w-4 h-4 rounded-full bg-green-100 flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            fill="#8fecb8"
            height="4"
            width="4"
            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
      </div>
      <div
        v-else
        class="p-1 w-4 h-4 rounded-full bg-red-200 flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            fill="#ff0000"
            width="4"
            height="4"
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>
      <h1 class="text-xs">
        {{ list.text }}
      </h1>
    </div>
  </div>
</template>
