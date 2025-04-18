<script setup lang="ts">
import TotalBox from "./TotalBox.vue";
</script>
<template>
  <div class="flex gap-5">
    <TotalBox name="Total product" :value="70"></TotalBox>
    <TotalBox name="Completed order" :value="70"></TotalBox>
    <TotalBox name="Canceled order" :value="70"></TotalBox>
    <TotalBox name="Top products" :value="70"></TotalBox>
  </div>
</template>
