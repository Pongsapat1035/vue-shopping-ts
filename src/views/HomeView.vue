<script setup lang="ts">

import UserLayout from '../layout/UserLayout.vue'
import ProductCard from '../components/client/ProductCard.vue'


</script>
<template>
    <UserLayout>
        <div class="hero bg-base-200 min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Hello there</h1>
                    <p class="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button class="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-10 ">
            <h1 class="font-bold text-5xl">Product lists</h1>
            <div class="flex gap-8">
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
            </div>
            <RouterLink to="/user/all-product" class="btn btn-primary w-40 self-center">View more</RouterLink>
        </div>
    </UserLayout>
</template>