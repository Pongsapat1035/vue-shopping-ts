<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import UserLayout from '../layout/UserLayout.vue'
import ProductCard from '../components/ProductCard.vue'

onMounted(() => {
    // couterStore.testFirebase()
    // console.log(import.meta.env.VITE_FB_APY_KEY) // "123"
})


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
            <!-- <button class="btn btn-primary self-center">View more</button> -->
        </div>
    </UserLayout>
</template>