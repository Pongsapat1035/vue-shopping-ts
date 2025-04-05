<script setup lang="ts">
import InputTag from "../../InputTag.vue";
import { useAuthStore } from "../../../store/auth";
import { storage } from "../../../firebase";
import { ref as refDB } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { uid } from "uid";
const name = defineModel<string>("name");
const profileImg = defineModel<string>("profileImg");
const authStore = useAuthStore();

const handleFileSubmit = async (e: Event) => {
  try {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (file) {
      if (!file.type.includes("image")) {
        throw new Error("Wrong type");
      }
      const fileUid = uid();
      const path = `${authStore.userId}/profile/${fileUid}`;
      const mountainsRef = refDB(storage, path);
      const response = await uploadBytes(mountainsRef, file);
      const downloadUrl = await getDownloadURL(response.ref);
      console.log("upload success");
      profileImg.value = downloadUrl;
    }
  } catch (error) {
    console.log("error from handle file : ", error);
  }
};
</script>
<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-3xl font-bold">Profile setting</h1>
    <p class="text-slate-400 font-light mb-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum autem
      corrupti sapiente odio. Mollitia sequi ducimus deleniti odit!
    </p>
    <div class="flex flex-col gap-3">
      <div class="flex gap-5 items-center">
        <div class="avatar">
          <div class="w-30 rounded-full">
            <img
              :src="
                profileImg ||
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              " />
          </div>
        </div>
        <input
          type="file"
          class="file-input file-input-ghost"
          @change="handleFileSubmit" />
        <button class="btn btn-secondary" @click="profileImg = ''">
          Delete picture
        </button>
      </div>
    </div>

    <InputTag
      name="name"
      title="Profile name"
      type="text"
      v-model:value="name"
      placeHolderText=""></InputTag>
    <fieldset class="flex flex-col gap-2">
      <legend class="font-semibold mb-2">Email</legend>
      <div class="px-4 py-3 bg-gray-100 rounded-lg">
        <input
          type="email"
          name="email"
          :value="authStore.userInfo.email"
          class="outline-none w-full font-light text-sm"
          disabled />
      </div>
    </fieldset>
  </div>
</template>
