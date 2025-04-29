<script setup lang="ts">
import { storage } from "../../../firebase";
import { ref as refDB } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { uid } from "uid";
import { useAuthStore } from "../../../store/auth";

defineProps<{
  imgUrl: string;
}>();

const emit = defineEmits(["update:imgUrl"]);
const authStore = useAuthStore();

const handleFileInput = async (e: Event) => {
  try {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (file) {
      if (!file.type.includes("image")) {
        throw new Error("Wrong type");
      }
      const fileUid = uid();
      const path = `${authStore.userId}/${fileUid}`;
      const mountainsRef = refDB(storage, path);
      const response = await uploadBytes(mountainsRef, file);
      const downloadUrl = await getDownloadURL(response.ref);
      console.log("upload success");
      emit("update:imgUrl", downloadUrl);
    }
  } catch (error) {
    console.log("error from handle file : ", error);
  }
};
</script>
<template>
  <div class="flex flex-col gap-4 h-full w-full">
    <div class="flex gap-5 items-center">
      <h1 class="font-semibold">Cover image</h1>
      <input
        type="file"
        class="file-input file-input-ghost"
        @change="handleFileInput" />
    </div>
    <div
      class="flex-1 rounded-lg relative bg-contain bg-no-repeat bg-center"
      :class="imgUrl ? '' : 'bg-gray-200'"
      :style="{
        backgroundImage:
          `url(${imgUrl})`,
      }">
      <!-- <img v-if="imgUrl" :src="imgUrl" alt="cover-picture" class="h-full w-full object-contain"> -->
      <button
        type="button"
        class="btn btn-square absolute -top-4 -right-4"
        @click="() => emit('update:imgUrl', '')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="size-[1em]">
          <path
            d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </button>
    </div>
  </div>
</template>
