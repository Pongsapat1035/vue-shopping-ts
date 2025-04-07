<script setup lang="ts">
import { useAlertStore } from "../store/alert";

const alertStore = useAlertStore();

</script>

<template>
  <div v-if="alertStore.alertState" class="toast toast-end">
    <div
      class="alert alert-info"
      :class="
        alertStore.alertType === 'success' ? 'alert-success' : 'alert-error'
      ">
      <span>{{ alertStore.alertMessage }}</span>
    </div>
  </div>
</template>
