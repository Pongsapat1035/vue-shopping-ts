<script setup lang="ts">
import InputTag from '../InputTag.vue';
import PasswordInput from '../PasswordInput.vue';
import GoogleLoginBtn from '../GoogleLoginBtn.vue';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../store/auth';

interface Formdata {
    email: string
    name: string
    password: string
    confirmPassword: string
}
defineProps<{
    changeState: Function
}>()
const formData: Formdata = reactive({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
})
const authStore = useAuthStore()
const inputError = ref('')

const handleSubmit = async () => {
    console.log(inputError)
    try {
        for (const prop in formData) {
            const key = prop as keyof Formdata
            if (formData[key] === '') {
                throw new Error("Please fill all input")
            }
        }

        if (formData.password !== formData.confirmPassword) {
            throw new Error("password does not match")
        }

        if (inputError.value) {
            throw new Error(inputError.value)
        }

        // call create user
        console.log('call create user')
        await authStore.signUp(formData)
    } catch (error) {
        console.log(error)
    }
}

</script>
<template>
    <form class="flex flex-col p-6 gap-5 w-1/3 max-w-[480px]" @submit.prevent="handleSubmit">
        <h1 class="font-bold text-5xl mb-5">Register</h1>
        <InputTag title="E-mail" type="email" name="email" placeHolderText="example@mail.com"
            v-model:value="formData.email" v-model:error="inputError">
        </InputTag>
        <InputTag title="Name" type="text" name="name" placeHolderText="example" v-model:value="formData.name">
        </InputTag>
        <PasswordInput title="Password" name="password" :vertify="true" v-model:value="formData.password"
            v-model:error="inputError">
        </PasswordInput>
        <PasswordInput title="Confirm password" name="confirm-password" v-model:value="formData.confirmPassword">
        </PasswordInput>
        <button type="submit" class="btn btn-primary mt-5">Register</button>
        <GoogleLoginBtn></GoogleLoginBtn>
        <Button type="button"@click="changeState()"class="font-semibold cursor-pointer self-center">Return to login</Button>
    </form>
</template>