import { ref } from 'vue'
import type { Ref } from 'vue'
import { fetchProductById } from '../api/productsApi'
import type { ProductDetail } from '../types/Product'

interface UseProductDetailReturn {
  product: Ref<ProductDetail | null>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  load: (id: string) => Promise<void>
}

export function useProductDetail(): UseProductDetailReturn {
  const product = ref<ProductDetail | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function load(id: string): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      product.value = await fetchProductById(id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load product'
    } finally {
      isLoading.value = false
    }
  }

  return { product, isLoading, error, load }
}
