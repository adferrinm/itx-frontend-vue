<script setup lang="ts">
import type { ProductSummary } from '../types/Product'
import ProductCard from './ProductCard.vue'

defineProps<{ products: ProductSummary[] }>()
defineEmits<{ select: [product: ProductSummary] }>()
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <li v-for="product in products" :key="product.id">
      <ProductCard :product="product" @click="$emit('select', product)" />
    </li>
  </ul>
</template>
