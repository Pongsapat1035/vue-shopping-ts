<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";

const router = useRouter();
const props = defineProps<{
  modalState: boolean;
  productId: string;
  closeModal: Function;
  toggleDeleteModal: Function;
}>();

const boxRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (boxRef.value && !boxRef.value.contains(target)) {
    props.closeModal();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <ul
    @click.stop
    v-if="modalState"
    ref="boxRef"
    class="min-w-30 absolute rounded-lg bg-white z-10 border border-neutral-200 p-1">
    <li
      class="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-all"
      @click="
        () =>
          router.push({
            name: 'seller-editproduct',
            params: { id: productId },
          })
      ">
      Edit
    </li>
    <div class="divider my-0"></div>
    <li
      class="px-4 py-2 cursor-pointer hover:bg-red-200 rounded-lg text-red-500 transition-all font-semibold"
      @click="toggleDeleteModal()">
      Delete
    </li>
  </ul>
</template>
