<script setup lang="ts">
import OrderBox from './OrderBox.vue';
</script>
<template>
<div class="flex flex-col gap-3  p-5">
      <h1 class="text-xl font-semibold mb-8">Summary Order</h1>
      <OrderBox></OrderBox>
      <OrderBox></OrderBox>
      <OrderBox></OrderBox>
    </div>
</template>