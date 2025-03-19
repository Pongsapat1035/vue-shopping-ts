<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCounterStore } from '../store/testStore'
import { onMounted } from 'vue'

const couterStore = useCounterStore()

onMounted(() => {
    // couterStore.testFirebase()
    // console.log(import.meta.env.VITE_FB_APY_KEY) // "123"
})

console.log(couterStore.name)

</script>
<template>
    <div>
        <RouterLink to="/about">this is link</RouterLink>
        This is Home
    </div>
</template>