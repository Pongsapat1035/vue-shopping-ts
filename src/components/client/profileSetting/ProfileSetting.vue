<script setup lang="ts">
import { ref as refDB } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { uid } from "uid";

import { useAuthStore } from "@/store/auth";
import { useAlertStore } from "@/store/alert.ts";
import { storage } from "@/firebase.ts";

import InputTag from "@/components/InputTag.vue";

const name = defineModel<string>("name");
const errMsg = defineModel<string>("error");
const profileImg = defineModel<string>("profileImg");
const authStore = useAuthStore();
const alertStore = useAlertStore();

const handleFileSubmit = async (e: Event) => {
  try {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (file) {
      if (!file.type.includes("image")) throw new Error("Wrong type");
      
      const fileUid = uid();
      const path = `${authStore.userId}/profile/${fileUid}`;
      const mountainsRef = refDB(storage, path);
      const response = await uploadBytes(mountainsRef, file);
      const downloadUrl = await getDownloadURL(response.ref);

      profileImg.value = downloadUrl;
      alertStore.toggleAlert("Success", "Upload Profile success!");
    }
  } catch (error) {
    const errorMsg = error.message;
    console.log("error from handle file : ", errorMsg);
    alertStore.toggleAlert("Error", errorMsg);
  }
};
</script>
<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-3xl font-bold">Profile setting</h1>
    <p class="text-neutral-500 font-light mb-8">
      The Profile Settings section lets users instantly update their public
      identity by uploading a new profile picture and editing their display
      name, with changes saved and reflected across the app in real time.
    </p>
    <div class="flex flex-col gap-3">
      <div class="flex gap-5 items-center">
        <div class="avatar">
          <div class="w-30 rounded-full">
            <img
              :src="
                profileImg 
              " />
          </div>
        </div>
        <input
          type="file"
          class="file-input file-input-ghost"
          @change="handleFileSubmit" />
        <button class="btn btn-secondary" @click="profileImg = ''">
          Remove picture
        </button>
      </div>
    </div>
    <InputTag
      name="name"
      title="Profile name"
      type="text"
      v-model:value="name"
      v-model:error="errMsg"
      validateWith="isNotEmpty"
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
