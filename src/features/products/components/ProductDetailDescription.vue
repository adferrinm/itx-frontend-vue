<script setup lang="ts">
import type { ProductDetail } from '../types/Product'

defineProps<{ product: ProductDetail }>()
</script>

<template>
  <dl class="flex flex-col gap-3">
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">Brand</dt>
      <dd>{{ product.brand }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">Model</dt>
      <dd>{{ product.model }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">Price</dt>
      <dd>{{ product.price ? `${product.price} €` : 'Not available' }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">CPU</dt>
      <dd>{{ product.cpu }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">RAM</dt>
      <dd>{{ product.ram }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">OS</dt>
      <dd>{{ product.os }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">Screen resolution</dt>
      <dd>{{ product.displaySize }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">Battery</dt>
      <dd>{{ product.battery }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">Primary camera</dt>
      <dd>{{ product.primaryCamera.join(', ') }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">Secondary camera</dt>
      <dd>{{ product.secondaryCmera.join(', ') }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">Dimensions</dt>
      <dd>{{ product.dimentions }}</dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500">Weight</dt>
      <dd>{{ product.weight }} g</dd>
    </div>
  </dl>
</template>
