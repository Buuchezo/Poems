<template>
  <div class="poem-detail">
    <h2>Poem Details</h2>
    <div v-if="poem">
      <p>{{ poem.poem }}</p>
    </div>
    <div v-else>
      <p>Loading poem details...</p>
    </div>

    <!-- Back Button -->
    <div class="back-button">
      <button @click="goBack">Back to Poems</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
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
        poem: data.poem,
      }
    })

    // Navigate back to the poems list with the current page
    const goBack = () => {
      router.push({ name: 'poems', query: { page: currentPage } })
    }

    return {
      poem,
      goBack,
    }
  },
})
</script>

<style scoped>
.poem-detail {
  padding: 2rem;
  /* height: 82vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.poem-detail h2 {
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 900;
  font-size: 1.9rem;
}

.poem-detail h3 {
  font-size: 1.5rem;
}

.poem-detail p {
  font-size: 1.1rem;
  white-space: pre-wrap;
}

/* Styling the Back Button */
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
