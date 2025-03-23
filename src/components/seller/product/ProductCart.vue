<script setup lang="ts">
</script>
<template>
    <div class="card bg-base-100 w-80 shadow-sm">
        <figure>
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Card Title</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts
            </p>
            <div class="card-actions justify-end">
                <RouterLink to="/product/1" class="btn btn-primary">View detail</RouterLink>
            </div>
        </div>
    </div>
</template>