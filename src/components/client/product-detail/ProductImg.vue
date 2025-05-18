<script setup lang="ts">
defineProps<{
  coverImg: string;
}>();
</script>
<template>
  <div class=" w-1/2 p-5 h-full overflow-hidden flex justify-center items-center">
      <img :src="coverImg"  class="w-full h-full object-contain"/>
  </div>
</template>
