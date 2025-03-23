<script setup lang="ts">
import InputTag from '../../InputTag.vue';
</script>
<template>
    <div class="flex flex-col gap-5">
        <h1 class="text-3xl font-bold">Address setting</h1>
        <p class="text-slate-400 font-light mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum autem
            corrupti sapiente odio. Mollitia sequi ducimus deleniti odit!</p>
        <div class="gap-5 grid grid-cols-2">
            <InputTag title="Reciever name" name="recievedName" type="text"></InputTag>
            <InputTag title="Tel." name="telephoneNumber" type="text"></InputTag>
        </div>
        <InputTag title="Address" name="recievedName" type="text"></InputTag>
        <div class="gap-5 grid grid-cols-3">
            <InputTag title="District" name="recievedName" type="text"></InputTag>
            <InputTag title="Province" name="telephoneNumber" type="text"></InputTag>
            <InputTag title="Postcost" name="telephoneNumber" type="text"></InputTag>
        </div>
        <div class="self-end flex gap-5 mt-8">
            <button class="btn">Clear</button>
            <button class="btn btn-primary">Update address</button>
        </div>
    </div>
</template>