<script setup lang="ts">
import { useAdminProductStore } from "../../../store/admin/product";

const productStore = useAdminProductStore();

const props = defineProps<{
  id: string;
  status: boolean | undefined;
}>();

const toggleProductStatus = () => {
  const { id, status } = props;
  const newStatus = !status
  productStore.toggleProductStatus(id, newStatus)
};

</script>
<template>
  <div
    class="flex gap-2 items-center text-xs rounded-lg py-1 px-2 border border-neutral-200 w-max cursor-pointer"
    @click="toggleProductStatus">
    <div
      class="w-2 h-2 rounded-full"
      :class="status ? 'bg-green-600' : 'bg-red-600'"></div>
    <span>
      {{ status ? "Open" : "Closed" }}
    </span>
  </div>
</template>
