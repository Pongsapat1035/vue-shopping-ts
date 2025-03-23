<script setup lang="ts">
import InputTag from '../../InputTag.vue';
</script>
<template>
    <div class="flex flex-col gap-5">
        <h1 class="text-3xl font-bold">Profile setting</h1>
        <p class="text-slate-400 font-light mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum autem corrupti sapiente odio. Mollitia sequi ducimus deleniti odit!</p>
        <div class="flex flex-col gap-3">
         
            <div class="flex gap-5 items-center">
                <div class="avatar">
                    <div class="w-30 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <input type="file" class="file-input file-input-ghost" />
                <button class="btn btn-secondary">Delete picture</button>
            </div>
        </div>
   
        <InputTag name="name" title="Profile name" type="text" placeHolderText=""></InputTag>
        <fieldset class="flex flex-col gap-2">
            <legend class="font-semibold mb-2">Email</legend>
            <div class="px-4 py-3 bg-gray-100 rounded-lg">
                <input type="email" name="email" class="outline-none w-full font-light text-sm" disabled />
            </div>
        </fieldset>
    </div>
</template>