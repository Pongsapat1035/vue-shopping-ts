<script setup lang="ts">
defineProps<{
  qty: number | undefined;
}>();
</script>
<template>
  <div
    v-if="qty != undefined"
    class="px-2 py-1 rounded-2xl w-max h-max text-xs"
    :class="qty > 0 ? 'bg-green-200' : 'bg-red-200'">
    <span
      class="capitalize"
      :class="qty > 0 ? 'text-green-800' : 'text-red-800'"
      >{{ qty > 0 ? "In stock" : "out of stock" }}</span>
  </div>
</template>
