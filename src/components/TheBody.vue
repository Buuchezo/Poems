<template>
  <div class="display--container">
    <div class="image-wrapper">
      <img src="../assets/pexels-victor-150585-448835.jpg" alt="poetry book" />
    </div>
    <div class="message">
      <h1>Welcome to the Home of Words That Breathe</h1>
      <p>
        Where poetry lives, lingers, and listens. Step into a world where syllables sing and silence
        speaks. Whether you're here to read, write, or simply feel— You’ve found a haven for the
        heart. Browse verses that echo your story, Share poems born from your soul, Or lose yourself
        in the rhythm of someone else's truth. This is more than a website. It’s a sanctuary for
        dreamers, thinkers, and storytellers. Welcome home.
      </p>
      <RouterLink to="/poems" class="btn">Wander Through Words</RouterLink>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  props: ['isLoading', 'poems'],
  components: {
    RouterLink,
  },
})
</script>

<style scoped>
.display--container {
  width: 100%;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.image-wrapper {
  width: 100%;
}

img {
  width: 100%;
  height: auto;
  border-radius: 0;
}

.message {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
}

p {
  font-size: 1rem;
  margin: 1rem 0;
}

.btn {
  display: inline-block;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  font-weight: bold;
  color: white;
  background-color: #9aa6b2;
  text-decoration: none;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.btn:hover {
  background-color: #bcccdc;
  color: rgb(37, 36, 36);
  transform: scale(1.05);
}

.btn:active {
  background-color: rgb(144, 112, 70);
  transform: scale(0.98);
}

/* --- DESKTOP VERSION (≥1024px) --- */
@media (min-width: 1024px) {
  .display--container {
    position: relative;
    min-height: 100vh;
    justify-content: center;
  }

  .image-wrapper {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .message {
    position: relative;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.8); /* White transparent background */
    padding: 3rem;
    border-radius: 1rem;
    max-width: 80%;
  }

  h1 {
    font-size: 3rem;
  }

  p {
    font-size: 1.6rem;
  }

  .btn {
    font-size: 1.6rem;
    padding: 1.5rem 3rem;
  }
}
</style>
