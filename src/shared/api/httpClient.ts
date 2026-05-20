import { ApiError } from '../types/ApiError'
import { getCache, setCache } from './cache'

const BASE_URL = 'https://itx-frontend-test.onrender.com'

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options)
  if (!response.ok) {
    throw new ApiError(response.status, `Request failed: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}

export async function get<T>(endpoint: string): Promise<T> {
  const cached = getCache<T>(endpoint)
  if (cached !== null) return cached
  const data = await request<T>(endpoint)
  setCache(endpoint, data)
  return data
}

export async function post<TBody, TResponse>(endpoint: string, body: TBody): Promise<TResponse> {
  return request<TResponse>(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}
