<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

import AlertBadge from "../components/AlertBadge.vue";
import Sidebar from "../components/seller/layout/Sidebar.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import MobileNavbar from "../components/seller/layout/MobileNavbar.vue";

const confirmState = ref<boolean>(false);
const authStore = useAuthStore();
const sideBarState = ref<boolean>(false);

</script>
<template>
  <div
    class="container mx-auto flex flex-row gap-5 relative h-max min-h-screen">
    <Sidebar
      :sideBarState="sideBarState"
      :toggleState="() => (sideBarState = !sideBarState)"
      :logout="() => (confirmState = true)">
    </Sidebar>
    <div class="flex-auto lg:p-8">
      <slot></slot>
    </div>
  </div>
  <MobileNavbar :logout="() => (confirmState = true)"></MobileNavbar>
  <AlertBadge></AlertBadge>
  <ConfirmModal
    v-if="confirmState"
    title="Logout"
    description="Are you sure to logout"
    :action="authStore.signout"
    :cancel="() => (confirmState = false)"></ConfirmModal>
</template>
