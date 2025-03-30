<script setup lang="ts">
import SellerLayout from '../../layout/SellerLayout.vue';
import InputTag from '../../components/InputTag.vue';
import ColorSelectField from '../../components/seller/product/ColorSelectField.vue';
import SizeSelectField from '../../components/seller/product/SizeSelectField.vue';
import CoverPicture from '../../components/seller/product/CoverPicture.vue';

import { reactive } from 'vue';
import { useSellerProductStore } from '../../store/seller/product';
const productStore = useSellerProductStore()
interface FormData {
    coverImg: string
    name: string
    quality: number
    price: number
    detail: string
    colors: string[]
    sizes: string[]
}

const formData: FormData = reactive({
    coverImg: '',
    name: '',
    quality: 0,
    price: 0,
    detail: '',
    colors: [],
    sizes: []
})

const handleSubmit = async () => {
    console.log(formData)
    try {
        await productStore.addProduct(formData)
    } catch (error) {
        console.log('error : ', error)
    }

}

</script>
<template>
    <SellerLayout>
        <form class="w-3/4 p-5" @submit.prevent="handleSubmit">
            <div class="flex justify-between mb-8">
                <h1 class="text-3xl font-semibold">Create new product</h1>
                <button type="submit" class="btn btn-primary">Create new product</button>
            </div>
            <div class="flex flex-col gap-5">
                <CoverPicture v-model:imgUrl="formData.coverImg"></CoverPicture>
                <InputTag title="Product name" name="name" type="text" placeHolderText="name"
                    v-model:value="formData.name"></InputTag>
                <div class="flex gap-5">
                    <div class="flex-auto">
                        <InputTag title="Quality" name="number" type="text" placeHolderText="quality"
                            v-model:value="formData.quality"></InputTag>
                    </div>
                    <div class="flex-auto">
                        <InputTag title="Price" name="number" type="text" placeHolderText="price"
                            v-model:value="formData.price"></InputTag>
                    </div>
                </div>
                <fieldset class="flex flex-col gap-2">
                    <legend class="font-semibold mb-2">Detail</legend>
                    <div class="px-4 py-3 bg-gray-100 rounded-lg">
                        <textarea class="bg-gray-100 rounded-lg outline-none w-full" placeholder="detail"
                            v-model="formData.detail"></textarea>
                    </div>
                </fieldset>
                <div class="flex gap-5">
                    <ColorSelectField v-model:value="formData.colors"></ColorSelectField>
                    <SizeSelectField v-model:value="formData.sizes"></SizeSelectField>
                </div>
            </div>
        </form>
    </SellerLayout>
</template>