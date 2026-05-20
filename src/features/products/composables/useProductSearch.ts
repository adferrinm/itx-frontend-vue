import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { ProductSummary } from '../types/Product'
import { useDebounce } from '../../../shared/composables/useDebounce'

const DEBOUNCE_MS = 300

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .toLowerCase()
}

export function filterProducts(products: ProductSummary[], query: string): ProductSummary[] {
  const q = normalize(query.trim())
  if (!q) return products
  return products.filter((p) => normalize(p.brand).includes(q) || normalize(p.model).includes(q))
}

interface UseProductSearchReturn {
  query: Ref<string>
  filteredProducts: ComputedRef<ProductSummary[]>
}

export function useProductSearch(products: Ref<ProductSummary[]>): UseProductSearchReturn {
  const query = ref('')
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS)

  const filteredProducts = computed(() => filterProducts(products.value, debouncedQuery.value))

  return { query, filteredProducts }
}
