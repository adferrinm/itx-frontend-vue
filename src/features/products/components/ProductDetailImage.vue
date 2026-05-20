<script setup lang="ts">
defineProps<{ imgUrl: string; brand: string; model: string }>()
</script>

<template>
  <div class="lg:sticky lg:top-24">
    <div class="aspect-4/5 bg-surface border border-hair rounded-2xl overflow-hidden">
      <img :src="imgUrl" :alt="`${brand} ${model}`" class="w-full h-full object-contain" />
    </div>
  </div>
</template>
