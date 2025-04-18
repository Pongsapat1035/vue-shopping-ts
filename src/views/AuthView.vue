<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "@/components/Auth/LoginForm.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";

const loginState = ref<string>("login");
</script>
<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <LoginForm
      v-if="loginState === 'login'"
      :changeState="() => (loginState = 'register')"></LoginForm>
    <RegisterForm
      v-else
      :changeState="() => (loginState = 'login')"></RegisterForm>
  </div>
</template>
