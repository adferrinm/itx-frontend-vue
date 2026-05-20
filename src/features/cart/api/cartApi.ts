import { post } from '../../../shared/api/httpClient'

const CART_ENDPOINT = '/api/cart'

interface AddToCartBody {
  id: string
  colorCode: number
  storageCode: number
}

interface AddToCartResponse {
  count: number
}

export function addToCart(body: AddToCartBody): Promise<AddToCartResponse> {
  return post<AddToCartBody, AddToCartResponse>(CART_ENDPOINT, body)
}
