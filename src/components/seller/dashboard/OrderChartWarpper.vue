<script setup lang="ts">
const data = {
  options: {
    xaxis: {
      categories: ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan"],
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
      name: "Series 1",
      data: [45, 52, 38, 45, 19, 33],
    },
    {
      name: "Series 2",
      data: [50, 42, 70, 50, 69, 33],
    },
  ],
};
</script>
<template>
  <div class="rounded-2xl w-full p-10 flex justify-between items-center">
    <div class="flex flex-col gap-2">
      <h1 class="text-semibold text-xl">Your sale report</h1>
      <p class="text-neutral-500 font-light text-sm">Look at your sale</p>
      <h1 class="font-semibold text-6xl mt-5">THB 45,000</h1>
    </div>
    <div class="">
      <apexchart
        class="min-h-0"
        type="line"
        width="600"
        height="300"
        :options="data.options"
        :series="data.series"></apexchart>
    </div>
  </div>
</template>
