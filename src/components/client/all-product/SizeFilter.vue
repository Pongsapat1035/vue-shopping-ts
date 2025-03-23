<script setup lang="ts">
</script>
<template>
    <fieldset class="fieldset flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-full">
        <legend class="fieldset-legend text-xl">Size</legend>
        <div class="flex gap-2 flex-wrap">
            <div v-for="i in 8" class="size-box">
                L
            </div>
        </div>
    </fieldset>
</template>