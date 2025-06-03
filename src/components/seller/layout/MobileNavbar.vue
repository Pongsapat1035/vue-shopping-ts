<script setup lang="ts">
import { onMounted, ref } from "vue";
import MobileButton from "./MobileButton.vue";

import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const currentPath = route.path;

const props = defineProps<{
  logout: Function;
}>();

const navData = ref([
  {
    name: "Dashboard",
    action: () => router.push({ name: "admin-dashboard" }),
    isActive: false,
  },
  {
    name: "Order",
    action: () => router.push({ name: "admin-orders" }),
    isActive: false,
  },
  {
    name: "Product",
    action: () => router.push({ name: "admin-products" }),
    isActive: false,
  },
  {
    name: "Logout",
    action: () => props.logout(),
    isActive: false,
  },
]);

const getPathIndex = (path: string): number => {
  let index = -1;
  switch (path) {
    case "/admin/dashboard":
      index = navData.value.findIndex((data) => data.name === "Dashboard");
      break;
    case "/admin/orders":
      index = navData.value.findIndex((data) => data.name === "Order");
      break;
    default:
      index = navData.value.findIndex((data) => data.name === "Product");
  }
  return index;
};

onMounted(() => {
  const pathIndex = getPathIndex(currentPath);
  if (pathIndex >= 0) {
    navData.value[pathIndex].isActive = true;
  }
});
</script>
<template>
  <div
    class="flex lg:hidden w-screen bg-white-500 fixed bottom-0 left-0 z-15 justify-center">
    <div class="w-full bg-neutral-900 flex justify-around gap-5 p-4">
      <RouterLink
        to="/"
        class="hidden sm:block text-2xl font-semibold text-white"
        >Mart.shop</RouterLink
      >
      <MobileButton
        v-for="link in navData"
        :name="link.name"
        :action="link.action"
        :isActive="link.isActive"></MobileButton>
    </div>
  </div>
</template>
