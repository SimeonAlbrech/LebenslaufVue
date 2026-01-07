<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/assets/images/Profilbild.jpeg';

const router = useRouter();
const isMenuOpen = ref(false);

const menuItems = [
  { label: 'Startseite', path: '/' },
  { label: 'Über mich', path: '/about' }, // Assuming /about exists from previous steps
  { label: 'Hobbies', path: '/hobbies' }, // Placeholder path
  { label: 'Berufliche Laufbahn', path: '/career' } // Placeholder path
];

function navigateTo(path: string) {
  router.push(path);
  isMenuOpen.value = false; // Menü schließen nach Navigation
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <header class="header-container">
    <div class="header-content">
      <div class="header-left" @click="navigateTo('/')">
        <div class="logo-circle">
          <img :src="logo" alt="Logo" />
        </div>
        <span class="header-title">Simeon Albrech</span>
      </div>

      <div class="header-right">
        <div class="nav-group">
          <button class="pill-btn" @click="navigateTo('/contact')">Kontakt</button>
        </div>

        <button class="menu-btn" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
          <div class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Menu Overlay -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="menu-overlay" @click.self="toggleMenu">
        <div class="menu-content">
          <nav>
            <ul>
              <li v-for="item in menuItems" :key="item.path">
                <a @click="navigateTo(item.path)">{{ item.label }}</a>
              </li>
              <li class="mobile-only"><a @click="navigateTo('/contact')">Kontakt</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.header-container {
  /* --- Positionierung --- */
  position: fixed; /* Fixiert am Bildschirmrand */
  top: 0;
  left: 0;
  z-index: 100; /* Liegt immer über dem restlichen Inhalt */

  /* --- Dimensionen --- */
  width: 100%; /* Nimmt immer die volle Breite des Geräts ein */
  height: 50px; /* Feste Höhe */

  /* --- Design & Farbe --- */
  background-color: var(--color-primary-dark);

  /* Optional: "Frosted Glass" Effekt */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  /* Ein minimaler Schatten */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  /* Flexbox für Inhalt */
  display: flex;
  align-items: center;
  justify-content: center; /* Zentriert den Content */
  padding: 0 20px;
  box-sizing: border-box; 
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Verteilt Links und Rechts */
  width: 100%;
  max-width: none;  
  gap: 15px;    
  z-index: 102; /* Über dem Overlay */
  position: relative;
}

/* --- Logo & Title (Left) --- */
.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}

.logo-circle {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.logo-circle img {
  width: 100%; /* Changed to fit existing logo properly */
  height: 100%;
  object-fit: cover;
}

.header-title {
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  white-space: nowrap; 
}

/* --- Right Side (Nav + Menu) --- */
.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-group {
  display: flex;
  gap: 10px; 
}

/* --- Pill Buttons --- */
.pill-btn {
  background-color: rgba(255, 255, 255, 0.2); /* Leicht transparentes Weiß */
  color: white;
  border: none;
  padding: 8px 20px; /* Etwas breiter */
  border-radius: 20px; /* Modern abgerundet */
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.pill-btn:hover {
  background-color: rgba(255, 255, 255, 0.35);
}

.pill-btn:active {
  transform: scale(0.98);
}

/* --- Hamburger Menu Button --- */
.menu-btn {
  background-color: var(--color-primary-light);
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%; /* Kreisrund */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  box-shadow: var(--shadow-sm);
  z-index: 105;
}

.menu-btn:hover {
  transform: scale(1.05);
}

.menu-btn.active {
  background-color: var(--color-surface);
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 20px;
}

.hamburger-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Hamburger Animation */
.menu-btn.active .hamburger-icon span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-btn.active .hamburger-icon span:nth-child(2) {
  opacity: 0;
}

.menu-btn.active .hamburger-icon span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* --- Menu Overlay --- */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Halbtransparenter Hintergrund */
  z-index: 101; /* Unter dem Header-Content aber über allem anderen */
  display: flex;
  justify-content: flex-end;
}

.menu-content {
  background-color: white;
  width: 300px;
  height: 100%;
  padding-top: 100px; /* Platz für Header */
  padding-left: 30px;
  padding-right: 30px;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.menu-content nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-content nav li {
  margin-bottom: 20px;
}

.menu-content nav a {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-header);
  cursor: pointer;
  text-decoration: none;
  display: block;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border-light);
  transition: color 0.2s;
}

.menu-content nav a:hover {
  color: var(--color-primary);
  padding-left: 5px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- Responsive Design --- */

/* Mobile (bis 768px) */
@media (max-width: 768px) {
  .nav-group {
    display: none; /* Verstecke Header-Buttons auf Mobile */
  }

  .mobile-only {
    display: block; /* Zeige Links im Menü auf Mobile */
  }
}

/* Desktop (ab 769px) */
@media (min-width: 769px) {
  .mobile-only {
    display: none; /* Verstecke diese Links im Menü auf Desktop */
  }
}
</style>
