<script setup lang="ts">

const props = defineProps<{
    sizes: CheckBoxOption[]
    enable: boolean
}>()

type CheckBoxOption = { name: string, isCheck: boolean }

const emit = defineEmits(['update:value', 'update:enable'])

const handleEnable = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target.checked) {
        props.sizes.forEach(size => size.isCheck = false)
    }
    emit('update:enable', target.checked)
}

const handleCheck = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    const isChecked = target.checked
    const sizeIndex = props.sizes.findIndex(size => size.name === value)
    props.sizes[sizeIndex].isCheck = isChecked ? true : false
    emit('update:value', props.sizes)
}

</script>

<template>
    <fieldset class="fieldset flex-auto flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-64">
        <legend class="fieldset-legend">Size</legend>
        <label class="fieldset-label">
            <input type="checkbox" class="checkbox" @change="handleEnable" :checked="enable" />
            Enable size
        </label>
        <div v-if="enable" class="flex gap-2 flex-wrap">
            <label v-for="size in sizes" class="w-8 h-8 relative">
                <input type="checkbox" class="w-0 h-0 opacity-0 absolute peer" :value="size.name" @change="handleCheck"
                    :checked="size.isCheck">
                <div class="w-full h-full border-2 border-gray-100 peer-checked:border-gray-400
                     rounded-lg flex justify-center items-center font-semibold">
                    {{ size.name }}</div>
            </label>
        </div>
    </fieldset>
</template>
