<script setup lang="ts">
import SellerLayout from "../../layout/SellerLayout.vue";
</script>
<template>
  <SellerLayout>
    <div class="stats stats-vertical lg:stats-horizontal shadow w-3/4">
      <div class="stat gap-2.5">
        <div class="stat-title text-2xl">Amout</div>
        <div class="stat-value text-5xl">31K</div>
        <div class="stat-desc">ALl income</div>
      </div>

      <div class="stat gap-2.5">
        <div class="stat-title text-2xl">Products</div>
        <div class="stat-value text-5xl">31K</div>
        <div class="stat-desc">All your product</div>
      </div>

      <div class="stat gap-2.5">
        <div class="stat-title text-2xl">Orders</div>
        <div class="stat-value text-5xl">31K</div>
        <div class="stat-desc">All your order</div>
      </div>
    </div>
  </SellerLayout>
</template>
