<script setup lang="ts">
</script>
<template>
    <fieldset class="fieldset flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-full h-auto">
        <legend class="fieldset-legend text-xl">Colors</legend>
        <div class="flex gap-2 flex-wrap">
            <div v-for="i in 8" class="w-8 h-8 bg-red-500 rounded-md">
            </div>
        </div>
    </fieldset>
</template>