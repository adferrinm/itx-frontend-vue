<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader>
      <template v-if="$slots.breadcrumb" #breadcrumb>
        <slot name="breadcrumb" />
      </template>
      <template v-if="$slots.search" #search>
        <slot name="search" />
      </template>
    </AppHeader>
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
