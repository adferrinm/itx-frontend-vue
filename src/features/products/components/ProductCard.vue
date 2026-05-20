<script setup lang="ts">
import type { ProductSummary } from '../types/Product'

defineProps<{ product: ProductSummary }>()
</script>

<template>
  <button
    class="group w-full text-left bg-surface border border-hair rounded-2xl overflow-hidden hover:border-ink/40 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ink/60 focus:ring-offset-2 focus:ring-offset-canvas"
  >
    <div class="aspect-4/5 bg-hair-2 overflow-hidden">
      <img
        :src="product.imgUrl"
        :alt="`${product.brand} ${product.model}`"
        class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
    <div class="flex flex-col gap-1 p-4 sm:p-5">
      <div class="flex items-baseline justify-between gap-3">
        <p class="text-[11px] tracking-[0.12em] uppercase text-muted font-mono">
          {{ product.brand }}
        </p>
        <p class="text-[13.5px] font-medium tabular-nums">
          {{ product.price ? `${product.price} €` : '—' }}
        </p>
      </div>
      <h3 class="text-[15px] font-medium tracking-tight">{{ product.model }}</h3>
    </div>
  </button>
</template>
