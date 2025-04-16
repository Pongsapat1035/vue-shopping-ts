<script setup lang="ts">
import SellerLayout from "../../layout/SellerLayout.vue";
import OrderChartWarpper from "../../components/seller/dashboard/OrderChartWarpper.vue";
import OrderSummaryWarpper from "../../components/seller/dashboard/OrderSummaryWarpper.vue";
import BestSellerProduct from "../../components/seller/dashboard/BestSellerProduct.vue";
</script>
<template>
  <SellerLayout>
    <div class="flex flex-col gap-8">
      <h1 class="text-3xl font-semibold">Good Morning, Mart</h1>
      <div class="flex gap-5">
        <div
          class="border border-neutral-200 rounded-2xl p-5 flex flex-col gap-5 w-[300px]">
          <span class="text-neutral-500 font-light">Total. seller</span>
          <span class="font-semibold text-2xl">4,500 THB</span>
        </div>
        <div
          class="border border-neutral-200 rounded-2xl p-5 flex flex-col gap-5 w-[300px]">
          <span class="text-neutral-500 font-light">Open Products</span>
          <span class="font-semibold text-2xl">60</span>
        </div>
        <div
          class="border border-neutral-200 rounded-2xl p-5 flex flex-col gap-5 w-[300px]">
          <span class="text-neutral-500 font-light">Closed Products</span>
          <span class="font-semibold text-2xl">10</span>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-10 p-5 border border-neutral-300 rounded-lg">
        <OrderSummaryWarpper></OrderSummaryWarpper>
        <OrderChartWarpper></OrderChartWarpper>
      </div>
      <BestSellerProduct></BestSellerProduct>
      
    </div>
  </SellerLayout>
</template>
