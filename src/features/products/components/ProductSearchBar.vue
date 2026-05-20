<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <input
    type="search"
    aria-label="Search products by brand or model"
    placeholder="Search by brand or model..."
    :value="modelValue"
    class="w-full max-w-xs rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
