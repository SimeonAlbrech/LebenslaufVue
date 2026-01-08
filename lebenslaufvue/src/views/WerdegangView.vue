<script setup lang="ts">
import { ref, computed, watch } from 'vue';


type FilterType = 'all' | 'education' | 'career';
const currentFilter = ref<FilterType>('all');

watch(currentFilter, (newVal) => {
  console.log(`Filter changed to: ${newVal}`);
});

const isEducationVisible = computed(() => {
  return currentFilter.value === 'all' || currentFilter.value === 'education';
});

const isCareerVisible = computed(() => {
  return currentFilter.value === 'all' || currentFilter.value === 'career';
});

interface CareerStep {
  date: string;
  title: string;
  subtitle: string;
  details: string[];
}

const educationSteps = ref<CareerStep[]>([
  {
    date: '10/2024 – HEUTE',
    title: 'Hochschule Esslingen',
    subtitle: 'B.Eng. Softwaretechnik & Medieninformatik',
    details: [
      'Schwerpunkt: Softwaretechnik',
      'Aktuelles Semester: 3'
    ]
  },
  {
    date: '07/2014 – 06/2023',
    title: 'Gymnasium am Krebsberg',
    subtitle: 'Allgemeine Hochschulreife',
    details: [
      'Leistungsfächer: Mathe, Informatik',
      'Abschlussnote: 1,3'
    ]
  }
]);

const careerSteps = ref<CareerStep[]>([
  {
    date: '10/2024 – HEUTE',
    title: 'HerRiCon GmbH',
    subtitle: 'Junior IT-Consultant (Werkstudent)',
    details: [
      'Entwicklung von internen Tools',
      'Kunden-Support im Bereich IT-Infrastruktur',
      'Mitarbeit an Cloud-Projekten'
    ]
  }
]);
</script>

<template>
  <div class="werdegang-page">
    <div class="content-container">
      <h1 class="page-title">Mein Werdegang</h1>

      <!-- Filter Buttons -->
      <div class="filter-controls">
        <button 
          :class="{ active: currentFilter === 'all' }" 
          @click="currentFilter = 'all'"
        >
          Alle
        </button>
        <button 
          :class="{ active: currentFilter === 'education' }" 
          @click="currentFilter = 'education'"
        >
          Ausbildung
        </button>
        <button 
          :class="{ active: currentFilter === 'career' }" 
          @click="currentFilter = 'career'"
        >
          Berufsweg
        </button>
      </div>

      <div class="sections-grid">
        <!-- Education Section -->
        <section class="career-section" v-if="isEducationVisible">
          <div class="section-header">
            <div class="icon-circle">🎓</div>
            <h2>Ausbildung</h2>
          </div>
          
          <div class="timeline">
            <div v-for="(step, index) in educationSteps" :key="index" class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content card">
                <div class="date-badge">{{ step.date }}</div>
                <h3>{{ step.title }}</h3>
                <h4>{{ step.subtitle }}</h4>
                <ul>
                  <li v-for="(detail, i) in step.details" :key="i">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Career Section -->
        <section class="career-section" v-if="isCareerVisible">
          <div class="section-header">
            <div class="icon-circle">💼</div>
            <h2>Berufsweg</h2>
          </div>

          <div class="timeline">
            <div v-for="(step, index) in careerSteps" :key="index" class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content card">
                <div class="date-badge">{{ step.date }}</div>
                <h3>{{ step.title }}</h3>
                <h4>{{ step.subtitle }}</h4>
                <ul>
                  <li v-for="(detail, i) in step.details" :key="i">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- LinkedIn Company Card -->
          <div class="linkedin-card">
            <div class="linkedin-header">
              <div class="linkedin-logo">in</div>
              <div class="linkedin-info">
                <h5>HerRiCon GmbH</h5>
                <span class="follower-count">Auf LinkedIn folgen</span>
              </div>
            </div>
            <p class="linkedin-desc">
              Erfahre mehr über meine Arbeit und aktuelle Projekte bei HerRiCon GmbH.
            </p>
            <a href="https://www.linkedin.com/company/herricon-gmbh" target="_blank" rel="noopener noreferrer" class="linkedin-btn">
              Unternehmensprofil besuchen
            </a>
          </div>
        </section>
      </div>



    </div>
  </div>
</template>

<style scoped>
.werdegang-page {
  min-height: 100vh;
  width: 100%;
  padding-top: calc(var(--header-height) + 40px); /* Header + Space */
  background-color: var(--color-background);
  font-family: 'Inter', sans-serif;
  padding-bottom: 60px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  text-align: center;
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 60px;
  font-weight: 800;
  letter-spacing: -1px;
}

.filter-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
}

.filter-controls button {
  background-color: var(--color-surface);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.filter-controls button:hover,
.filter-controls button.active {
  background-color: var(--color-primary);
  color: var(--color-surface);
}

.sections-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}



/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--color-primary-light);
}

.icon-circle {
  width: 50px;
  height: 50px;
  background-color: var(--color-primary);
  color: var(--color-surface);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.section-header h2 {
  font-size: 2rem;
  color: var(--color-primary-dark);
  margin: 0;
  font-weight: 700;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  padding-left: 20px;
  border-left: 3px solid var(--color-primary-light);
}

.timeline-item {
  position: relative;
}

.timeline-marker {
  position: absolute;
  left: -29px; /* Adjust to center on border-left line */
  top: 25px;
  width: 16px;
  height: 16px;
  background-color: var(--color-surface);
  border: 3px solid var(--color-primary);
  border-radius: 50%;
  z-index: 1;
}

/* Card Styling */
.card {
  background-color: var(--color-surface);
  border-radius: 12px;
  padding: 25px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid var(--color-border-light);
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.date-badge {
  display: inline-block;
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.card h3 {
  margin: 0 0 5px 0;
  color: var(--color-primary);
  font-size: 1.4rem;
  font-weight: 700;
}

.card h4 {
  margin: 0 0 15px 0;
  color: var(--color-text-header);
  font-size: 1.1rem;
  font-weight: 500;
}

.card ul {
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
  color: var(--color-text-secondary);
}

.card li {
  margin-bottom: 5px;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 900px) {
  .sections-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 600px) {
  .page-title {
    font-size: 2.2rem;
  }
  
  .section-header h2 {
    font-size: 1.6rem;
  }
}
</style>

<style scoped>
/* Additional LinkedIn Card Styles */
.linkedin-card {
  margin-top: 40px;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: transform 0.2s;
  border-left: 5px solid #0077b5; /* LinkedIn Blue */
}

.linkedin-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.linkedin-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.linkedin-logo {
  width: 40px;
  height: 40px;
  background-color: #0077b5;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

.linkedin-info {
  display: flex;
  flex-direction: column;
}

.linkedin-info h5 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  font-weight: 700;
}

.follower-count {
  font-size: 0.85rem;
  color: #666;
}

.linkedin-desc {
  font-size: 0.95rem;
  color: #555;
  margin: 0;
  line-height: 1.4;
}

.linkedin-btn {
  display: inline-block;
  text-align: center;
  background-color: transparent;
  color: #0077b5;
  border: 1px solid #0077b5;
  border-radius: 20px;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.linkedin-btn:hover {
  background-color: #eff3f8;
  box-shadow: inset 0 0 0 1px #0077b5;
}
</style>
