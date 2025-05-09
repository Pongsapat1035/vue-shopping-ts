<script setup lang="ts">
import { useAdminProductStore } from "../../../store/admin/product";

const value = defineModel<string[]>();

defineProps<{
  variantType: string;
}>();

const adminProductStore = useAdminProductStore();

</script>
<template>
  <fieldset
    class="fieldset flex flex-col gap-5 p-4 bg-base-100 border border-base-300 rounded-box w-full h-auto">
    <legend class="fieldset-legend text-xl">{{ variantType }}</legend>
    <div class="flex gap-2 flex-wrap">
      <div v-if="variantType === 'Color'" class="flex gap-2 flex-wrap">
        <label
          v-for="color in adminProductStore.colorsConfig"
          class="w-8 h-8 relative">
          <input
            type="checkbox"
            class="w-0 h-0 opacity-0 absolute peer"
            :value="color"
            v-model="value" />
          <div
            class="w-full h-full border-2 border-transparent peer-checked:border-black rounded-lg flex justify-center items-center font-semibold"
            :style="{ backgroundColor: color }"></div>
        </label>
      </div>
      <div v-else class="flex gap-2 flex-wrap">
        <label
          v-for="size in adminProductStore.sizesConfig"
          class="w-8 h-8 relative">
          <input
            type="checkbox"
            class="w-0 h-0 opacity-0 absolute peer"
            :value="size"
            v-model="value" />
          <div
            class="w-full h-full border-2 border-gray-100 peer-checked:border-gray-400 rounded-lg flex justify-center items-center font-semibold">
            {{ size }}
          </div>
        </label>
      </div>

      <button
        class="w-8 h-8 border-2 border-gray-100 rounded-lg btn btn-square"
        @click="value = []">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="size-[1rem] text-red-400"
          fill="#F7374F">
          <path
            d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32l0 32L160 64C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 160 0c88.4 0 160-71.6 160-160z" />
        </svg>
      </button>
    </div>
  </fieldset>
</template>
