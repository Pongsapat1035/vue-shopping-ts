<script setup lang="ts">
import { ref } from "vue";

import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import DemoThoast from "../components/DemoThost.vue";

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
  <DemoThoast></DemoThoast>
</template>
