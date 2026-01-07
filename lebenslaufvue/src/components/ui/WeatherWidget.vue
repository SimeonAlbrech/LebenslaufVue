<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Esslingen am Neckar Coordinates
const LAT = 48.7405;
const LON = 9.3114;

interface WeatherData {
  temperature: number;
  weathercode: number;
}

const weather = ref<WeatherData | null>(null);
const loading = ref(true);
const error = ref(false);

const mapWeatherCode = (code: number) => {
  // WMO Weather interpretation codes (http://www.wmo.int/pages/prog/www/IMOP/publications/CIMO-Guide/GMONET/WMO_Code_Tables_WMO4677.pdf)
  if (code === 0) return { label: 'Klar', icon: '☀️' };
  if (code >= 1 && code <= 3) return { label: 'Bewölkt', icon: '☁️' };
  if (code >= 45 && code <= 48) return { label: 'Nebel', icon: '🌫️' };
  if (code >= 51 && code <= 55) return { label: 'Nieselregen', icon: '🌦️' };
  if (code >= 61 && code <= 67) return { label: 'Regen', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { label: 'Schnee', icon: '❄️' };
  if (code >= 80 && code <= 82) return { label: 'Regenschauer', icon: '🌧️' };
  if (code >= 95 && code <= 99) return { label: 'Gewitter', icon: '⚡' };
  return { label: 'Unbekannt', icon: '❓' };
};

const fetchWeather = async () => {
  try {
    loading.value = true;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
    );
    
    if (!response.ok) throw new Error('Weather data fetch failed');
    
    const data = await response.json();
    weather.value = {
      temperature: data.current_weather.temperature,
      weathercode: data.current_weather.weathercode
    };
  } catch (e) {
    console.error(e);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchWeather();
  // Update every 30 minutes
  setInterval(fetchWeather, 30 * 60 * 1000);
});
</script>

<template>
  <div class="weather-widget">
    <div v-if="loading" class="weather-loading">
      Lade Wetter...
    </div>
    
    <div v-else-if="error" class="weather-error">
      Wetter konnte nicht geladen werden.
    </div>
    
    <div v-else-if="weather" class="weather-content">
      <div class="weather-location">Esslingen am Neckar</div>
      <div class="weather-main">
        <span class="weather-icon">{{ mapWeatherCode(weather.weathercode).icon }}</span>
        <span class="weather-temp">{{ weather.temperature }}°C</span>
      </div>
      <div class="weather-desc">{{ mapWeatherCode(weather.weathercode).label }}</div>
    </div>
  </div>
</template>

<style scoped>
.weather-widget {
  background-color: var(--color-surface);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  border: 1px solid var(--color-border-light);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.weather-widget:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.weather-location {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  margin-bottom: 10px;
}

.weather-main {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 5px;
}

.weather-icon {
  font-size: 2.5rem;
}

.weather-temp {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.weather-desc {
  font-size: 1rem;
  color: var(--color-text-header);
  font-weight: 600;
}

.weather-loading, .weather-error {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}
</style>
