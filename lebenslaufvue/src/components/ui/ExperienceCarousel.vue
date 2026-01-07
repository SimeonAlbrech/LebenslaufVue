<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface ExperienceItem {
  title: string;
  content: string;
  link?: string;
}

const props = defineProps<{
  items: ExperienceItem[];
}>();

// Duplicate boxes to create the infinite scroll illusion based on props
const displayBoxes = computed(() => [...props.items, ...props.items, ...props.items, ...props.items, ...props.items]);

const scrollContainer = ref<HTMLDivElement | null>(null);

const handleScroll = () => {
  const container = scrollContainer.value;
  if (!container) return;

  const scrollWidth = container.scrollWidth;
  const scrollLeft = container.scrollLeft;

  // One set width (approximate, assuming equal distribution)
  const singleSetWidth = scrollWidth / 5;

  // If we scroll too far to the right (into the last set), jump back to the middle
  if (scrollLeft >= singleSetWidth * 3.5) {
     container.scrollLeft -= singleSetWidth;
  }
  // If we scroll too far to the left (into the first set), jump forward to the middle
  else if (scrollLeft <= singleSetWidth * 0.5) {
     container.scrollLeft += singleSetWidth;
  }
};

const scroll = (direction: number) => {
  const container = scrollContainer.value;
  if (!container) return;

  // Get the width of a single item including margin
  const firstCard = container.querySelector('.info-box') as HTMLElement;
  if (!firstCard) return;

  const cardStyle = window.getComputedStyle(firstCard);
  const cardWidth = firstCard.offsetWidth +
                    parseFloat(cardStyle.marginLeft) +
                    parseFloat(cardStyle.marginRight);

  container.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
};

const openLink = (url?: string) => {
  if (url) {
    window.open(url, '_blank');
  }
};

onMounted(() => {
  const container = scrollContainer.value;
  if (container) {
    // Start in the middle
    const scrollWidth = container.scrollWidth;
    container.scrollLeft = (scrollWidth / 5) * 2;

    // Add scroll listener
    container.addEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <div class="experience-carousel-section">
    <!-- Visual Ring Line -->
    <div class="ring-line"></div>

    <!-- Navigation Buttons -->
    <button class="nav-button left" @click="scroll(-1)" aria-label="Scroll Left">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <button class="nav-button right" @click="scroll(1)" aria-label="Scroll Right">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>

    <div class="scroll-container" ref="scrollContainer">
      <div
        v-for="(box, index) in displayBoxes"
        :key="index"
        class="info-box"
        :class="{ 'clickable': box.link }"
        @click="openLink(box.link)"
      >
        <!-- Dot on the ring -->
        <div class="ring-dot"></div>

        <!-- Hover Icon (Finger) using SVG instead of Image -->
        <div v-if="box.link" class="hover-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
        </div>

        <h3>{{ box.title }}</h3>
        <p>{{ box.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Experience Carousel Section */
.experience-carousel-section {
  position: relative;
  width: 100%;
  max-width: 1200px; /* Limit width on desktop */
  margin: 0 auto;
  padding: 40px 0;
  /* overflow: hidden; Removed to allow buttons to sit outside */
}

/* The horizontal line "Ring" */
.ring-line {
  position: absolute;
  top: 50%; /* Center vertically relative to the section */
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--color-primary);
  transform: translateY(-50%);
  z-index: 0;
  opacity: 0.3; /* Make it subtle */
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: auto; /* Instant jumping for infinite scroll illusion */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  padding: 20px 0; /* Space for shadow/transform */
  align-items: stretch; /* Make boxes same height */
  scroll-snap-type: x mandatory; /* Enable horizontal scroll snapping */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scroll-container::-webkit-scrollbar {
  display: none;
}

.info-box {
  flex: 0 0 300px; /* Fixed width */
  margin: 0 20px;
  min-height: 200px;
  background-color: var(--color-surface);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  z-index: 1; /* Above the line */
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s ease;
  scroll-snap-align: center; /* Snap boxes to center */
}

.info-box:hover {
  transform: translateY(-5px);
}

.info-box.clickable {
  cursor: pointer;
}

.hover-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--color-surface);
  color: var(--color-primary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px) scale(0.8);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.info-box:hover .hover-icon {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.info-box h3 {
  color: var(--color-primary);
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.info-box p {
  font-size: 1.1rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
  margin: 0;
}

/* Navigation Buttons */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-surface);
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-button:hover {
  background-color: var(--color-primary);
  color: var(--color-surface);
  transform: translateY(-50%) scale(1.1);
}

.nav-button.left {
  left: -15px;
}

.nav-button.right {
  right: -15px;
}

@media (min-width: 1350px) {
  .nav-button.left {
    left: -40px;
  }

  .nav-button.right {
    right: -40px;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .info-box {
    flex: 0 0 260px; /* Slightly smaller on mobile */
    margin: 0 10px;
    padding: 20px;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }
}
</style>
