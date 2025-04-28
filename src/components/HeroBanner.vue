<template>
  <div class="hero-banner" v-if="isDesktop">
    <img src="../assets/pexels-arnie-chou-304906-1151513.webp" alt="Poetry Hero" />
    <div class="hero-message">
      <!-- <h1>Words that Breathe</h1>
      <p>Explore Poems and Soul Food that speak to your heart.</p> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ✅ Detect screen size
const isDesktop = ref(false)

const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 1024 // 1024px and up
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.hero-banner {
  width: 100%;
  height: 22rem;
  overflow: hidden;
  position: relative;
}
.hero-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
}
.hero-message h1 {
  font-size: 2.5rem;
}
.hero-message p {
  font-size: 1.2rem;
}
</style>
