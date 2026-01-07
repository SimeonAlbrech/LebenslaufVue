<script setup lang="ts">
import ExperienceCarousel from '../components/ui/ExperienceCarousel.vue';
import WeatherWidget from '../components/ui/WeatherWidget.vue';
</script>

<template>
  <div class="infos-container">
    <div class="content-wrapper">
      <h2>Hallo, ich bin Simeon!</h2>
      <p>
        Ich bin 21 Jahre alt und studiere aktuell Softwaretechnik an der Hochschule Esslingen. 
        Nebenher bin ich als Junior IT-Consultant bei der HerRiCon GmbH tätig und sammle damit schon früh auf meinem Berufsweg viel Praxiserfahrung.
      </p>
      <p>
        Am meisten Spaß macht mir dabei die Arbeit mit meinen Kolleg:innen und die Lösung komplexerer Sachverhalte.
      </p>
    </div>

    <!-- Info Boxes Section -->
    <ExperienceCarousel />

    <div class="weather-section">
      <WeatherWidget />
    </div>

    <div class="action-button-container">
      <router-link to="/contact" class="action-button">
        Kontaktieren Sie mich
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.infos-container {
  width: 100%;
  min-height: 100vh;
  background-color: white;
  background-color: var(--color-background);
  padding: 80px 20px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto 60px auto;
  color: var(--color-text-main);
}

h2 {
  color: var(--color-primary);
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 1.2;
  text-align: center;
}

.content-wrapper p {
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 1.35rem;
  text-align: justify;
}

.weather-section {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .infos-container {
    padding: 60px 20px;
  }

  h2 {
    font-size: 2rem;
  }

  .content-wrapper p {
    font-size: 1.2rem;
  }
}

.action-button-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding-bottom: 40px;
}

.action-button {
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-surface);
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 30px;
  transition: transform 0.2s ease, background-color 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.action-button:hover {
  transform: translateY(-2px);
  background-color: var(--color-primary-dark);
}
</style>
