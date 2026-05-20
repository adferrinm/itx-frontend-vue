<script setup lang="ts">
defineProps<{ imgUrl: string; brand: string; model: string }>()
</script>

<template>
  <div class="flex items-center justify-center rounded-lg border border-gray-200 p-6">
    <img :src="imgUrl" :alt="`${brand} ${model}`" class="max-h-80 w-full object-contain" />
  </div>
</template>
