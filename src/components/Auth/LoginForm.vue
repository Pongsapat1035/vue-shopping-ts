<script setup lang="ts">
import { RouterLink } from 'vue-router';
import InputTag from '../InputTag.vue';
import PasswordInput from '../PasswordInput.vue';
import GoogleLoginBtn from '../GoogleLoginBtn.vue';
import { useAuthStore } from '../../store/auth';
import { onMounted, reactive } from 'vue';

const authStore = useAuthStore()

interface FormData {
    email: string
    password: string
}

const formData: FormData = reactive({
    email: '',
    password: ''
})

onMounted(() => {
    authStore.checkAuth()
})

const handleSubmit = async () => {
    // console.log(formData)
    try {
        const { email, password } = formData
        await authStore.signIn(email, password)
    } catch (error) {
        console.log(error)
    }
}

</script>
<template>
    <form class="flex flex-col p-10 gap-5 w-1/3 max-w-[480px]" @submit.prevent="handleSubmit">
        <h1 class="font-bold text-5xl mb-5">Login</h1>
        <InputTag title="E-mail" type="email" name="email" v-model:value="formData.email"
            placeHolderText="example@mail.com"></InputTag>
        <PasswordInput title="Password" name="password" v-model:value="formData.password"></PasswordInput>
        <button type="submit" class="btn btn-primary mt-5">Login</button>
        <GoogleLoginBtn></GoogleLoginBtn>
        <RouterLink to="/register" class="font-semibold cursor-pointer self-center">Create new account</RouterLink>
    </form>
</template>