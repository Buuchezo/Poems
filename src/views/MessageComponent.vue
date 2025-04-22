<template>
  <div class="poem-detail">
<<<<<<< HEAD
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
=======
    <!-- Only render content when poem is loaded -->
    <div v-if="poem">
      <h2>{{ poem.title }}</h2>
      <p>{{ poem.poem }}</p>

      <!-- Back Button -->
      <div class="back-button">
        <button @click="goBack">Back to Poems</button>
      </div>
    </div>

    <!-- Fallback while loading -->
    <div v-else>
      <p>Loading poem details...</p>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
<<<<<<< HEAD

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
=======
    const poem = ref(null)
    const poemId = route.params.id // Get the poem ID from the route
    const currentPage = route.query.page || 1 // Get the current page from the query params

    onMounted(async () => {
      // Fetch the full poem details based on the poem ID
      const response = await fetch(
        `https://poems-1eaf3-default-rtdb.firebaseio.com/poems/${poemId}.json`,
      )
      const data = await response.json()
      poem.value = {
        type: data.type,
        title: data.title,
        poem: data.poem,
      }
    })

    // Navigate back to the poems list with the current page
    const goBack = () => {
      router.push({ name: 'poems', query: { page: currentPage } })
    }

    return {
      poem,
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
      goBack,
    }
  },
})
</script>

<style scoped>
.poem-detail {
  padding: 2rem;
<<<<<<< HEAD
  display: flex;
  flex-direction: column;
  align-items: center;
=======
  /* height: 82vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
  text-align: center;
}

.poem-detail h2 {
<<<<<<< HEAD
=======
  text-align: center;
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
  margin-bottom: 4rem;
  font-weight: 900;
  font-size: 1.9rem;
}

<<<<<<< HEAD
=======
.poem-detail h3 {
  font-size: 1.5rem;
}

>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
.poem-detail p {
  font-size: 1.1rem;
  white-space: pre-wrap;
}

<<<<<<< HEAD
=======
/* Styling the Back Button */
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
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
