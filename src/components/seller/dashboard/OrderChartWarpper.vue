<script setup lang="ts">
import { ref, watch } from "vue";
import { useAdminDashboard } from "../../../store/admin/dashboard";

const dashboardStore = useAdminDashboard();


const chartRef = ref<ApexCharts | null>(null);

const data = ref({
  options: {
    xaxis: {
      categories: dashboardStore.chartData.label, // Initialize with store data
      lines: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
  },
  series: [
    {
      name: "Sale",
      data: dashboardStore.chartData.series1,
    }
  ],
});

watch(
  () => dashboardStore.chartData,
  (newChartData) => {
    data.value.series[0].data = newChartData.series1
   
    if (chartRef.value) {
      chartRef.value.updateOptions({
        xaxis: {
          categories: newChartData.label,
        },
      });
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="rounded-2xl w-full  p-4 sm:p-10 flex justify-between gap-5 items-center flex-wrap">
    <div class="flex flex-col gap-2">
      <h1 class="text-semibold text-xl">Your sale report</h1>
      <p class="hidden sm:block text-neutral-500 font-light text-sm">Look at your sale</p>
      <h1 class="font-semibold text-5xl sm:text-6xl mt-5">
        THB {{ dashboardStore.totalData.sale.toLocaleString() }}
      </h1>
    </div>
    <div class="w-full sm:2/3 lg:w-1/2">
      <apexchart
        class="min-h-0"
        ref="chartRef"
        type="line"
        width="100%"
        height="300"
        :options="data.options"
        :series="data.series"></apexchart>
    </div>
  </div>
</template>
