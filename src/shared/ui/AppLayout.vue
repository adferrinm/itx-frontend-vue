<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<template>
  <AppHeader>
    <template v-if="$slots.breadcrumb" #breadcrumb>
      <slot name="breadcrumb" />
    </template>
  </AppHeader>
  <main>
    <slot />
  </main>
</template>
