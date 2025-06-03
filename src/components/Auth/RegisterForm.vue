<script setup lang="ts">
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "../../store/auth";
import { useAlertStore } from "../../store/alert";
import type { RegisterFormData } from "../../types";

import InputTag from "@/components/InputTag.vue";
import PasswordInput from "@/components/auth/PasswordInput.vue";
import GoogleLoginBtn from "@/components/auth/GoogleLoginBtn.vue";

defineProps<{
  changeState: Function;
}>();

const authStore = useAuthStore();
const alertStore = useAlertStore();
const router = useRouter();

const formData: RegisterFormData = reactive({
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
});

const errFormData: RegisterFormData = reactive({
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
});

const validateInput = () => {
  for (const prop in errFormData) {
    const key = prop as keyof RegisterFormData;
    if (errFormData[key] !== "" || formData[key] === "") {
      throw new Error("Please check all input again");
    }
  }
};

const handleSubmit = async () => {
  try {
    validateInput();
    await authStore.signUp(formData);
    alertStore.toggleAlert("Success", "Create new user success !");
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      const errorMsg = error.message;
      const checkWarning =
        errorMsg === "Please check all input again" ||
        errorMsg === "Email is already used";

      alertStore.toggleAlert(checkWarning ? "Warning" : "Error", errorMsg);
    }
  }
};

watch(
  () => formData.confirmPassword,
  () => {
    if (formData.confirmPassword !== formData.password) {
      errFormData.confirmPassword = "Password does not match";
    } else {
      errFormData.confirmPassword = "";
    }
  }
);
</script>
<template>
  <form
    class="flex flex-col px-0 py-4 md:p-10 gap-5 w-3/4 md:w-1/2 lg:w-1/3 max-w-[480px] "
    @submit.prevent="handleSubmit">
    <h1 class="font-bold text-5xl mb-5">Register</h1>
    <InputTag
      title="E-mail"
      type="email"
      name="email"
      placeHolderText="example@mail.com"
      v-model:value="formData.email"
      v-model:error="errFormData.email"
      validateWith="email">
    </InputTag>
    <InputTag
      title="Name"
      type="text"
      name="name"
      placeHolderText="example"
      v-model:value="formData.name"
      v-model:error="errFormData.name"
      validateWith="isNotEmpty">
    </InputTag>
    <PasswordInput
      title="Password"
      name="password"
      :vertify="true"
      v-model:value="formData.password"
      v-model:error="errFormData.password">
    </PasswordInput>
    <PasswordInput
      title="Confirm password"
      name="confirm-password"
      v-model:value="formData.confirmPassword"
      :errorMsg="errFormData.confirmPassword">
    </PasswordInput>
    <button type="submit" class="btn btn-primary mt-5">Register</button>
    <GoogleLoginBtn></GoogleLoginBtn>
    <button
      type="button"
      @click="changeState()"
      class="font-semibold cursor-pointer self-center">
      Return to login
    </button>
  </form>
</template>
