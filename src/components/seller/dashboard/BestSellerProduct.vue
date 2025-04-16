<script setup lang="ts">
import BestSellerCard from './BestSellerCard.vue';
</script>
<template>
    <div class="col-span-2 flex flex-col gap-8">
        <h1 class="text-2xl font-semibold">Top 3 Best seller</h1>
        <div class="flex justify-around">
            <BestSellerCard v-for="i in 3"></BestSellerCard>
        </div>
    </div>
</template>