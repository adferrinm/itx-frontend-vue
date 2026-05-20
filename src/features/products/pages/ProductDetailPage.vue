<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductDetail } from '../composables/useProductDetail'
import AppLayout from '../../../shared/ui/AppLayout.vue'
import ProductDetailImage from '../components/ProductDetailImage.vue'
import ProductDetailDescription from '../components/ProductDetailDescription.vue'
import ProductDetailActions from '../components/ProductDetailActions.vue'

const route = useRoute()
const { product, isLoading, error, load } = useProductDetail()

onMounted(() => load(route.params.id as string))
</script>

<template>
  <AppLayout>
    <template #breadcrumb>
      <ol class="flex items-center gap-2 text-[13px] text-muted">
        <li>
          <RouterLink to="/" class="hover:text-ink transition">Products</RouterLink>
        </li>
        <li v-if="product" class="flex items-center gap-2">
          <span aria-hidden="true" class="text-faint">/</span>
          <span class="text-ink truncate">{{ product.brand }} {{ product.model }}</span>
        </li>
      </ol>
    </template>

    <section class="max-w-[1240px] mx-auto px-5 sm:px-8 pt-6 sm:pt-10 pb-20">
      <p v-if="isLoading" class="text-center text-muted py-20">Loading product…</p>
      <p v-else-if="error" class="text-center text-red-500 py-20">{{ error }}</p>
      <p v-else-if="!product" class="text-center text-muted py-20">Product not found.</p>

      <template v-else>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-ink mb-6 transition"
        >
          <svg
            class="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to catalog
        </RouterLink>

        <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-16 items-start">
          <ProductDetailImage
            :img-url="product.imgUrl"
            :brand="product.brand"
            :model="product.model"
          />
          <div class="flex flex-col gap-8">
            <header>
              <p class="text-[11px] tracking-[0.14em] uppercase text-muted font-mono mb-3">
                {{ product.brand }}
              </p>
              <h1 class="text-[34px] sm:text-[44px] leading-[1.02] tracking-tight font-medium">
                {{ product.model }}
              </h1>
              <p v-if="product.price" class="mt-5 text-[24px] font-medium tabular-nums">
                {{ product.price }} €
              </p>
            </header>
            <ProductDetailActions :product="product" />
            <ProductDetailDescription :product="product" />
          </div>
        </div>
      </template>
    </section>
  </AppLayout>
</template>
