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
      <ol class="flex items-center gap-2 text-sm text-gray-500">
        <li><RouterLink to="/" class="hover:text-gray-900">Products</RouterLink></li>
        <li v-if="product" class="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          <span class="text-gray-900">{{ product.brand }} {{ product.model }}</span>
        </li>
      </ol>
    </template>
    <div class="px-6 py-8">
      <p v-if="isLoading" class="text-center text-gray-500">Loading product...</p>
      <p v-else-if="error" class="text-center text-red-500">{{ error }}</p>
      <div v-else-if="product" class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductDetailImage
          :img-url="product.imgUrl"
          :brand="product.brand"
          :model="product.model"
        />
        <div class="flex flex-col gap-8">
          <ProductDetailDescription :product="product" />
          <ProductDetailActions :product="product" />
        </div>
      </div>
      <p v-else class="text-center text-gray-500">Product not found.</p>
    </div>
  </AppLayout>
</template>
