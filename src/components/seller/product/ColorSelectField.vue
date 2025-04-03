<script setup lang="ts">

const props = defineProps<{
    colors: CheckBoxOption[]
    enable: boolean
}>()

type CheckBoxOption = { name: string, isCheck: boolean }

const emit = defineEmits(['update:value', 'update:enable'])

const handleEnable = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target.checked) {
        props.colors.forEach(color => color.isCheck = false)
    }
    emit('update:enable', target.checked)
}

const handleCheck = (e: Event) => {
    const target = e.target as HTMLInputElement
    const colorVal = target.value
    const isChecked = target.checked
    const colorIndex = props.colors.findIndex(color => color.name === colorVal)
    props.colors[colorIndex].isCheck = isChecked ? true : false
    emit('update:value', props.colors)
}

</script>
<template>
    <fieldset class="fieldset flex-auto flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-64">
        <legend class="fieldset-legend">Colors</legend>
        <label class="fieldset-label">
            <input type="checkbox" class="checkbox" @change="handleEnable" :checked="enable" />
            Enable color
        </label>
        <!-- <button class="btn btn-primary w-20">Add</button> -->
        <div v-if="enable" class="flex gap-2 flex-wrap">
            <label v-for="color in colors" class="w-8 h-8 relative">
                <input type="checkbox" class="w-0 h-0 opacity-0 absolute peer" :value="color.name"
                    :checked="color.isCheck" @change="handleCheck">
                <div class="w-full h-full opacity-30 border-white peer-checked:opacity-100 rounded-lg"
                    :style="{ backgroundColor: color.name }">
                </div>
            </label>
        </div>
    </fieldset>
</template>