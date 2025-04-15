<template>
  <div class="content-wrapper">
    <!-- Main Poem Content Section -->
    <div class="poem--container" v-if="!isLoading">
      <!-- Filter dropdown -->
      <div class="filter">
        <label for="type-filter">Filter by Type:</label>
        <select id="type-filter" v-model="selectedType">
          <option value="">All</option>
          <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <!-- Filtered poems display -->
      <div class="container" v-for="poem in paginatedPoems" :key="poem.id">
        <pre
          class="display">{{ `${truncuatedMessage(poem.poem)}...` }}<br><router-link :to="{ name: 'PoemDetails', params: { id: poem.id },query: { page: currentPage } }" class="read-more-button">Read more</router-link></pre>
      </div>
    </div>

    <!-- Loading State - This will show while data is being fetched -->
    <div v-else>
      <p>Loading...</p>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="filteredPoems.length > poemsPerPage">
      <button @click="prevPage" :disabled="currentPage === 1">
        <img
          src="../assets/arrow-left-circle.svg"
          alt="previous"
          :class="{ 'disabled-img': currentPage === 1 }"
        />
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        <img
          src="../assets/arrow-right-circle.svg"
          alt=""
          :class="{ 'disabled-img': currentPage === totalPages }"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const poems = inject('poems')
    const isLoading = inject('isLoading')
    const selectedType = ref('')
    const currentPage = ref(1)
    const poemsPerPage = 3
    const route = useRoute()

    const truncuatedMessage = (text) => {
      return text.slice(0, 60)
    }

    const uniqueTypes = computed(() => {
      return [...new Set(poems.value.map((poem) => poem.type))]
    })

    const filteredPoems = computed(() => {
      if (!selectedType.value) return poems.value
      return poems.value.filter((poem) => poem.type === selectedType.value)
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredPoems.value.length / poemsPerPage)
    })

    const paginatedPoems = computed(() => {
      const start = (currentPage.value - 1) * poemsPerPage
      const end = start + poemsPerPage
      return filteredPoems.value.slice(start, end)
    })

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    watch(selectedType, () => {
      currentPage.value = 1 // Reset to page 1 when filter changes
    })

    onMounted(() => {
      if (route.query.page) {
        currentPage.value = parseInt(route.query.page)
      }
    })

    return {
      poems,
      poemsPerPage,
      isLoading,
      selectedType,
      uniqueTypes,
      filteredPoems,
      truncuatedMessage,
      currentPage,
      totalPages,
      paginatedPoems,
      nextPage,
      prevPage,
    }
  },
})
</script>

<style scoped>
/* Ensures the entire content is in a flex container */
.content-wrapper {
  display: flex;
  flex-direction: column;
  height: 82vh;
}

/* Poem container styles */
.poem--container {
  flex: 1; /* Allow poem container to take up available space */
  font-size: 15px;
  padding: 0 20px;
}

.filter {
  margin: 10px auto;
  width: fit-content;
  margin-bottom: 20px;
  text-align: center;
}

.read-more-button {
  display: inline-block;
  padding: 6px 12px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.read-more-button:hover {
  background-color: #0056b3;
}

.read-more-button:active {
  background-color: #003f7f;
}

select {
  padding: 4px 10px;
  border-radius: 9px;
  margin-left: 10px;
  border: 2px solid black;
  width: 100px;
}
label {
  font-weight: bold;
}

img {
  width: 30px;
}
.container {
  margin-top: 10px;
  padding: 5px;
  height: 150px;
  width: 350px;
  background-color: #f8fafc;
  border-radius: 12px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.display {
  text-align: center;
  padding: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Pagination fixed above the footer */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding: 20px 0;
}

/* Button styles */
.pagination button {
  padding: 6px 12px;
  border: none;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.disabled-img {
  filter: grayscale(100%);
  opacity: 0.5;
}
</style>
