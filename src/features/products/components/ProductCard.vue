<script setup lang="ts">
import type { ProductSummary } from '../types/Product'

defineProps<{ product: ProductSummary }>()
</script>

<template>
  <article
    class="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
  >
    <img
      :src="product.imgUrl"
      :alt="`${product.brand} ${product.model}`"
      class="h-40 w-full object-contain"
    />
    <div class="flex flex-col gap-1">
      <span class="text-sm text-gray-500">{{ product.brand }}</span>
      <span class="font-medium">{{ product.model }}</span>
      <span class="text-sm font-semibold">
        {{ product.price ? `${product.price} €` : 'Price not available' }}
      </span>
    </div>
  </article>
</template>
