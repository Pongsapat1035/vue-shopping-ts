<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { useAlertStore } from "../store/alert";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const router = useRouter();

const state = defineModel("state");

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
    class="bg-white rounded-2xl border border-neutral-200 p-5 fixed bottom-2 sm:bottom-5 right-5 flex flex-col gap-4 z-8">
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
      <button
        class="btn btn-circle absolute top-2 right-2"
        @click="() => (state = false)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          class="size-[1rem]">
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </button>
    </div>
  </div>
</template>
