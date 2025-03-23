<script setup lang="ts">
</script>

<template>
    <fieldset class="fieldset flex-auto flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-64">
        <legend class="fieldset-legend">Size</legend>
        <label class="fieldset-label">
            <input type="checkbox" class="checkbox" />
            Enable size
        </label>
        <button class="btn btn-primary w-20">Add</button>
        <div class="flex gap-2 flex-wrap">
            <div v-for="i in 8" class="size-box">
                40.2
            </div>
        </div>
    </fieldset>
</template>

<style>
@import "tailwindcss";

.size-box {
    @apply w-14 h-8 flex justify-center items-center border border-gray-300 rounded-md
}
</style>