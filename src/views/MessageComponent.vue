<template>
  <div class="poem-detail">
    <!-- Only render content when data is loaded -->
    <div v-if="entry">
      <h2>{{ entry.title }}</h2>
      <p>{{ entryContent }}</p>

      <!-- Back Button -->
      <div class="back-button">
        <button @click="goBack">Back</button>
      </div>
    </div>

    <!-- Loading fallback -->
    <div v-else>
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
    const entryType = route.meta.type || route.query.type || 'poem' // fallback to poem
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
      entry,
      entryContent,
      isPoem,
      goBack,
    }
  },
})
</script>

<style scoped>
.poem-detail {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.poem-detail h2 {
  margin-bottom: 4rem;
  font-weight: 900;
  font-size: 1.9rem;
}

.poem-detail p {
  font-size: 1.1rem;
  white-space: pre-wrap;
}

.back-button {
  margin-top: 20px;
}

.back-button button {
  padding: 1rem 2rem;
  font-size: 1rem;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button button:hover {
  background-color: #444;
}
</style>
