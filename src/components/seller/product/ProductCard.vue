<script setup lang="ts">
import { ref } from "vue";
import type { ProductData, ProductInfo, TotalQuantity } from "../../../types";
import { useAlertStore } from "../../../store/alert";
import { useAdminProductStore } from "../../../store/admin/product";
import { useRouter } from "vue-router";

import ProductStatus from "./ProductStatus.vue";
import ProductStockStatus from "./ProductStockStatus.vue";
import ConfirmModal from "../../ConfirmModal.vue";

type ProductListsData = Pick<ProductData, "id" | "status"> &
  Pick<ProductInfo, "coverImg" | "name"> &
  Pick<TotalQuantity, "remainQty">;

const confirmState = ref<boolean>(false);

const props = defineProps<{
  data: ProductListsData;
}>();

const alertStore = useAlertStore();
const productStore = useAdminProductStore();
const router = useRouter();

const handleDelete = async () => {
  try {
    const { id } = props.data;
    await productStore.deleteProduct(id ?? "");
    alertStore.toggleAlert("Success", `Delete product success`);
  } catch (error) {
    if (error instanceof Error) alertStore.toggleAlert("Error", error.message);
    console.log(error);
  }
};
</script>
<template>
  <div class="flex flex-col gap-1 border border-neutral-200 rounded-lg p-5">
    <div class="flex justify-between">
      <div class="w-18 h-18 rounded-xl overflow-hidden">
        <img :src="data.coverImg" class="w-full h-full object-contain" />
      </div>
      <div class="flex gap-2">
        <button
          class="btn btn-circle"
          @click="
            () =>
              router.push({
                name: 'admin-editproduct',
                params: { id: data.id },
              })
          ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="size-[1rem]">
            <path
              d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
          </svg>
        </button>
        <button class="btn btn-circle" @click="() => (confirmState = true)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="size-[1rem]">
            <path
              d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex justify-between items-center h-7 mt-5">
      <h1 class="font-semibold text-sm">Name</h1>
      <p class="font-light text-sm text-neutral-500">{{ data.name }}</p>
    </div>
    <div class="divider my-0"></div>
    <div class="flex justify-between items-center h-7">
      <h1 class="font-semibold text-sm">Quantity</h1>
      <p class="font-light text-sm text-neutral-500">{{ data.remainQty }}</p>
    </div>
    <div class="flex justify-between items-center h-7">
      <h1 class="font-semibold text-sm">Stock</h1>
      <ProductStockStatus :qty="data.remainQty"></ProductStockStatus>
    </div>
    <div class="flex justify-between items-center h-7">
      <h1 class="font-semibold text-sm">Status</h1>
      <ProductStatus
        :id="data.id ?? ''"
        v-model:status="data.status"></ProductStatus>
    </div>
  </div>
  <ConfirmModal
    v-if="confirmState"
    title="Delete product"
    description="Are you sure to delete product ?"
    :action="handleDelete"
    :cancel="() => (confirmState = false)"></ConfirmModal>
</template>
