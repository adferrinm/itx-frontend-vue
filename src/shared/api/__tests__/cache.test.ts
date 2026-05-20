import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getCache, setCache } from '../cache'

describe('cache', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.useRealTimers()
  })

  it('returns null when the key does not exist', () => {
    expect(getCache('/api/product')).toBeNull()
  })

  it('returns cached data before TTL expires', () => {
    setCache('/api/product', [{ id: '1' }])
    expect(getCache('/api/product')).toEqual([{ id: '1' }])
  })

  it('returns null and removes the entry after TTL expires', () => {
    vi.useFakeTimers()
    setCache('/api/product', [{ id: '1' }])
    vi.advanceTimersByTime(60 * 60 * 1000 + 1)
    expect(getCache('/api/product')).toBeNull()
    expect(sessionStorage.getItem('cache:/api/product')).toBeNull()
  })
})
