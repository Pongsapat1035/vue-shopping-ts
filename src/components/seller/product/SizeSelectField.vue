<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

defineProps<{
    value: string[]
}>()

const emit = defineEmits(['update:value'])
const selectedSize: Ref<string[]> = ref([])
const enableState = ref(false)
const sizeLists: string[] = [
    'XS',
    'S',
    'M',
    'L',
    'XL'
]

const handleEnable = (e: Event) => {
    const target = e.target as HTMLInputElement
    enableState.value = target.checked ? true : false
}

const handleCheck = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    const isChecked = target.checked

    if (isChecked) {
        selectedSize.value.push(value)
    } else {
        const sizeIndex = selectedSize.value.findIndex(size => size === value)
        selectedSize.value.splice(sizeIndex, 1)
    }
    emit('update:value', selectedSize.value)
}

</script>

<template>
    <fieldset class="fieldset flex-auto flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-64">
        <legend class="fieldset-legend">Size</legend>
        <label class="fieldset-label">
            <input type="checkbox" class="checkbox"  @change="handleEnable" :checked="enableState" />
            Enable size
        </label>
        <!-- <button class="btn btn-primary w-20">Add</button> -->
        <div class="flex gap-2 flex-wrap">
            <label v-for="size in sizeLists" class="w-8 h-8 relative">
                <input type="checkbox" class="w-0 h-0 opacity-0 absolute peer" :disabled="!enableState" :value="size"
                    @change="handleCheck">
                <div class="w-full h-full border-2 border-gray-100 peer-checked:border-gray-400
                     rounded-lg flex justify-center items-center font-semibold">
                    {{ size }}</div>
            </label>
        </div>
    </fieldset>
</template>
