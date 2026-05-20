import { describe, it, expect } from 'vitest'
import { filterProducts } from '../useProductSearch'
import type { ProductSummary } from '../../types/Product'

const products: ProductSummary[] = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: '999', imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S23', price: '800', imgUrl: '' },
  { id: '3', brand: 'Acer', model: 'Liquid Jade', price: '120', imgUrl: '' },
]

describe('filterProducts', () => {
  it('returns all products when query is empty', () => {
    expect(filterProducts(products, '')).toHaveLength(3)
  })

  it('returns all products when query is only whitespace', () => {
    expect(filterProducts(products, '   ')).toHaveLength(3)
  })

  it('filters by brand case-insensitively', () => {
    const result = filterProducts(products, 'apple')
    expect(result).toHaveLength(1)
    expect(result[0].brand).toBe('Apple')
  })

  it('filters by model case-insensitively', () => {
    const result = filterProducts(products, 'galaxy')
    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('Galaxy S23')
  })

  it('filters ignoring accents', () => {
    const result = filterProducts(products, 'líquid')
    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('Liquid Jade')
  })

  it('returns empty array when no products match', () => {
    expect(filterProducts(products, 'Nokia')).toHaveLength(0)
  })

  it('matches partial brand or model', () => {
    const result = filterProducts(products, 'iph')
    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('iPhone 14')
  })
})
