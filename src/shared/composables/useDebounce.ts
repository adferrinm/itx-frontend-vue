import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay: number): Ref<T> {
  const debounced = ref<T>(source.value) as Ref<T>

  watch(source, (value) => {
    const timer = setTimeout(() => {
      debounced.value = value
    }, delay)
    return () => clearTimeout(timer)
  })

  return debounced
}
