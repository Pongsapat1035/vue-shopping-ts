<script setup lang="ts">
const data = {
  series: [60, 120],
  chartOptions: {
    labels: ["Success", "Failue"],
    chart: {
      type: "donut",
    },
    fill: {
      colors: ["#1DCD9F", "#F7374F"],
    },
  },
};
</script>
<template>
  <div class="col-span-2 flex flex-col gap-8">
    <h1 class="text-xl font-semibold mb-8">Order overview</h1>
    <apexchart
      width="400"
      :options="data.chartOptions"
      :series="data.series"></apexchart>
  </div>
</template>
