<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductList } from '../composables/useProductList'
import ProductGrid from '../components/ProductGrid.vue'
import type { ProductSummary } from '../types/Product'

const router = useRouter()
const { products, isLoading, error, load } = useProductList()

onMounted(load)

function onProductSelect(product: ProductSummary): void {
  router.push({ name: 'product-detail', params: { id: product.id } })
}
</script>

<template>
  <div class="px-6 py-8">
    <p v-if="isLoading" class="text-center text-gray-500">Loading products...</p>
    <p v-else-if="error" class="text-center text-red-500">{{ error }}</p>
    <ProductGrid v-else :products="products" @select="onProductSelect" />
  </div>
</template>
