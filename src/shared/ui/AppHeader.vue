<script setup lang="ts">
import { useCartStore } from '../../features/cart/store/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
    <div class="flex items-center gap-6">
      <RouterLink to="/" class="text-lg font-semibold tracking-tight"> Mobile Store </RouterLink>
      <nav aria-label="Breadcrumb">
        <slot name="breadcrumb" />
      </nav>
    </div>
    <div class="text-sm font-medium">
      Cart: <span class="ml-1">{{ cartStore.count }}</span>
    </div>
  </header>
</template>
