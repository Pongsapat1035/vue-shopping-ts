<script setup lang="ts">
import UserLayout from '../../layout/UserLayout.vue';
import ProductLists from '../../components/order/ProductLists.vue';
</script>

<template>
  <UserLayout>
    <div class="flex flex-col gap-3 mx-auto w-2/3 mt-10">
      <div class="flex gap-2 mb-5">
        <h1 class="text-2xl">Order status :</h1>
        <h1 class="text-2xl">Pending</h1>
      </div>
      <div class="flex gap-5">
        <div class="flex-auto p-7 border rounded-2xl">
          <h1 class="text-xl">Order date</h1>
          <h1 class="text-lg">Jul 20, 2025</h1>
        </div>
        <div class="flex-auto p-5 border rounded-2xl">
          <div class="flex justify-between">
            <h1>Address</h1>
            <button class="btn btn-primary">Create address</button>
          </div>
          <h1>52/2 เทศบาล 11 ขลุง จันทบุรี 22110</h1>
        </div>
      </div>
      <div class="divider"></div>
      <div class="flex flex-col gap-5 px-5">
        <ProductLists></ProductLists>
        <ProductLists></ProductLists>
      </div>
      <div class="divider"></div>
      <div class="flex flex-col gap-3">
        <div class="flex justify-between">
          <p>Discount</p>
          <p>200$</p>
        </div>
        <div class="flex justify-between">
          <p>Shipping price</p>
          <p>150$</p>
        </div>
        <div class="divider"></div>
        <div class="flex justify-between">
          <p>Total price</p>
          <p>200$</p>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="btn btn-primary">Payment</button>
      </div>
    </div>
  </UserLayout>

</template>