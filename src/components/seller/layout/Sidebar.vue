<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

import NavLink from "./NavLink.vue";

const route = useRoute();
const currentPath = route.path;

const props = defineProps<{
  sideBarState: boolean;
  toggleState: Function;
  logout: Function;
}>();

const router = useRouter();

const navData = ref([
  {
    name: "Dashboard",
    action: () => router.push({ name: "admin-dashboard" }),
    isActive: false,
  },
  {
    name: "Order Management",
    action: () => router.push({ name: "admin-orders" }),
    isActive: false,
  },
  {
    name: "Product Management",
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
      index = navData.value.findIndex(
        (data) => data.name === "Order Management"
      );
      break;
    default:
      index = navData.value.findIndex(
        (data) => data.name === "Product Management"
      );
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
    class="hidden lg:block my-5 rounded-2xl py-8 px-5 bg-slate-900  duration-300 transition-all relative"
    :class="
      sideBarState ? 'w-[350px] min-w-[350px]' : 'w-[100px] min-w-[100px]'
    ">
    <div class="sticky top-5">
      <div
        class="flex justify-between"
        :class="sideBarState ? 'justify-between' : 'justify-center'">
        <RouterLink
          v-if="sideBarState"
          to="/"
          class="text-4xl font-semibold text-white"
          >Mart.shop</RouterLink
        >
        <button
          class="btn bg-transparent text-black border-0"
          @click="toggleState()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            class="size-[1rem] fill-white transition-all duration-300 ease-in-out"
            :class="sideBarState ? '' : 'rotate-180'">
            <path
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </button>
      </div>
      <div class="flex flex-col mt-10">
        <NavLink
          :state="sideBarState"
          v-for="data in navData"
          :name="data.name"
          :action="data.action"
          :isActive="data.isActive"></NavLink>
      </div>
    </div>
  </div>
</template>
