<script setup lang="ts">
const value = defineModel<string>();

// defineProps<{
//   toggleSort: Function;
// }>();

</script>
<template>
  <div class="flex flex-col gap-5">
    <h1 class="font-semibold text-3xl">Sort by</h1>
    <div class="flex justify-between">
      <h1 class="font-semibold">Name</h1>
      <!-- <button class="btn" @click="toggleSort()">
        {{ value }}
      </button> -->
    </div>
  </div>
</template>
