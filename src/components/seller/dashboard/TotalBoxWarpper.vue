<script setup lang="ts">
import { useAdminDashboard } from "../../../store/admin/dashboard";
import TotalBox from "./TotalBox.vue";

const dashboardStore = useAdminDashboard()


</script>
<template>
  <div class="flex gap-5">
    <TotalBox name="Total product" :value="dashboardStore.totalData.product"></TotalBox>
    <TotalBox name="Completed order" :value="dashboardStore.totalData.successOrder"></TotalBox>
    <TotalBox name="Canceled order" :value="dashboardStore.totalData.cancelOrder"></TotalBox>
    <TotalBox name="Top products" :value="dashboardStore.totalData.topProduct"></TotalBox>
  </div>
</template>
