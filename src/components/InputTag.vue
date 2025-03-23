<script setup lang="ts">
defineProps<{
    title: string
    name: string
    type: string
    placeHolderText?: string
    errorMsg?: string
}>()
</script>

<template>
    <fieldset class="flex flex-col gap-2">
        <legend class="font-semibold mb-2">{{ title }}</legend>
        <div class="px-4 py-3 bg-gray-100 rounded-lg">
            <input :type="type" :name="name" class="outline-none w-full font-light text-sm" :placeholder="placeHolderText" />
        </div>
        <p v-if="errorMsg" class="text-red-400 text-sm ml-2">{{ errorMsg }}</p>
    </fieldset>
</template>