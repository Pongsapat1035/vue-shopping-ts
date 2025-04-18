<script setup lang="ts">
import ProductStatus from "./ProductStatus.vue";
import ProductStockStatus from "./ProductStockStatus.vue";
import { ref, onMounted } from "vue";
import type { AdminProductData } from "../../../types";
import EditQuantityModal from "./EditQuantityModal.vue";
import { useAdminProductStore } from "../../../store/admin/product";
import { useAlertStore } from "../../../store/alert";
import ProductOption from "./ProductOption.vue";

type ProductData = Pick<
  AdminProductData,
  "id" | "coverImg" | "name" | "remainQuantity" | "status"
>;

const props = defineProps<{
  data: ProductData;
}>();

const productStore = useAdminProductStore();
const alertStore = useAlertStore();

const quantityModalState = ref<boolean>(false);
const quantityModalMode = ref<string>("Add");
const editState = ref<boolean>(false);
const productStatus = ref<boolean | undefined>(false);

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

const toggleAddStockModal = () => {
  quantityModalState.value = true;
  quantityModalMode.value = "Add";
};

const toggleRemoveStockModal = () => {
  quantityModalState.value = true;
  quantityModalMode.value = "Remove";
};
onMounted(() => {
  const { status } = props.data;
  productStatus.value = status;
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
      <ProductOption
        :modalState="editState"
        :productId="data.id"
        :toggleAdd="toggleAddStockModal"
        :toggleRemove="toggleRemoveStockModal"
        :closeModal="() => (editState = false)"></ProductOption>
    </div>
  </li>
  <EditQuantityModal
    v-if="quantityModalState"
    :mode="quantityModalMode"
    :confirmModal="updateQuantity"
    :toggleModal="() => (quantityModalState = false)"></EditQuantityModal>
</template>
