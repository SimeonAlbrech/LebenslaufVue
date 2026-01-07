<script setup lang="ts">
</script>

<template>
  <div class="contact-container">
    <div class="contact-content-wrapper">
      
      <div class="image-container">
        <img src="@/assets/images/contact.jpg" alt="Kontakt" class="contact-image" />
      </div>

      <h2 class="contact-heading">Tritt mit mir in Kontakt!</h2>
      
      <a href="mailto:simeon@albrech.de" class="mail-link">simeon@albrech.de</a>

      <div class="social-links">
         <p>Gerne können Sie mich auch per LinkedIn kontaktieren:</p>
         <a href="https://www.linkedin.com/in/simeon-albrech-072912333/" class="linkedin-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>

    </div>
  </div>
</template>

<style scoped>
.contact-container {
  height: 100vh;
  width: 100%;
  padding-top: var(--header-height); /* Account for fixed header */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.contact-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
  animation: fadeIn 1s ease-out;
}

.image-container {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 6px solid var(--color-surface);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
  background-color: var(--color-surface);
}

.contact-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container:hover .contact-image {
  transform: scale(1.05);
}

.contact-heading {
  font-size: 2.5rem;
  color: var(--color-primary-dark);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
}

.mail-link {
  font-size: 2rem; /* Large text */
  font-weight: 700;
  color: var(--color-text-header);
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}

.mail-link:hover {
  color: var(--color-primary);
}

.mail-link::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 3px;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

.mail-link:hover::after {
  width: 100%;
}

.social-links {
  margin-top: 20px;
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

.linkedin-link {
  display: inline-block;
  margin-top: 5px;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1.2rem;
}

.linkedin-link:hover {
  text-decoration: underline;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .image-container {
    width: 200px;
    height: 200px;
  }
  
  .contact-heading {
    font-size: 1.8rem;
  }
  
  .mail-link {
    font-size: 1.5rem;
  }
}
</style>
