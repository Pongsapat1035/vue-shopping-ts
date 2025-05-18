<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  status: string;
}>();

const boxColor = computed(() => {
  return props.status === "Successful"
    ? "bg-green-100 text-green-700"
    : props.status === "Canceled"
    ? "bg-red-100 text-red-700"
    : "bg-blue-100 text-blue-700";
});
</script>
<template>
  <div
    class="font-semibold py-1 px-2 rounded-lg w-max"
    :class="boxColor">
    {{ status }}
  </div>
</template>
