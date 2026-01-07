<script setup lang="ts">
import { computed } from 'vue';

interface WaveSettings {
  points: number;
  width: number;
  height: number;
  amplitude: number;
  frequency: number;
  offsetY: number;
  bendStrength: number;
  power: number;
}

const settings: WaveSettings = {
  points: 200,        // Mehr Punkte für eine saubere Kurve bei steilen Wänden
  width: 100,         
  height: 100,         // WICHTIG: Höhere Box, damit die tiefen Seiten reinpassen
  
  // Organische Parameter
  amplitude: 2.5,     // Etwas weniger Zappeln, damit die Form klarer wirkt
  frequency: 0.1,    
  
  // Form-Parameter (Dramatische Schüssel)
  offsetY: 30,        // Dickerer "Boden" -> Damit sie unter dem Header hervorschaut
  bendStrength: 50,   // Zieht die Seiten tief ins Bild (ca. 45% der Höhe)
  power: 4              // 8. Grad: Flacher Boden, sehr steile Wände
};

const wavePath = computed((): string => {
  const { points, width, amplitude, frequency, offsetY, bendStrength, power } = settings;
  
  // Startpunkt oben links (y=0 bis Offset+Bend)
  let path = `M0,0 L0,${offsetY + bendStrength}`; 

  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    
    // Normalisierung (-1 bis 1)
    const t = (x - width / 2) / (width / 2);

    // Die Funktion 8. Grades
    const bowlShape = Math.pow(Math.abs(t), power) * bendStrength;

    // Organisches Rauschen
    const noise = Math.sin(i * frequency) * amplitude + 
                  Math.cos(i * frequency * 0.8) * (amplitude * 0.5);

    const y = offsetY + bowlShape + noise;

    path += ` L${x},${y}`;
  }

  // Pfad schließen (oben herum)
  path += ` L${width},0 Z`; 
  
  return path;
});
</script>

<template>
  <div class="wave-container">
    <svg 
      :viewBox="`0 0 ${settings.width} ${settings.height}`" 
      xmlns="http://www.w3.org/2000/svg" 
      preserveAspectRatio="none"
    >
      <path 
        :d="wavePath" 
        fill="var(--color-primary)" 
        fill-opacity="1"
      ></path>
    </svg>
  </div>
</template>

<style scoped>
.wave-container {
  width: 100%;
  line-height: 0; 
  overflow: hidden;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
  shape-rendering: geometricPrecision; /* Scharfe Kanten auch bei extremer Skalierung */
}
</style>