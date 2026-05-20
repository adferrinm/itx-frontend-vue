import { get } from '../../../shared/api/httpClient'
import type { ProductSummary, ProductDetail } from '../types/Product'

const PRODUCTS_ENDPOINT = '/api/product'

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[]
  if (typeof value === 'string' && value) return [value]
  return []
}

// The API returns some array fields as strings for certain products — normalize at the boundary
function normalizeProductDetail(raw: ProductDetail): ProductDetail {
  return {
    ...raw,
    primaryCamera: toArray(raw.primaryCamera),
    secondaryCmera: toArray(raw.secondaryCmera),
    internalMemory: toArray(raw.internalMemory),
    wlan: toArray(raw.wlan),
    bluetooth: toArray(raw.bluetooth),
    sensors: toArray(raw.sensors),
    colors: toArray(raw.colors),
  }
}

export function fetchProducts(): Promise<ProductSummary[]> {
  return get<ProductSummary[]>(PRODUCTS_ENDPOINT)
}

export async function fetchProductById(id: string): Promise<ProductDetail> {
  const raw = await get<ProductDetail>(`${PRODUCTS_ENDPOINT}/${id}`)
  return normalizeProductDetail(raw)
}
