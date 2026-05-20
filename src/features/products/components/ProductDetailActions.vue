<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ProductDetail } from '../types/Product'
import { addToCart } from '../../cart/api/cartApi'
import { useCartStore } from '../../cart/store/cartStore'

const props = defineProps<{ product: ProductDetail }>()

const cartStore = useCartStore()

const selectedColorCode = ref<number | null>(null)
const selectedStorageCode = ref<number | null>(null)
const isAdding = ref(false)
const addError = ref<string | null>(null)

// Pre-select when only one option — exercise requirement
watch(
  () => props.product,
  (p) => {
    if (p.options.colors.length === 1) selectedColorCode.value = p.options.colors[0].code
    if (p.options.storages.length === 1) selectedStorageCode.value = p.options.storages[0].code
  },
  { immediate: true }
)

const canAdd = computed(
  () => selectedColorCode.value !== null && selectedStorageCode.value !== null
)

async function onAddToCart(): Promise<void> {
  if (!canAdd.value) return
  isAdding.value = true
  addError.value = null
  try {
    const { count } = await addToCart({
      id: props.product.id,
      colorCode: selectedColorCode.value!,
      storageCode: selectedStorageCode.value!,
    })
    cartStore.setCount(count)
  } catch (e) {
    addError.value = e instanceof Error ? e.message : 'Failed to add to cart'
  } finally {
    isAdding.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <span class="text-sm font-semibold uppercase tracking-wide text-gray-500">Color</span>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in product.options.colors"
          :key="color.code"
          :aria-pressed="selectedColorCode === color.code"
          class="rounded-lg border px-3 py-1 text-sm transition-colors"
          :class="
            selectedColorCode === color.code
              ? 'border-gray-800 bg-gray-800 text-white'
              : 'border-gray-300 hover:border-gray-500'
          "
          @click="selectedColorCode = color.code"
        >
          {{ color.name }}
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm font-semibold uppercase tracking-wide text-gray-500">Storage</span>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="storage in product.options.storages"
          :key="storage.code"
          :aria-pressed="selectedStorageCode === storage.code"
          class="rounded-lg border px-3 py-1 text-sm transition-colors"
          :class="
            selectedStorageCode === storage.code
              ? 'border-gray-800 bg-gray-800 text-white'
              : 'border-gray-300 hover:border-gray-500'
          "
          @click="selectedStorageCode = storage.code"
        >
          {{ storage.name }}
        </button>
      </div>
    </div>

    <p v-if="addError" class="text-sm text-red-500">{{ addError }}</p>

    <button
      :disabled="!canAdd || isAdding"
      class="rounded-lg bg-gray-800 px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
      @click="onAddToCart"
    >
      {{ isAdding ? 'Adding...' : 'Add to cart' }}
    </button>
  </div>
</template>
