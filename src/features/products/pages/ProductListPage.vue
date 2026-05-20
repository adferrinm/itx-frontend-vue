<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductList } from '../composables/useProductList'
import { useProductSearch } from '../composables/useProductSearch'
import AppLayout from '../../../shared/ui/AppLayout.vue'
import ProductGrid from '../components/ProductGrid.vue'
import ProductSearchBar from '../components/ProductSearchBar.vue'
import type { ProductSummary } from '../types/Product'

const router = useRouter()
const { products, isLoading, error, load } = useProductList()
const { query, filteredProducts } = useProductSearch(products)

onMounted(load)

function onProductSelect(product: ProductSummary): void {
  router.push({ name: 'product-detail', params: { id: product.id } })
}
</script>

<template>
  <AppLayout>
    <div class="px-6 py-8 flex flex-col gap-6">
      <div class="flex justify-end">
        <ProductSearchBar v-model="query" />
      </div>
      <p v-if="isLoading" class="text-center text-gray-500">Loading products...</p>
      <p v-else-if="error" class="text-center text-red-500">{{ error }}</p>
      <template v-else>
        <ProductGrid
          v-if="filteredProducts.length"
          :products="filteredProducts"
          @select="onProductSelect"
        />
        <p v-else class="text-center text-gray-500">No products match your search.</p>
      </template>
    </div>
  </AppLayout>
</template>
