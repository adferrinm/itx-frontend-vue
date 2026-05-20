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
    <template #search>
      <ProductSearchBar v-model="query" />
    </template>

    <section class="max-w-[1240px] mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-16">
      <div class="flex items-end justify-between flex-wrap gap-4 mb-8 sm:mb-10">
        <div>
          <h1 class="text-[28px] sm:text-[40px] leading-[1.05] tracking-tight font-medium">
            All phones.
          </h1>
          <p class="text-muted mt-2 text-[14px]">
            <template v-if="isLoading">Loading…</template>
            <template v-else-if="!error">
              {{ filteredProducts.length }} of {{ products.length }} models
              <template v-if="query"> matching "{{ query }}"</template>
            </template>
          </p>
        </div>
        <div class="hidden md:flex items-center gap-1.5 text-[12px] text-muted font-mono">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
          In stock · ships in 24h
        </div>
      </div>

      <p v-if="isLoading" class="text-center text-muted py-20">Loading products…</p>
      <p v-else-if="error" class="text-center text-red-500 py-20">{{ error }}</p>
      <template v-else>
        <ProductGrid
          v-if="filteredProducts.length"
          :products="filteredProducts"
          @select="onProductSelect"
        />
        <div v-else class="border border-hair rounded-2xl p-12 text-center">
          <p class="text-[15px] font-medium">No matches</p>
          <p class="text-muted text-[13px] mt-1">Try a different brand or model name.</p>
        </div>
      </template>
    </section>
  </AppLayout>
</template>
