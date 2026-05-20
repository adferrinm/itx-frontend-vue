const TTL_MS = 60 * 60 * 1000

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

function buildKey(endpoint: string): string {
  return `cache:${endpoint}`
}

export function getCache<T>(endpoint: string): T | null {
  try {
    const raw = sessionStorage.getItem(buildKey(endpoint))
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry<T>
    if (Date.now() > entry.expiresAt) {
      sessionStorage.removeItem(buildKey(endpoint))
      return null
    }
    return entry.data
  } catch {
    return null
  }
}

export function setCache<T>(endpoint: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, expiresAt: Date.now() + TTL_MS }
    sessionStorage.setItem(buildKey(endpoint), JSON.stringify(entry))
  } catch {
    // sessionStorage quota exceeded — degrade gracefully to fresh fetches
  }
}
