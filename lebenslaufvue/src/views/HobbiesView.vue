<script setup lang="ts">
import previewImage from '@/assets/images/simeons_hobbies_vorschau.jpg';
import contentImage from '@/assets/images/simeons_hobbies.jpg';
</script>

<template>
  <div class="hobbies-page">
    <!-- Fixed Background Preview -->
    <div class="fixed-preview">
      <img :src="previewImage" alt="Hobbies Vorschau" />
      <div class="scroll-hint">
        <span>Scrolle nach unten</span>
        <div class="arrow-down">↓</div>
      </div>
    </div>

    <!-- Scroll Container -->
    <div class="scroll-container">
      <!-- Spacer to show the preview initially -->
      <div class="spacer"></div>

      <!-- Main Content that slides over -->
      <div class="content-wrapper">
        <div class="content-inner">
           <img :src="contentImage" alt="Meine Hobbies" class="content-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hobbies-page {
  /* Ensure the page can scroll */
  position: relative;
  min-height: 100vh;
  background-color: var(--color-background);
}

.fixed-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}

.fixed-preview img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 20px;
  animation: bounce 2s infinite;
}

.scroll-hint span {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.arrow-down {
  font-size: 1.5rem;
}

.scroll-container {
  position: relative;
  z-index: 10;
}

.spacer {
  height: 100vh; /* Full viewport height transparent spacer */
  width: 100%;
  pointer-events: none; /* Let clicks pass through to preview if needed, though mostly for scrolling */
}

.content-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-background);
  box-shadow: 0 -10px 30px rgba(0,0,0,0.2); /* Shadow to separate from preview */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0; /* Full image */
}

.content-inner {
  width: 100%;
  margin: 0 auto;
}

.content-image {
  width: 100%;
  height: auto;
  min-height: 100vh;
  object-fit: contain; /* Or cover, depending on image aspect ratio preference */
  display: block;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0);}
  40% {transform: translateX(-50%) translateY(-10px);}
  60% {transform: translateX(-50%) translateY(-5px);}
}
</style>
