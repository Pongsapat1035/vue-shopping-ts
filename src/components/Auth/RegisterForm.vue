<script setup lang="ts">
import { RouterLink } from 'vue-router';
import InputTag from '../InputTag.vue';
import PasswordInput from '../PasswordInput.vue';
</script>
<template>
    <div class="flex flex-col p-10 gap-5 w-1/3 max-w-[480px]">
        <h1 class="font-bold text-5xl mb-5">Register</h1>
        <InputTag title="E-mail" type="email" name="email" placeHolderText="example@mail.com"></InputTag>
        <InputTag title="Name" type="text" name="name" placeHolderText="example"></InputTag>
        <PasswordInput title="Password" name="password"></PasswordInput>
        <PasswordInput title="Confirm password" name="confirm-password"></PasswordInput>
        <button class="btn btn-primary mt-5">Register</button>
        <button class="btn bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
            </svg>
            Login with Google
        </button>
        <RouterLink to="/auth" class="font-semibold cursor-pointer self-center">Return to login</RouterLink>
    </div>
</template>