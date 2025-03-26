<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    title: string
    name: string
    type: string
    value: string
    error?: string
    placeHolderText?: string

}>()

const errorMsg = ref('')
const emit = defineEmits(['update:value', 'update:error'])

const validateEmail = (email: string) => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target) {
        if (props.type === 'email') {
            const userEmail: string = target.value
            if (userEmail) {
                const checkValidEmail = validateEmail(userEmail)
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