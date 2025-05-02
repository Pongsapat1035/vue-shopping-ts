<script setup lang="ts">
defineProps<{
    text: string
}>()
</script>
<template>
    <div class="h-screen w-screen fixed top-0 left-0 z-10 bg-neutral-800/50 flex justify-center items-center">
        <div class="flex flex-col gap-4 items-center">
            <span class="loading loading-dots loading-xl text-white"></span>
            <h1 class="text-white font-light">{{ text }}</h1>
        </div>
    </div>
</template>