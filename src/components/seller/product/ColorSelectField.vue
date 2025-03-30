<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

defineProps<{
    value: string[]
}>()

const emit = defineEmits(['update:value'])
const selectedColor: Ref<string[]> = ref([])
const enableState = ref(false)
const colorLists: string[] = [
    '#F7374F',
    '#FCB454',
    '#27548A',
    '#77B254',
    '#A31D1D'
]

const handleEnable = (e: Event) => {
    const target = e.target as HTMLInputElement
    enableState.value = target.checked ? true : false
}

const handleCheck = (e: Event) => {
    const target = e.target as HTMLInputElement
    const colorVal = target.value
    const isChecked = target.checked
    if (isChecked) {
        selectedColor.value.push(colorVal)
    } else {
        const colorIndex = selectedColor.value.findIndex(color => color === colorVal)
        selectedColor.value.splice(colorIndex, 1)
    }
    emit('update:value', selectedColor.value)
}

</script>

<template>
    <fieldset class="fieldset flex-auto flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-64">
        <legend class="fieldset-legend">Colors</legend>
        <label class="fieldset-label">
            <input type="checkbox" class="checkbox" @change="handleEnable" :checked="enableState" />
            Enable color
        </label>
        <!-- <button class="btn btn-primary w-20">Add</button> -->
        <div class="flex gap-2 flex-wrap">
            <label v-for="color in colorLists" class="w-8 h-8 relative">
                <input type="checkbox" class="w-0 h-0 opacity-0 absolute peer" :disabled="!enableState" :value="color"
                    @change="handleCheck">
                <div class="w-full h-full border-4 border-white peer-checked:border-0 rounded-lg"
                    :class="`bg-[${color}]`"></div>
            </label>
        </div>
    </fieldset>
</template>