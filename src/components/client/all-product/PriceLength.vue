<script setup lang="ts">
</script>
<template>
    <div class="flex flex-col gap-4">
        <h1 class="font-semibold text-2xl">Price length</h1>
        <div class="w-full max-w-xs">
            <input type="range" min="0" max="100" value="25" class="range range-xs" step="25" />
            <div class="flex justify-between px-2.5 mt-2 text-xs">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
            </div>
            <div class="flex justify-between px-2.5 mt-2 text-xs">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
        </div>
    </div>
</template>