import { get } from '../../../shared/api/httpClient'
import type { ProductSummary, ProductDetail } from '../types/Product'

const PRODUCTS_ENDPOINT = '/api/product'

export function fetchProducts(): Promise<ProductSummary[]> {
  return get<ProductSummary[]>(PRODUCTS_ENDPOINT)
}

export function fetchProductById(id: string): Promise<ProductDetail> {
  return get<ProductDetail>(`${PRODUCTS_ENDPOINT}/${id}`)
}
