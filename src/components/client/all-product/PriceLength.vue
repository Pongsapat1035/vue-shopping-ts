<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { useClientProductStore } from "../../../store/client/product";

const productStore = useClientProductStore();

const progress = ref<HTMLElement | null>(null);
const minPrice = 0;
const maxPrice = ref<number>(0);
const minRange = ref<number>(0);
const maxRange = ref<number>(100);

const updateProgress = (minValue: number, maxValue: number) => {
  const range = productStore.productMaxprice - minPrice;
  const valueRange = maxValue - minValue;

  const width = (valueRange / range) * 100;
  const minOffset = ((minValue - minPrice) / range) * 100;
 
  if (progress.value) {
    progress.value.style.width = `${width}%`; // Set the width of the progress bar
    progress.value.style.left = `${minOffset}%`; // Set the left offset of the progress bar
  }
};

const handleChange = () => {
  if (minRange.value >= maxRange.value && minRange.value !== 0) {
    if (minRange.value === 0) {
      minRange.value = 0;
    } else {
      minRange.value = maxRange.value - 1;
    }
  }
  if (maxRange.value <= minRange.value && minRange.value !== 0) {
    maxRange.value = minRange.value + 1;
  }
  updateProgress(minRange.value, maxRange.value);
};

const resetAllFilter = async () => {
  minRange.value = 0;
  maxRange.value = 0;
  await nextTick();
  maxRange.value = productStore.productMaxprice;
  updateProgress(minRange.value, maxRange.value);
  productStore.productQuery.variants = [];
  productStore.productQuery.searchText = "";
  productStore.productQuery.sortBy = "Newest First";
  productStore.queryProduct();
};

const handleSubmit = () => {
  productStore.productQuery.priceFilter.min = minRange.value;
  productStore.productQuery.priceFilter.max = maxRange.value;
  productStore.queryProduct();
  productStore.filterState = false;
};

onMounted(() => {
  maxRange.value = productStore.productQuery.priceFilter.max;
  maxPrice.value = productStore.productQuery.priceFilter.max;
  minRange.value = productStore.productQuery.priceFilter.min;
  updateProgress(minRange.value, maxRange.value);
});

</script>
<template>
  <div class="relative flex flex-col gap-3 overflow-hidden">
    <h1 class="text-xl font-semibold text-nowrap">Price Range</h1>
    <div class="flex justify-between">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Min. price</legend>
        <input
          type="number"
          class="text-sm"
          :min="minPrice"
          :max="productStore.productMaxprice"
          @input="handleChange"
          v-model.number="minRange" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Max. price</legend>
        <input
          type="number"
          class="text-sm"
          :min="minPrice"
          :max="productStore.productMaxprice"
          @input="handleChange"
          v-model.number="maxRange" />
      </fieldset>
    </div>
    <div class="rangeContainer grid grid-cols-1 relative z-10 w-full">
      <input
        class="col-1 row-1 pointer-events-none bg-transparent w-full"
        type="range"
        :min="minPrice"
        :max="productStore.productMaxprice"
        v-model.number="minRange"
        @input="handleChange" />
      <input
        class="col-1 row-1 pointer-events-none bg-transparent w-full"
        type="range"
        :min="minPrice"
        :max="productStore.productMaxprice"
        v-model.number="maxRange"
        @input="handleChange" />
    </div>
    <div
      class="absolute bg-neutral-200 w-full h-2 bottom-2 rounded-full z-0 overflow-hidden">
      <div ref="progress" class="h-full bg-blue-200 absolute"></div>
    </div>
  </div>
  <div class="flex gap-3 justify-end">
    <button class="btn btn-ghost rounded-xl" @click="resetAllFilter()">
      Reset
    </button>
    <button class="btn btn-primary rounded-xl" @click="handleSubmit()">
      Apply
    </button>
  </div>
</template>

<style>
.rangeContainer input[type="range"] {
  background: transparent;
  appearance: none;
}

.rangeContainer input[type="range"]::-webkit-slider-runnable-track {
  background: transparent;
}

.rangeContainer input[type="range"]::-moz-range-track {
  background: transparent;
}

.rangeContainer input[type="range"]::-ms-track {
  background: transparent;
  border-color: transparent;
  color: transparent;
}

.rangeContainer input::-webkit-slider-thumb {
  pointer-events: auto;
}
.rangeContainer input::-moz-range-thumb {
  pointer-events: auto;
  cursor: pointer;
  border-radius: 100%;
  background-color: rgb(51, 51, 221);
  border: none;
}
</style>
