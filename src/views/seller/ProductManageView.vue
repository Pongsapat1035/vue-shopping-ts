<script setup lang="ts">
import SellerLayout from '../../layout/SellerLayout.vue';
import ProductCart from '../../components/seller/product/ProductCart.vue';
import { RouterLink } from 'vue-router';
import { onMounted, type Ref } from 'vue';
import { useSellerProductStore } from '../../store/seller/product';
import { ref } from 'vue';

const productStore = useSellerProductStore()
const productLists: Ref<ProductData[]> = ref([])

type CheckBoxOption = { name: string, isCheck: boolean }

interface ProductData {
    coverImg: string;
    id: string
    name: string;
    quantity: number;
    price: number;
    detail: string;
    colors: CheckBoxOption[];
    sizes: CheckBoxOption[];
}

onMounted(async () => {
    try {
        const response = await productStore.loadAllProducts()
        productLists.value = response || []
    } catch (error) {
        console.log('load products error : ', error)
    }
})

</script>
<template>
    <SellerLayout>
        <div class="flex flex-col gap-10 p-5">
            <div class="flex justify-between">
                <h1 class="text-3xl font-semibold">Product management</h1>
                <RouterLink to="/seller/product/add" class="btn btn-primary">Add new Product</RouterLink>
            </div>
            <div class="flex justify-around gap-5 flex-wrap">
                <ProductCart v-for="product in productLists" :data="product"></ProductCart>
            </div>
        </div>
    </SellerLayout>

</template>