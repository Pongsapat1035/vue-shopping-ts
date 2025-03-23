<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>

    <div class="container mx-auto flex gap-5 relative">
        <div class="w-[350px] min-w-[350px] sticky top-0 h-screen p-5 bg-amber-100">
            <RouterLink to="/" class="btn btn-ghost text-4xl">Mart.shop</RouterLink>
            <div class="flex flex-col gap-5 mt-10">
                <RouterLink to="/seller/dashboard" class="btn btn-primary w-2/3">Dashboard</RouterLink>
                <RouterLink to="/seller/orders" class="btn btn-primary w-2/3">Order Mangement</RouterLink>
                <RouterLink to="/seller/products" class="btn btn-primary w-2/3">Product Management</RouterLink>
                <RouterLink to="/" class="btn btn-primary w-2/3">Logout</RouterLink>
            </div>
        </div>
        <div class="flex-auto p-5">
            <slot></slot>
        </div>
    </div>



</template>