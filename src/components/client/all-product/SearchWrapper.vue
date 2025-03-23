<script setup lang="ts">
</script>
<template>
    <div class="w-full py-4 flex justify-between item-center ">
        <h1 class="font-bold text-2xl">Welcome back</h1>
        <div class="flex gap-4">
            <label class="input w-96">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                        stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Search" />
            </label>

            <div class="divider divider-horizontal"></div>
            <button class="btn btn-neutral">Filter</button>
        </div>

    </div>
</template>