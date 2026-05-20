<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <label
    class="flex items-center gap-2 h-9 px-3 rounded-full bg-surface border border-hair focus-within:border-ink/40 transition cursor-text"
  >
    <svg
      class="w-4 h-4 text-muted shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
    <input
      type="search"
      aria-label="Search products by brand or model"
      placeholder="Search brand or model…"
      :value="modelValue"
      class="flex-1 bg-transparent outline-none text-[13.5px] placeholder:text-faint min-w-0"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      type="button"
      aria-label="Clear search"
      class="text-faint hover:text-ink text-xs transition"
      @click="$emit('update:modelValue', '')"
    >
      Clear
    </button>
  </label>
</template>
