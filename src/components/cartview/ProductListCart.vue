<script setup lang="ts">
</script>
<template>
    <div class="flex gap-5 h-40">
        <div class="w-1/3 h-full">
            <img src="https://placehold.co/600x400" class="w-full h-full rounded-lg">
        </div>
        <div class="flex flex-col flex-auto p-2">
            <h1 class="font-semibold text-xl">Product name</h1>
            <div class="flex-auto">
                <p>Size: A</p>
            </div>
            <div class="flex gap-5 justify-between items-center">
                <span>Quality : 1</span>
                <span>Price : 200$</span>
                <button class="btn btn-error">Delete</button>
            </div>
        </div>
    </div>
</template>