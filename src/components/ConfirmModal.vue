<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  action: Function;
  cancel: Function;
}>();
</script>
<template>
  <div
    @click="cancel()"
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-gray-500/50 flex justify-center items-center">
    <div
      class="bg-white rounded-2xl flex flex-col p-8 gap-4 min-w-[300px] w-1/4">
      <h1 class="font-semibold text-2xl">{{ title }}</h1>
      <p class="font-light text-neutral-500">{{ description }}</p>
      <div class="flex gap-5 justify-end mt-5">
        <button class="btn btn-neutral" @click="cancel()">Cancel</button>
        <button class="btn btn-primary" @click="action()">Confirm</button>
      </div>
    </div>
  </div>
</template>
