<script setup lang="ts">
import UserLayout from '../../layout/UserLayout.vue';
import StatusBadge from '../../components/StatusBadge.vue';
</script>
<template>
    <UserLayout>
        <div class="p-5">
            <h1 class="font-semibold text-3xl mb-8">My order</h1>
            <ul class="list bg-base-100 rounded-box shadow-md flex flex-col">
                <li v-for="i in 10" class="list-row">
                    <div class="text-4xl font-thin opacity-30 tabular-nums">01</div>
                    <div class="list-col-grow ml-6 flex flex-col gap-2">
                        <div class="font-semibold">Order number : a123qwe12345</div>
                        <StatusBadge type="Success"></StatusBadge>
                        <div class="text-xs uppercase font-semibold opacity-60">Product name 1, Product name 2</div>
                    </div>
                    <button class="btn btn-primary">
                        view detail
                    </button>
                </li>

            </ul>
        </div>
    </UserLayout>
</template>