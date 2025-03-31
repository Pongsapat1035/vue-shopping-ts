<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    title: string
    name: string
    type: string
    value?: string | number
    error?: string
    placeHolderText?: string

}>()

const errorMsg = ref('')
const emit = defineEmits(['update:value', 'update:error'])

const validateEmail = (email: string) => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email) {
        const checkValidEmail = emailRegex.test(email)
        if (!checkValidEmail) {
            errorMsg.value = "Please enter correct email format ex: example@mail.com"
            emit('update:error', "Please enter correct email format ex: example@mail.com")
        } else {
            errorMsg.value = ""
            emit('update:error', "")
        }
    } else {
        errorMsg.value = ""
        emit('update:error', "")
    }
}

const validateNumberTag = (num: number) => {
    if (num) {
        if (num <= 0) {
            errorMsg.value = `${props.name} can't be less or equal 0`
            emit('update:error', `${props.name} can't be less or equal 0`)
        } else {
            errorMsg.value = ""
            emit('update:error', "")
        }
    } else {
        errorMsg.value = ""
    }

}

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target) {
        if (props.type === 'email') {
            const userEmail: string = target.value
            validateEmail(userEmail)
        } else if (props.type === 'number') {
            const value: number = parseInt(target.value)
            validateNumberTag(value)
        }
        emit('update:value', target.value)
    }
}
</script>

<template>
    <fieldset class="flex flex-col gap-2">
        <legend class="font-semibold mb-2">{{ title }}</legend>
        <div class="px-4 py-3 bg-gray-100 rounded-lg">
            <input :type="type" :name="name" :value="value" class="outline-none w-full font-light text-sm"
                :placeholder="placeHolderText" @input="handleInput" />
        </div>
        <p class="text-red-400 text-xs ml-2">{{ errorMsg }}</p>
    </fieldset>
</template>