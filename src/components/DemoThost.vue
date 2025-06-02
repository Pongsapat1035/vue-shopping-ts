<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { useAlertStore } from "../store/alert";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const router = useRouter();

const roleLoginHanler = async (role: string) => {
  try {
    if (role === "client") {
      await authStore.signIn("client@demo.com", "Demo_password");
    } else {
      await authStore.signIn("admin@demo.com", "Demo_password");
    }
    alertStore.toggleAlert("Success", "Login success !");
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div
    class="bg-white rounded-2xl border border-neutral-200 p-5 fixed bottom-5 right-5 flex flex-col gap-4 z-8">
    <h1 class="font-semibold">Try Demo</h1>
    <p class="hidden md:block font-light text-neutral-500 text-sm">
      Try our platform without signing up!
    </p>
    <div class="flex gap-2">
      <button
        class="btn rounded-lg bg-white border border-neutral-200 text-neutral-800 text-sm"
        @click="roleLoginHanler('client')">
        Client Role
      </button>
      <button
        class="btn rounded-lg bg-neutral-800 border-0"
        @click="roleLoginHanler('admin')">
        Admin Role
      </button>
    </div>
  </div>
</template>
