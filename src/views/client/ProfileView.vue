<script setup lang="ts">
import UserLayout from '../../layout/UserLayout.vue';

import Address from '../../components/client/profileSetting/Address.vue';
import ProfileSetting from '../../components/client/profileSetting/ProfileSetting.vue';
</script>
<template>
    <UserLayout>
        <div class="flex flex-col gap-10 w-2/4 mx-auto">
            <ProfileSetting></ProfileSetting>
            <Address></Address>
        </div>
    </UserLayout>
</template>
