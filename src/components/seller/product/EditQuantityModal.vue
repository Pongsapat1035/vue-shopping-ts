<script setup lang="ts">
import InputTag from "../../InputTag.vue";
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  confirmModal: (quantity: number) => void;
  toggleModal: () => void;
  mode: string;
}>();

const quantity = ref<number>(0);
const bgRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;

  if (bgRef.value && !bgRef.value.contains(target)) {
    props.toggleModal();
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
  <div
    class="bg-gray-500/50 h-screen w-screen fixed top-0 left-0 z-10 flex justify-center items-center">
    <div
      ref="bgRef"
      class="flex flex-col bg-white shadow-lg rounded-2xl w-max min-w-[500px] p-8">
      <h3 class="text-lg font-bold">
        {{ mode === "add" ? "Add Quantity" : "Remove Quantity" }}
      </h3>
      <p class="py-4 text-neutral-500 font-light">
        Specify the quantity to add to the current product's inventory.
      </p>
      <InputTag
        title="Quantity"
        name="quantity"
        type="number"
        v-model:value="quantity"></InputTag>
      <div class="modal-action flex gap-3">
        <button class="btn" @click="toggleModal()">Cancel</button>
        <button class="btn btn-primary" @click="confirmModal(quantity)">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
