<script setup lang="ts">
import { ref } from "vue";

import { useAdminProductStore } from "../../../store/admin/product";
import { useAlertStore } from "../../../store/alert";
import type { ProductData, TotalQuantity, ProductInfo } from "../../../types";

import ProductStatus from "./ProductStatus.vue";
import ProductStockStatus from "./ProductStockStatus.vue";
import ProductOption from "./ProductOption.vue";
import ConfirmModal from "../../ConfirmModal.vue";

type ProductListsData = Pick<ProductData, "id" | "status"> &
  Pick<ProductInfo, "coverImg" | "name"> &
  Pick<TotalQuantity, "remainQty">;

const props = defineProps<{
  data: ProductListsData;
}>();

const productStore = useAdminProductStore();
const alertStore = useAlertStore();
const confirmState = ref<boolean>(false);
const editState = ref<boolean>(false);

const handleDelete = async () => {
  try {
    const { id } = props.data;
    await productStore.deleteProduct(id ?? "");
    alertStore.toggleAlert("Success", `Delete product success`);
  } catch (error) {
    if(error instanceof Error)
      alertStore.toggleAlert("Error", error.message);
    console.log(error);
  }
};

</script>
<template>
  <li class="list-row grid grid-cols-6 items-center">
    <div class="w-20 h-20 rounded-xl overflow-hidden justify-self-center">
      <img :src="data.coverImg" class="w-full h-full object-contain" />
    </div>
    <div class="text-xs uppercase font-semibold">{{ data.name }}</div>
    <div class="text-xs uppercase font-semibold">{{ data.remainQty }}</div>
    <div class="text-xs uppercase font-semibold">
      <ProductStockStatus :qty="data.remainQty"></ProductStockStatus>
    </div>
    <div class="text-xs uppercase font-semibold">
      <ProductStatus
        :id="data.id ?? ''"
        v-model:status="data.status"></ProductStatus>
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
        :productId="data.id ?? ''"
        :closeModal="() => (editState = false)"
        :toggleDeleteModal="() => (confirmState = true)"></ProductOption>
    </div>
  </li>
  <ConfirmModal
    v-if="confirmState"
    title="Delete product"
    description="Are you sure to delete product ?"
    :action="handleDelete"
    :cancel="() => (confirmState = false)"></ConfirmModal>
</template>
