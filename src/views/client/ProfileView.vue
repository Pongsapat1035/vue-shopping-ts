<script setup lang="ts">
import UserLayout from "../../layout/UserLayout.vue";
import Address from "../../components/client/profileSetting/Address.vue";
import ProfileSetting from "../../components/client/profileSetting/ProfileSetting.vue";
import { onMounted, reactive } from "vue";
import { useAuthStore } from "../../store/auth";

const authStore = useAuthStore();
interface AddressInfo {
  name: string;
  tel: string;
  address: string;
  district: string;
  province: string;
  postcode: string;
}

interface UserInfo {
  name: string;
  email: string;
  profileImg: string;
  addressInfo: AddressInfo;
}

const userInfo = reactive<UserInfo>({
  profileImg: "",
  name: "",
  email: "",
  addressInfo: {
    name: "",
    tel: "",
    address: "",
    district: "",
    province: "",
    postcode: "",
  },
});
onMounted(async () => {
  try {
    await authStore.loadUserInfo();
    const { profileImg, name, email, addressInfo } = authStore.userInfo;
    userInfo.profileImg = profileImg;
    userInfo.email = email;
    userInfo.addressInfo = addressInfo;
    userInfo.name = name;
    console.log(userInfo);
  } catch (error) {
    console.log(error);
  }
});
const handleSubmit = async () => {
  console.log(userInfo);
  try{
    await authStore.updateUserInfo(userInfo)
  } catch(error) {
    console.log(error)
  }
};
</script>
<template>
  <UserLayout>
    <div class="flex flex-col gap-10 w-2/4 mx-auto">
      <ProfileSetting v-model:name="userInfo.name" v-model:profileImg="userInfo.profileImg"></ProfileSetting>
      <Address v-model="userInfo.addressInfo"></Address>
      <div class="self-end flex gap-5 mt-8">
        <button class="btn">Clear</button>
        <button class="btn btn-primary" @click="handleSubmit">
          Update address
        </button>
      </div>
    </div>
  </UserLayout>
</template>
