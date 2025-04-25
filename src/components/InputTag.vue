<script setup lang="ts">
import { ref } from "vue";
import {
  isEmail,
  isNumber,
  isPhoneNumber,
  isNotEmpty,
  isPostCode
} from "@/utils/validation.ts";
import type { ValidateResult } from "@/utils/validation";

const props = defineProps<{
  title: string;
  name: string;
  type: string;
  placeHolderText?: string;
  validateWith?: string;
  error?: string;
}>();

const value = defineModel("value");

const errorMsg = ref("");
const emit = defineEmits(["update:error"]);

const validateHandle = (input: string | number) => {
  const validateType = props.validateWith;
  switch (validateType) {
    case "email":
      const emailValidate: ValidateResult = isEmail(input.toString());
      errorMsg.value = !emailValidate.isValid ? emailValidate.message : "";
      break;
    case "number":
      const numberValidate: ValidateResult = isNumber(Number(input));
      errorMsg.value = !numberValidate.isValid ? numberValidate.message : "";
      break;
    case "phoneNumber":
      const phoneNumberValidate: ValidateResult = isPhoneNumber(input.toString());
      errorMsg.value = !phoneNumberValidate.isValid
        ? phoneNumberValidate.message
        : "";
      break;
    case "postcode":
      const postcodeValidate: ValidateResult = isPostCode(input.toString());
      errorMsg.value = !postcodeValidate.isValid ? postcodeValidate.message : "";
    break
    case "isNotEmpty":
      const isEmptyValidate: ValidateResult = isNotEmpty(input.toString());
      errorMsg.value = !isEmptyValidate.isValid ? isEmptyValidate.message : "";
      break;
    default:
      break;
  }
   emit("update:error", errorMsg.value);
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  validateHandle(target.value);
};
</script>

<template>
  <fieldset class="flex flex-col gap-2">
    <legend class="font-semibold mb-2">{{ title }}</legend>
    <div
      class="px-4 py-3 bg-gray-100 rounded-lg"
      :class="errorMsg !== '' ? 'border border-red-300' : ''">
      <input
        :type="type"
        :name="name"
        v-model="value"
        class="outline-none w-full font-light text-sm"
        :placeholder="placeHolderText"
        @input="handleInput" />
    </div>
    <p class="text-red-400 text-xs ml-2">{{ errorMsg }}</p>
  </fieldset>
</template>
