<script setup lang="ts">
defineProps<{
  name: string;
  level?: string; // e.g., "Advanced", "Intermediate"
  color?: string; // Optional custom color
}>();
</script>

<template>
  <div class="skill-badge" :style="{ borderColor: color, color: color }">
    <span class="skill-name">{{ name }}</span>
    <span v-if="level" class="skill-level">• {{ level }}</span>
  </div>
</template>

<style scoped>
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 2px solid var(--color-primary);
  border-radius: 20px;
  background-color: var(--color-surface);
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  cursor: default;
}

.skill-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: var(--color-primary); /* Invert on hover */
  color: var(--color-surface) !important;
}

.skill-level {
  font-weight: 400;
  font-size: 0.85rem;
  opacity: 0.9;
}
</style>
