<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { useAuthStore } from "../../store/auth";
import { useAlertStore } from "../../store/alert";
import type { UserInfo } from "../../types";
import { allErrorEmpty, allInputIsFilled } from "../../utils/validate.method";

import UserLayout from "@/layout/UserLayout.vue";
import Address from "@/components/client/profileSetting/Address.vue";
import ProfileSetting from "@/components/client/profileSetting/ProfileSetting.vue";

const authStore = useAuthStore();
const alertStore = useAlertStore();

const userInfo = reactive<UserInfo>({
  profileImg: "",
  name: "",
  email: "",
  role: "",
  addressInfo: {
    name: "",
    tel: "",
    address: "",
    district: "",
    province: "",
    postcode: "",
  },
});

const errorMsg = reactive<UserInfo>({
  profileImg: "",
  name: "",
  email: "",
  role: "",
  addressInfo: {
    name: "",
    tel: "",
    address: "",
    district: "",
    province: "",
    postcode: "",
  },
});

const fetchUserInfo = async () => {
  try {
    await authStore.loadUserInfo();
    const { profileImg, name, email, addressInfo, role } = authStore.userInfo;
    userInfo.profileImg =
      profileImg ||
      "https://www.thaimediafund.or.th/wp-content/uploads/2024/04/blank-profile-picture-973460_1280.png";
    userInfo.email = email;
    userInfo.role = role;
    userInfo.addressInfo = addressInfo;
    userInfo.name = name;
  } catch (error) {
    console.log(error);
  }
};

const validateInput = () => {
  const isErrorEmpty = allErrorEmpty(errorMsg);
  if (!isErrorEmpty) throw new Error("Please check your input again");

  const checkEmptyInput = allInputIsFilled(userInfo);
  if (!checkEmptyInput) throw new Error("Please fill all input");
};

const handleSubmit = async () => {
  try {
    validateInput();
    await authStore.updateUserInfo(userInfo);
    alertStore.toggleAlert("Success", "Update profile success !");
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      const errMsg = error.message;
      const checkWarningMsg =
        errMsg === "Please check your input again" ||
        errMsg === "Please fill all input";
      alertStore.toggleAlert(checkWarningMsg ? "Warning" : "Error", errMsg);
    }
  }
};

onMounted(async () => {
  await fetchUserInfo();
});
</script>
<template>
  <UserLayout>
    <div
      class="flex flex-col gap-10 w-full md:w-3/4 lg:w-2/4 px-8 md:px-0 mx-auto">
      <ProfileSetting
        v-model:name="userInfo.name"
        v-model:profileImg="userInfo.profileImg"
        v-model:error="errorMsg.name"></ProfileSetting>
      <Address
        v-model:address="userInfo.addressInfo"
        v-model:error="errorMsg.addressInfo"></Address>
      <div class="self-end flex gap-5 mt-8">
        <button class="btn btn-primary" @click="handleSubmit">
          Update profile
        </button>
      </div>
    </div>
  </UserLayout>
</template>
