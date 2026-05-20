import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProductList } from '../useProductList'
import * as productsApi from '../../api/productsApi'
import type { ProductSummary } from '../../types/Product'

const mockProducts: ProductSummary[] = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: '999', imgUrl: '' },
]

describe('useProductList', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('starts with empty products and no loading state', () => {
    const { products, isLoading, error } = useProductList()
    expect(products.value).toEqual([])
    expect(isLoading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('sets isLoading true while fetching and false after', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(mockProducts)
    const { isLoading, load } = useProductList()
    const promise = load()
    expect(isLoading.value).toBe(true)
    await promise
    expect(isLoading.value).toBe(false)
  })

  it('populates products on successful fetch', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(mockProducts)
    const { products, load } = useProductList()
    await load()
    expect(products.value).toEqual(mockProducts)
  })

  it('sets error message when fetch fails', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockRejectedValue(new Error('Network error'))
    const { error, load } = useProductList()
    await load()
    expect(error.value).toBe('Network error')
  })
})
