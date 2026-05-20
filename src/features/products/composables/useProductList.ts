import { ref } from 'vue'
import type { Ref } from 'vue'
import { fetchProducts } from '../api/productsApi'
import type { ProductSummary } from '../types/Product'

interface UseProductListReturn {
  products: Ref<ProductSummary[]>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  load: () => Promise<void>
}

export function useProductList(): UseProductListReturn {
  const products = ref<ProductSummary[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function load(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      products.value = await fetchProducts()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load products'
    } finally {
      isLoading.value = false
    }
  }

  return { products, isLoading, error, load }
}
