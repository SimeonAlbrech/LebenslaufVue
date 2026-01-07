<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import OrganicWave from '../components/ui/OrganicWave.vue';
import ScrollIndicator from '../components/ui/ScrollIndicator.vue';
import AboutView from './AboutView.vue';

// State für die Deckkraft
const backgroundOpacity = ref(1);

// beim Scrollen aufrufen
const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // Berechne Deckkraft: 1 minus (Fortschritt des Scrollens)
  const opacity = 1 - (scrollY / (windowHeight * 0.8));

  // Begrenzen zwischen 0 und 1 (damit es keine negativen Werte gibt)
  backgroundOpacity.value = Math.max(0, Math.min(1, opacity));
};

// Event Listener registrieren
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Listener entfernen, wenn Seite verlassen wird (Clean up)
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Scrollt nun zum echten Start der Infos
const scrollToAbout = () => {
  const infoSection = document.querySelector('.about-overlay');
  if (infoSection) {
    infoSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="page-wrapper">

    <div class="fixed-background">

      <div class="top-section">
        <OrganicWave class="wave-top" />
      </div>

      <main class="main-content"
      :style="{ opacity: backgroundOpacity }"
      >
        <div class="logo-wrapper">
            <!-- Runder Platzhalter für Bild -->
             <div class="main-logo">
                <img src="../assets/images/Bier_Bild.jpeg" alt="Lebenslauf">
             </div>
        </div>
      </main>

      <div class="bottom-section">
        <div class="indicator-wrapper" @click="scrollToAbout">
          <ScrollIndicator />
        </div>
        <OrganicWave class="wave-bottom" />
      </div>
    </div>

    <div class="about-overlay">
      <AboutView />
    </div>

  </div>
</template>

<style scoped>
/* Der Wrapper erlaubt dem Body, größer als 100vh zu werden = SCROLLBAR */
.page-wrapper {
  width: 100%;
  position: relative;
}

/* --- Fixierter Hintergrund --- */
.fixed-background {
  position: fixed; /* Bleibt stehen! */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Füllt immer den Screen */
  height: 100dvh;
  z-index: 1; /* Liegt unten */

  /* Damit Klicks (z.B. Text markieren) im Vordergrund funktionieren */
  pointer-events: none;
}

/* Wir müssen pointer-events für den Button wieder aktivieren */
.indicator-wrapper {
  pointer-events: auto;
}

/* --- Scrollbarer Vordergrund --- */
.about-overlay {
  position: relative; /* Bewegt sich mit dem Scrollen */
  z-index: 10; /* Liegt ÜBER dem fixierten Hintergrund */

  /* Schiebt die Infos genau unter den ersten Bildschirm */
  margin-top: 100vh;

  /* Ein kleiner Schatten oben sieht oft gut aus, als würde das Blatt darüber liegen */
  box-shadow: 0 -10px 20px rgba(0,0,0,0.1);
}


/* --- Deine bestehenden Styles für Logo & Wellen (unverändert) --- */

.top-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}

.bottom-section {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.indicator-wrapper {
  position: absolute;
  bottom: 40%;
  z-index: 20; /* Muss über allem im Hintergrund liegen */
  cursor: pointer;
}

.main-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInUp 1.2s ease-out;
}

.main-logo {
  height: 700px;
  width: 700px;
  background-color: var(--color-background);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;  
  box-shadow: var(--shadow-md);
  border: 5px solid var(--color-border-dark);
  overflow: hidden;
}

.main-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wave-top {
  width: 120%;
  margin-left: -10%;
  height: 20vh;
  min-height: 60px;
  transform: translateY(10%);
}

.wave-bottom {
  transform: rotate(180deg);
  width: 120%;
  margin-left: -10%;
  height: 20vh;
  min-height: 80px;
  margin-bottom: -2px;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
