<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "../../store/auth";
import { useAlertStore } from "../../store/alert";
import type { LoginFormData } from '../../types'

import InputTag from "@/components/InputTag.vue";
import PasswordInput from "@/components/auth/PasswordInput.vue";
import GoogleLoginBtn from "@/components/auth/GoogleLoginBtn.vue";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const router = useRouter();

defineProps<{
  changeState: Function;
}>();

const formData: LoginFormData = reactive({
  email: "",
  password: "",
});

const errorMsg: LoginFormData = reactive({
  email: "",
  password: "",
});

onMounted(() => {
  authStore.checkAuth();
});

const validateInput = () => {
  for (const field in errorMsg) {
    const key = field as keyof LoginFormData;
    if (errorMsg[key] !== "") {
      throw new Error("Please fill all input current format");
    }
    if (formData[key] === "") {
      throw new Error("Please fill all input");
    }
  }
};

const handleSubmit = async () => {
  try {
    validateInput();
    const { email, password } = formData;

    await authStore.signIn(email, password);
    alertStore.toggleAlert("Success", "Login success !");
    router.push({ name: "home" });
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      const errorMsg = error.message;
      const checkWarning =
        errorMsg === "User does not exist" ||
        errorMsg === "Please fill all input current format" ||
        errorMsg === "Please fill all input";
      alertStore.toggleAlert(checkWarning ? "Warning" : "Error", errorMsg);
    }
  }
};
</script>
<template>
  <form
    class="flex flex-col px-0 py-4 md:p-10 gap-5 w-3/4 md:w-1/2 lg:w-1/3 max-w-[480px] bg-white rounded-2xl"
    @submit.prevent="handleSubmit">
    <h1 class="font-bold text-5xl mb-5">Login</h1>
    <InputTag
      title="E-mail"
      type="email"
      name="email"
      v-model:value="formData.email"
      v-model:error="errorMsg.email"
      validateWith="email"
      placeHolderText="example@mail.com"></InputTag>
    <PasswordInput
      title="Password"
      name="password"
      v-model:value="formData.password"></PasswordInput>
    <button type="submit" class="btn btn-primary mt-5">Login</button>
    <GoogleLoginBtn></GoogleLoginBtn>
    <button
      type="button"
      @click="changeState()"
      class="font-semibold cursor-pointer self-center">
      Create new account
    </button>
  </form>
</template>
