<script setup lang="ts">
import { RouterLink } from 'vue-router';
defineProps<{
    path: string
    name: string
    icon?: string
}>()
</script>

<template>
    <RouterLink :to="path">
        <div 
        class="flex gap-5 p-4 rounded-lg text-white hover:text-black hover:bg-white transition duration-500">
            <div class="w-6 h-6 bg-white rounded-full"></div>
            <p>{{ name }}</p>
        </div>
    </RouterLink>
</template>