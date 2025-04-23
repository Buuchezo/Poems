<template>
  <div class="poem-detail">
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
      goBack,
      entry,
      entryContent,
      isPoem,
    }
  },
})
</script>

<style scoped>
.poem-detail {
  /* padding: 2rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.poem-detail h2 {
  text-align: center;
  margin: 2rem 0;
  font-weight: 900;
  font-size: 1.5rem;
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
  margin: 1rem 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-button button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.text {
  border-radius: 35px 0px 35px 0px;
  background-color: rgba(221, 221, 221, 0.3);
  min-height: 25rem;
  padding: 1rem;
  position: relative;
  border: solid 1px rgb(215, 215, 215);
  width: 96%;
}
.copyright {
  margin-top: 1rem;
}
.back-button button:hover {
  background-color: #444;
}
</style>
