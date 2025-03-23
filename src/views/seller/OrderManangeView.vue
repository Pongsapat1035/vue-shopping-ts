<script setup lang="ts">
import SellerLayout from '../../layout/SellerLayout.vue';
import OrderLists from '../../components/seller/order/OrderLists.vue';
</script>
<template>
    <SellerLayout>
        <div class="flex flex-col gap-10 p-5">
            <h1 class="text-3xl font-semibold">Order management</h1>
            <OrderLists></OrderLists>
        </div>
    </SellerLayout>

</template>