<script setup lang="ts">

const props = defineProps<{
    type: string
}>()

const containerColor = props.type === 'Success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
const iconBg = props.type === 'Success' ? 'bg-green-600' : 'bg-red-600'

</script>
<template>
    <div class="px-2 p-1 rounded-4xl border w-max flex  items-center gap-1 font-semibold" :class="containerColor">
        <div class="p-1 w-4 h-4 rounded-full" :class="iconBg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="#ffffff" height="4" width="4"
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
        </div>
        {{ props.type }}
    </div>
</template>