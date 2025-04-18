<script setup lang="ts">
import SellerLayout from "../../layout/SellerLayout.vue";
import OrderChartWarpper from "../../components/seller/dashboard/OrderChartWarpper.vue";
import TotalBoxWarpper from "../../components/seller/dashboard/TotalBoxWarpper.vue";
import LastTransectionTable from "../../components/seller/dashboard/LastTransectionTable.vue";
</script>
<template>
  <SellerLayout>
    <div class="w-full flex flex-col gap-8">
      <h1 class="text-3xl font-semibold">Good Morning, Mart</h1>
      <TotalBoxWarpper></TotalBoxWarpper>
      <OrderChartWarpper></OrderChartWarpper>
      <LastTransectionTable></LastTransectionTable>
    </div>
  </SellerLayout>
</template>
