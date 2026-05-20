<script setup lang="ts">
import type { ProductDetail } from '../types/Product'

defineProps<{ product: ProductDetail }>()
</script>

<template>
  <div class="border-t border-hair pt-6">
    <p class="text-[11px] tracking-[0.14em] uppercase text-muted font-mono mb-5">Specifications</p>
    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
      <div
        v-for="[label, value] in [
          ['Brand', product.brand],
          ['Model', product.model],
          ['Price', product.price ? `${product.price} €` : 'Not available'],
          ['CPU', product.cpu],
          ['RAM', product.ram],
          ['Operating system', product.os],
          ['Screen resolution', product.displaySize],
          ['Battery', product.battery],
          ['Primary camera', product.primaryCamera.join(', ')],
          ['Secondary camera', product.secondaryCmera.join(', ')],
          ['Dimensions', product.dimentions],
          ['Weight', `${product.weight} g`],
        ]"
        :key="label"
        class="flex items-baseline justify-between gap-4 py-3 border-b border-hair text-[13.5px]"
      >
        <dt class="text-muted shrink-0">{{ label }}</dt>
        <dd class="text-ink text-right">{{ value }}</dd>
      </div>
    </dl>
  </div>
</template>
