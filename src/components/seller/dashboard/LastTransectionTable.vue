<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-center ">
      <h1 class="font-semibold text-2xl">Last transection</h1>
      <RouterLink
        class="font-light text-sm text-neutral-500 underline underline-offset-2"
        :to="{ name: 'admin-orders' }"
        >View more</RouterLink
      >
    </div>
    <p class="font-light text-sm text-neutral-500">
      Keep track of your 10 most recent transactions at a glance.
    </p>
    <div class="overflow-x-auto h-[300px] mt-5">
      <table
        class="table table-md table-pin-rows overflow-scroll table-pin-cols">
        <thead>
          <tr>
            <th>Order ID</th>
            <td>Name</td>
            <td>Date</td>
            <td>Status</td>
            <td>Amout</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 10">
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>12/02/2568</td>
            <td>Success</td>
            <td>560.-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
