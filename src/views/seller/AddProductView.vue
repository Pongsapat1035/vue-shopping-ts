<script setup lang="ts">
import SellerLayout from '../../layout/SellerLayout.vue';
import InputTag from '../../components/InputTag.vue';
import ColorSelectField from '../../components/seller/product/ColorSelectField.vue';
import SizeSelectField from '../../components/seller/product/SizeSelectField.vue';

</script>
<template>
    <SellerLayout>
        <div class="w-3/4 p-5">
            <div class="flex justify-between mb-8">
                <h1 class="text-3xl font-semibold">Create new product</h1>
                <button class="btn btn-primary">Create new product</button>
            </div>
            <div class="flex flex-col gap-5">
                <InputTag title="Product name" name="name" type="text" placeHolderText="name"></InputTag>
                <div class="flex gap-5">
                    <div class="flex-auto">
                        <InputTag title="Quality" name="number" type="text" placeHolderText="quality"></InputTag>
                    </div>
                    <div class="flex-auto">
                        <InputTag title="Price" name="number" type="text" placeHolderText="price"></InputTag>
                    </div>
                </div>
                <fieldset class="flex flex-col gap-2">
                    <legend class="font-semibold mb-2">Detail</legend>
                    <div class="px-4 py-3 bg-gray-100 rounded-lg">
                        <textarea class="bg-gray-100 rounded-lg outline-none w-full" placeholder="detail"></textarea>
                    </div>
                </fieldset>
                <div class="flex gap-5">
                    <ColorSelectField></ColorSelectField>
                    <SizeSelectField></SizeSelectField>
                </div>
            </div>
        </div>
    </SellerLayout>
</template>