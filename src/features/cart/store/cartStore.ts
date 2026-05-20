import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const CART_COUNT_KEY = 'cart:count'

export const useCartStore = defineStore('cart', () => {
  const count = ref<number>(Number(localStorage.getItem(CART_COUNT_KEY) ?? 0))

  watch(count, (value) => {
    localStorage.setItem(CART_COUNT_KEY, String(value))
  })

  function setCount(value: number): void {
    count.value = value
  }

  return { count, setCount }
})
