<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ProductDetail } from '../types/Product'
import { addToCart } from '../../cart/api/cartApi'
import { useCartStore } from '../../cart/store/cartStore'
import { colorHex } from '../utils/colorUtils'

const props = defineProps<{ product: ProductDetail }>()

const cartStore = useCartStore()

const selectedColorCode = ref<number | null>(null)
const selectedStorageCode = ref<number | null>(null)
const isAdding = ref(false)
const addError = ref<string | null>(null)
const added = ref(false)

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
    await addToCart({
      id: props.product.id,
      colorCode: selectedColorCode.value!,
      storageCode: selectedStorageCode.value!,
    })
    // The mock API always returns count: 1 (stateless server) — increment locally on success
    cartStore.setCount(cartStore.count + 1)
    added.value = true
    setTimeout(() => (added.value = false), 1800)
  } catch (e) {
    addError.value = e instanceof Error ? e.message : 'Failed to add to cart'
  } finally {
    isAdding.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Color -->
    <div>
      <div class="flex items-baseline justify-between mb-3">
        <p class="text-[13px] font-medium">Color</p>
        <p class="text-[12px] text-muted">
          {{
            product.options.colors.find((c) => c.code === selectedColorCode)?.name ??
            'Choose a finish'
          }}
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in product.options.colors"
          :key="color.code"
          :aria-pressed="selectedColorCode === color.code"
          class="inline-flex items-center gap-2 h-10 pl-1.5 pr-3.5 rounded-full border transition"
          :class="
            selectedColorCode === color.code ? 'border-ink' : 'border-hair hover:border-ink/40'
          "
          @click="selectedColorCode = color.code"
        >
          <span
            class="w-7 h-7 rounded-full border border-hair/60 shrink-0"
            :style="{ background: colorHex(color.name) }"
          />
          <span class="text-[13px]">{{ color.name }}</span>
        </button>
      </div>
    </div>

    <!-- Storage -->
    <div>
      <div class="flex items-baseline justify-between mb-3">
        <p class="text-[13px] font-medium">Storage</p>
        <p class="text-[12px] text-muted">
          {{
            product.options.storages.find((s) => s.code === selectedStorageCode)?.name ??
            'Choose capacity'
          }}
        </p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          v-for="storage in product.options.storages"
          :key="storage.code"
          :aria-pressed="selectedStorageCode === storage.code"
          class="h-12 rounded-xl border text-[13px] font-medium transition"
          :class="
            selectedStorageCode === storage.code
              ? 'border-ink bg-ink text-white'
              : 'border-hair hover:border-ink/40'
          "
          @click="selectedStorageCode = storage.code"
        >
          {{ storage.name }}
        </button>
      </div>
    </div>

    <p v-if="addError" class="text-sm text-red-500">{{ addError }}</p>

    <!-- Add to cart -->
    <button
      :disabled="!canAdd || isAdding"
      class="h-12 rounded-full text-[14px] font-medium transition"
      :class="
        canAdd ? 'bg-ink text-white hover:bg-ink-2' : 'bg-hair-2 text-faint cursor-not-allowed'
      "
      @click="onAddToCart"
    >
      <span v-if="added" class="inline-flex items-center gap-2">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Added
      </span>
      <span v-else-if="isAdding">Adding…</span>
      <span v-else>{{ canAdd ? 'Add to cart' : 'Select color &amp; storage' }}</span>
    </button>
  </div>
</template>
