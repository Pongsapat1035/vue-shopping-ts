<script setup lang="ts">
import UserLayout from '../layout/UserLayout.vue';
</script>

<template>
    <UserLayout>
        <div class="w-4/5 mx-auto mt-20 flex">
            <div class="flex-auto w-1/2 overflow-hidden">
                <div class="p-5">
                    <img src="https://placehold.co/600x400">
                </div>
                <div class="flex gap-2 p-5">
                    <img src="https://placehold.co/128x100">
                    <img src="https://placehold.co/128x100">
                    <img src="https://placehold.co/128x100">
                    <div class="stack h-25 w-32">
                        <div class="bg-primary text-primary-content grid place-content-center rounded-box">200</div>
                        <div class="bg-accent text-accent-content grid place-content-center rounded-box">2</div>
                        <div class="bg-secondary text-secondary-content grid place-content-center rounded-box">
                            3
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-auto w-1/2 p-8 flex flex-col gap-5">
                <div class="flex gap-3 items-center">
                    <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <h1 class="font-semibold">Shop.name</h1>
                </div>
                <h1 class="text-3xl font-semibold">Product name</h1>
                <p class="text-5xl">200$</p>
                <div>
                    <p>Color</p>
                    <div class="flex gap-2">
                        <div class="w-8 h-8 bg-amber-300"></div>
                        <div class="w-8 h-8 bg-red-400"></div>
                        <div class="w-8 h-8 bg-green-500"></div>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <h1>Size</h1>
                    <div class="flex gap-2">
                        <div class="w-15 flex justify-center py-2 border border-gray-400">
                            40
                        </div>
                        <div class="w-15 flex justify-center py-2 border border-gray-400">
                            40.5
                        </div>
                        <div class="w-15 flex justify-center py-2 border border-gray-400">
                            41
                        </div>
                        <div class="w-15 flex justify-center py-2 border border-gray-400">
                            41.5
                        </div>
                    </div>
                </div>
                <div class="flex gap-5">
                    <button class="flex-auto btn btn-primary">Add to cart</button>
                    <button class="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                            stroke="currentColor" class="size-[1.2em]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </UserLayout>
</template>