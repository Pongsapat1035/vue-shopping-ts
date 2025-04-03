<script setup lang="ts">
defineProps<{
  coverImg: string;
}>();
</script>
<template>
  <div class="flex-auto w-1/2 overflow-hidden">
    <div class="p-5">
      <img :src="coverImg" />
    </div>
    <div class="flex gap-2 p-5">
      <img src="https://placehold.co/128x100" />
      <img src="https://placehold.co/128x100" />
      <img src="https://placehold.co/128x100" />
      <div class="stack h-25 w-32">
        <div
          class="bg-primary text-primary-content grid place-content-center rounded-box">
          200
        </div>
        <div
          class="bg-accent text-accent-content grid place-content-center rounded-box">
          2
        </div>
        <div
          class="bg-secondary text-secondary-content grid place-content-center rounded-box">
          3
        </div>
      </div>
    </div>
  </div>
</template>
