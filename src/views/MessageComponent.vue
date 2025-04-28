<template>
  <div class="poem-detail">
    <!-- Hero Image -->
    <!-- <div class="hero-image-wrapper">
      <img src="../assets/pexels-arnie-chou-304906-1151513.webp" alt="Poem Hero" />
    </div> -->

    <div class="container" v-if="entry">
      <h2>{{ entry.title }}</h2>

      <div class="text">
        <p>{{ entryContent }}</p>
        <p class="copyright">@ARS</p>
      </div>

      <!-- Back Button -->
      <div class="back-button">
        <button @click="goBack">Back</button>
      </div>
    </div>

    <!-- Loading fallback -->
    <div v-else class="loading">
      <p>Loading {{ isPoem ? 'poem' : 'soul food' }} details...</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const entry = ref(null)
    const entryType = route.meta.type || route.query.type || 'poem'
    const entryId = route.params.id
    const currentPage = route.query.page || 1

    const isPoem = computed(() => entryType === 'poem')

    const fetchUrl = computed(() => {
      const base = 'https://poems-1eaf3-default-rtdb.firebaseio.com'
      return `${base}/${entryType === 'poem' ? 'poems' : 'soulfoods'}/${entryId}.json`
    })

    onMounted(async () => {
      try {
        const res = await fetch(fetchUrl.value)
        const data = await res.json()
        entry.value = data
      } catch (err) {
        console.error(`Failed to load ${entryType} entry:`, err)
      }
    })

    const entryContent = computed(() => {
      return isPoem.value ? entry.value?.poem : entry.value?.content
    })

    const goBack = () => {
      router.push({
        name: isPoem.value ? 'poems' : 'soulFood',
        query: { page: currentPage },
      })
    }

    return {
      goBack,
      entry,
      entryContent,
      isPoem,
    }
  },
})
</script>

<style scoped>
/* Overall Layout */
/* Overall Layout */
.poem-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem 1rem;
}

/* Hero Image */
.hero-image-wrapper {
  display: none; /* Hide on mobile by default */
}
.hero-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Content Container */
.container {
  width: 100%;
  max-width: 900px; /* ✅ Limit width */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Title */
h2 {
  font-size: 2rem;
  font-weight: 900;
  margin: 2rem 0;
  color: #222;
}

/* Text Content */
.text {
  background-color: rgba(221, 221, 221, 0.3);
  border: 1px solid #d7d7d7;
  border-radius: 35px 0px 35px 0px;
  padding: 2rem;
  width: 100%;
  min-height: 25rem;
  text-align: center; /* Important: left-align the poem for readability */
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6; /* Make poems easier to read */
  white-space: pre-wrap; /* ✅ preserve poem formatting (line breaks, spaces) */
  word-wrap: break-word;
}

/* Copyright */
.copyright {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #777;
}

/* Back Button */
.back-button {
  margin-top: 2rem;
}
.back-button button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.back-button button:hover {
  background-color: #444;
  transform: translateY(-2px);
}

/* Loading fallback */
.loading {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
}

/* --- Responsive Breakpoints --- */
@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .hero-image-wrapper {
    display: block;
    width: 100vw;
    height: 22rem;
    margin-bottom: 2rem;
    overflow: hidden;
  }
  .container {
    max-width: 900px;
    padding: 0 3rem;
  }
  .text {
    font-size: 1.5rem;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1100px;
  }
}
</style>
