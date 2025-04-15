<template>
  <div class="display--container">
    <div class="message">
      <img src="../assets/pexels-victor-150585-448835.jpg" alt="poetry book" />
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
h1 {
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  margin: 1rem 0;
}
p {
  font-size: 1rem;
}

img {
  width: 100%;
}

.display--container {
  background-color: #f8fafc;
}

.message {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.btn {
  display: inline-block;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1.5rem;
  font-weight: bold;
  color: white;
  background-color: #9aa6b2;
  text-align: center;
  text-decoration: none; /* Remove underline */
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
</style>
