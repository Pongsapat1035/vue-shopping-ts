<script setup lang="ts">
import PriceLength from './all-product/PriceLength.vue';
import GenderFilter from './all-product/GenderFilter.vue';
import ColorFilter from '../../components/client/all-product/ColorFilter.vue';
import SizeFilter from './all-product/SizeFilter.vue';
import SortTab from './all-product/SortTab.vue';

</script>
<template>
    <div class="w-1/4 max-w-[350px] flex flex-col gap-5 px-5 py-8 border border-gray-200 rounded-2xl">
        <SortTab></SortTab>
        <h1 class="text-3xl font-semibold">Filter</h1>
        <ColorFilter></ColorFilter>
        <SizeFilter></SizeFilter>
        <GenderFilter></GenderFilter>
        <PriceLength></PriceLength>
    </div>
</template>