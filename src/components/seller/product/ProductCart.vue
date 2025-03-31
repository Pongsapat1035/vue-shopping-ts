<script setup lang="ts">
import { useSellerProductStore } from '../../../store/seller/product';
defineProps<{
    data: ProductData
}>()

const productStore = useSellerProductStore()
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

</script>
<template>
    <div class="card bg-base-100 w-80 shadow-sm">
        <figure>
            <img :src="data.coverImg" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ data.name }}</h2>
            <p>{{ data.detail }}
            </p>
            <div class="card-actions justify-end gap-3">
                <RouterLink :to="{ name: 'seller-editproduct', params: { id: data.id } }" class="btn btn-primary">Edit
                </RouterLink>
                <button class="btn btn-square" @click="productStore.deleteProduct(data.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-[1.2em]">
                        <path
                            d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>