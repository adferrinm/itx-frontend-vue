<script setup lang="ts">
import { useCartStore } from '../../features/cart/store/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <header class="sticky top-0 z-30 bg-canvas/85 backdrop-blur-md border-b border-hair">
    <div class="max-w-[1240px] mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center gap-4 sm:gap-6">
      <RouterLink to="/" class="flex items-center gap-2 shrink-0" aria-label="Mobile Store — home">
        <span class="w-6 h-6 rounded-full border border-hair flex items-center justify-center">
          <span class="w-2 h-2 rounded-full bg-ink"></span>
        </span>
        <span class="text-[15px] font-semibold tracking-tight">
          Cell<span class="text-faint">.</span>
        </span>
      </RouterLink>

      <nav v-if="$slots.breadcrumb" aria-label="Breadcrumb">
        <slot name="breadcrumb" />
      </nav>

      <div v-if="$slots.search" class="ml-auto w-full max-w-xs hidden sm:block">
        <slot name="search" />
      </div>

      <div :class="$slots.search ? 'sm:ml-0 ml-auto' : 'ml-auto'" class="flex items-center">
        <div
          class="inline-flex items-center gap-2 h-9 px-3 rounded-full border border-hair text-[13px]"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          >
            <path d="M3 4h2l2.4 11.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
            <circle cx="10" cy="20" r="1.2" />
            <circle cx="17" cy="20" r="1.2" />
          </svg>
          <span>Cart</span>
          <span class="font-medium tabular-nums">{{ cartStore.count }}</span>
        </div>
      </div>
    </div>

    <div v-if="$slots.search" class="sm:hidden px-5 pb-3">
      <slot name="search" />
    </div>
  </header>
</template>
