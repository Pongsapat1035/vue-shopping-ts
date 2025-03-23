<script setup lang="ts">
import SellerLayout from '../../layout/SellerLayout.vue';
import ProductCart from '../../components/seller/product/ProductCart.vue';
import { RouterLink } from 'vue-router';
</script>
<template>
    <SellerLayout>
        <div class="flex flex-col gap-10 p-5">
            <div class="flex justify-between">
                <h1 class="text-3xl font-semibold">Producut management</h1>
                <RouterLink to="/seller/product/add" class="btn btn-primary">Add new Product</RouterLink>
            </div>
            <div class="flex justify-around gap-5 flex-wrap">
                <ProductCart v-for="item in 6"></ProductCart>
            </div>
        </div>
    </SellerLayout>

</template>