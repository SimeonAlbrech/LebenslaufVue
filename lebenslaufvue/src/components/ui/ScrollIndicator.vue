<script setup lang="ts">
// Basic TypeScript setup
</script>

<template>
  <div class="scroll-indicator">
    <span class="text">ZU DEN INFOS</span>
    <!-- Kleines Chevron-Icon als SVG -->
    <svg 
      class="arrow" 
      width="32" 
      height="32" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M6 9l6 6 6-6"/>
    </svg>
  </div>
</template>

<style scoped>
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  gap: 8px;
  color: var(--color-accent);
  cursor: pointer;
  cursor: pointer;
  opacity: 0.9;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
  transform: scale(1.05);
}

.text {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.arrow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
  60% { transform: translateY(-3px); }
}
</style>