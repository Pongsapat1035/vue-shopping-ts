<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "../../store/auth";
import { useAlertStore } from "../../store/alert";

import InputTag from "../InputTag.vue";
import PasswordInput from "../PasswordInput.vue";
import GoogleLoginBtn from "../GoogleLoginBtn.vue";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const router = useRouter();

defineProps<{
  changeState: Function;
}>();

interface FormData {
  email: string;
  password: string;
}

const formData: FormData = reactive({
  email: "",
  password: "",
});

const errorMsg: FormData = reactive({
  email: "",
  password: "",
});

onMounted(() => {
  authStore.checkAuth();
});

const validateInput = (): boolean => {
  for (const field in errorMsg) {
    const key = field as keyof FormData;
    if (errorMsg[key] !== "") {
      return false;
    }
  }
  return true;
};

const handleSubmit = async () => {
  try {
    if (!validateInput()) throw new Error("Please fill all input currect format");

    const { email, password } = formData;
    await authStore.signIn(email, password);
    router.push({ name: "home" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("sign in error : ", error.message);
      alertStore.toggleAlert("error", error.message);
    }
  }
};
</script>
<template>
  <form
    class="flex flex-col p-10 gap-5 w-1/3 max-w-[480px] bg-white rounded-2xl"
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
