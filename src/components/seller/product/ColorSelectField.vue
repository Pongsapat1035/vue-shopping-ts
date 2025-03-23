<script setup lang="ts">
</script>

<template>
    <fieldset class="fieldset flex-auto flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-64">
        <legend class="fieldset-legend">Colors</legend>
        <label class="fieldset-label">
            <input type="checkbox" class="checkbox" />
            Enable color
        </label>
        <button class="btn btn-primary w-20">Add</button>
        <div class="flex gap-2 flex-wrap">
            <div v-for="i in 8" class="w-8 h-8 bg-red-500 rounded-md">
            </div>
        </div>
    </fieldset>
</template>