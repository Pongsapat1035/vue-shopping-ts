<script setup lang="ts">
import { watch } from "vue";
import validateHandle from "../utils/validation";

const props = defineProps<{
  title: string;
  name: string;
  type: string;
  immediate?: boolean;
  placeHolderText?: string;
  validateWith?: string;
  error?: string;
}>();

const value = defineModel<any>("value");
const emit = defineEmits(["update:error"]);

watch(
  () => value.value,
  () => {
     const msg = validateHandle(props.validateWith,value.value);
     emit("update:error", msg);
  },
  { immediate: props.immediate ? props.immediate : false }
);
</script>

<template>
  <fieldset class="flex flex-col gap-2">
    <legend class="font-semibold mb-2">{{ title }}</legend>
    <div
      class="px-4 py-3 bg-gray-100 rounded-lg"
      :class="error !== '' ? 'border border-red-300' : ''">
      <input
        :type="type"
        :name="name"
        v-model="value"
        class="outline-none w-full font-light text-sm"
        :placeholder="placeHolderText" />
    </div>
    <p class="text-red-400 text-xs ml-2">{{ error }}</p>
  </fieldset>
</template>
