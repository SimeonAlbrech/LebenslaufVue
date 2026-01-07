<script setup>
// Importiere die benötigten Komponenten vom Vue Router
import { RouterView } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';

// *Hinweis: Stelle sicher, dass du die router/index.js und main.js wie zuvor beschrieben eingerichtet hast.
// Andernfalls wird der Browser die RouterView nicht finden und einen Fehler melden.
</script>

<template>
  <div id="app-container">
    <!-- 1. Der Header ist oben fixiert und liegt über der Seite (Leicht transparent) -->
    <AppHeader />

    <!-- 2. Der dynamische Platzhalter für die aktuelle View (HomeView, InfosView, etc.) -->
    <!-- Der gesamte Seiteninhalt wird hier gerendert und beginnt ganz oben (unter dem Header). -->
    <RouterView />
  </div>
</template>

<style>
:root {
  color-scheme: light;

  /* Brand Colors */
  --color-primary: #1C9D80;       /* Was --color-dark-green */
  --color-primary-light: #F7F1DE; /* Was --color-light-green */
  --color-primary-dark: #013F44;  /* Start button, darker accents */
  --color-accent: #38761d;        /* Scroll indicator */

  /* Status */
  --color-error: #d9534f;

  /* Neutrals / Backgrounds */
  --color-background: #f7f7f7;   /* Main page bg */
  --color-surface: #ffffff;      /* Cards, inputs */
  --color-surface-alt: #f9f9f9;  /* Alternating sections */

  /* Borders */
  --color-border: #dddddd;
  --color-border-light: #eeeeee;
  --color-border-dark: #cccccc;

  /* Text */
  --color-text-main: #000000;
  --color-text-header: #333333;
  --color-text-secondary: #555555;
  --color-text-muted: #888888;

  /* Shadows */
  --shadow-sm: 0 2px 10px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 15px rgba(0,0,0,0.1);
  --shadow-focus: 0 0 0 3px rgba(95, 128, 96, 0.1);
  
  /* Dimensions & Spacing */
  --header-height: 80px;
}

body {
  margin: 0;
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  color: var(--color-text-main);
  background-color: var(--color-bg-light);
}
</style>
