<script setup lang="ts">
import ProductStatus from "./ProductStatus.vue";
import ProductStockStatus from "./ProductStockStatus.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import type { AdminProductData } from "../../../types";
import EditQuantityModal from "./EditQuantityModal.vue";
import { useAdminProductStore } from "../../../store/admin/product";
import { useAlertStore } from "../../../store/alert";

type ProductData = Pick<
  AdminProductData,
  "id" | "coverImg" | "name" | "remainQuantity" | "status"
>;

const props = defineProps<{
  data: ProductData;
}>();

const router = useRouter();
const productStore = useAdminProductStore();
const alertStore = useAlertStore();

const quantityModalState = ref<boolean>(false);
const quantityModalMode = ref<string>("Add");
const editState = ref<boolean>(false);
const boxRef = ref<HTMLElement | null>(null);
const productStatus = ref<boolean | undefined>(false);

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (boxRef.value && !boxRef.value.contains(target)) {
    editState.value = false;
  }
};

const updateQuantity = (newQuantity: number) => {
  const { id, remainQuantity } = props.data;
  if (
    quantityModalMode.value === "Remove" &&
    remainQuantity &&
    remainQuantity < newQuantity
  ) {
    alertStore.toggleAlert(
      "Error",
      "Can't remove product more than remain quantity"
    );
    quantityModalState.value = false;
    return;
  }
  productStore.updateQuantity(id, newQuantity, quantityModalMode.value);
  quantityModalState.value = false;
};

onMounted(() => {
  const { status } = props.data;
  productStatus.value = status;
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <li class="list-row grid grid-cols-6 items-center">
    <div class="w-20 h-20 rounded-xl overflow-hidden justify-self-center">
      <img :src="data.coverImg" class="w-full h-full object-contain" />
    </div>
    <div class="text-xs uppercase font-semibold">{{ data.name }}</div>
    <div class="text-xs uppercase font-semibold">{{ data.remainQuantity }}</div>
    <div class="text-xs uppercase font-semibold">
      <ProductStockStatus :qty="data.remainQuantity"></ProductStockStatus>
    </div>
    <div class="text-xs uppercase font-semibold">
      <ProductStatus
        :id="data.id"
        v-model:status="productStatus"></ProductStatus>
    </div>
    <div class="relative">
      <button class="cursor-pointer p-1" @click.stop="() => (editState = true)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="size-[1rem]">
          <path
            d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
        </svg>
      </button>
      <ul
        @click.stop
        v-if="editState"
        ref="boxRef"
        class="absolute rounded-lg bg-white z-10 border border-neutral-200 p-1">
        <li
          class="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-all"
          @click="
            () =>
              router.push({
                name: 'seller-editproduct',
                params: { id: data.id },
              })
          ">
          Edit
        </li>
        <li
          class="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-all"
          @click="
            () => {
              quantityModalState = true;
              quantityModalMode = 'Add';
            }
          ">
          Add Stock
        </li>
        <li
          class="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-all"
          @click="
            () => {
              quantityModalState = true;
              quantityModalMode = 'Remove';
            }
          ">
          Remove Stock
        </li>
        <li
          class="px-4 py-2 cursor-pointer hover:bg-red-200 rounded-lg text-red-500 transition-all font-semibold">
          Delete
        </li>
      </ul>
    </div>
  </li>
  <EditQuantityModal
    v-if="quantityModalState"
    :mode="quantityModalMode"
    :confirmModal="updateQuantity"
    :toggleModal="() => (quantityModalState = false)"></EditQuantityModal>
</template>
