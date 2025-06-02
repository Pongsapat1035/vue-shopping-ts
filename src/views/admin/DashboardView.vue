<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useAdminDashboard } from "../../store/admin/dashboard";

import SellerLayout from "../../layout/SellerLayout.vue";
import OrderChartWarpper from "../../components/seller/dashboard/OrderChartWarpper.vue";
import TotalBoxWarpper from "../../components/seller/dashboard/TotalBoxWarpper.vue";
import LastTransectionTable from "../../components/seller/dashboard/LastTransectionTable.vue";

const authStore = useAuthStore();
const dashboardStore = useAdminDashboard()
const userName = ref<string>("");
const welcomeMessage = ref<string>("Good morning")

const getWelcomeText = () => {
  const date = new Date();
  const hour = date.getHours();
  let welcomeText = "";

  if (hour >= 5 && hour <= 12) {
    welcomeText = "Good morning";
  } else if (hour > 12 && hour <= 17) {
    welcomeText = "Good afternoon";
  } else if (hour > 17 && hour <= 21) {
    welcomeText = "Good evening";
  } else {
    welcomeText = "Good night";
  }
  return welcomeText;
};

onMounted(async () => {
  userName.value = authStore.userInfo.name;
  welcomeMessage.value = getWelcomeText();
  await dashboardStore.loadDashboard()
});

</script>
<template>
  <SellerLayout>
    <div v-if="dashboardStore.isLoading" class="flex flex-col gap-12">
      <div class="flex gap-8">
        <div v-for="_ in 4" class="skeleton w-50 h-25"></div>
      </div>
      <div class="flex w-full skeleton h-80"></div>
      <div class="flex gap-8">
        <div class="skeleton rounded-full w-15 h-15"></div>
        <div class="skeleton w-1/2"></div>
      </div>
      <div class="skeleton w-full h-50"></div>
    </div>
    <div v-else class="w-full flex flex-col gap-8 p-5 pb-25">
      <h1 class="text-xl sm:text-3xl font-semibold">{{welcomeMessage}}, {{ userName }}</h1>
      <TotalBoxWarpper></TotalBoxWarpper>
      <OrderChartWarpper></OrderChartWarpper>
      <LastTransectionTable></LastTransectionTable>
    </div>
  </SellerLayout>
</template>
