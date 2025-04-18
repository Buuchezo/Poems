<template>
  <div v-if="authReady">
    <p style="font-size: 0.8rem">
      Auth status: <strong>{{ currentUser ? '✅ Logged In' : '❌ Logged Out' }}</strong>
    </p>

    <div v-if="authReady && currentUser" class="logout-wrapper">
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </div>
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
        <div class="button" v-if="authReady && currentUser">
          <button class="edit-btn" @click="editPoem(poem)">Edit</button>
          <button class="delete-btn" @click="deletePoem(poem.id)">Delete</button>
        </div>
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
      <p>Page {{ currentPage }} of {{ totalPages }}</p>
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
import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  emits: ['edit-poem', 'delete-poem'],
  setup(_, { emit }) {
    const poems = inject('poems')
    const isLoading = inject('isLoading')
    const selectedType = ref('')
    const currentPage = ref(1)
    const poemsPerPage = 3
    const route = useRoute()
    const router = useRouter()

    const currentUser = ref(null)
    const authReady = ref(false)

    const truncuatedMessage = (text) => {
      return text.slice(0, 40)
    }

    const editPoem = (poem) => {
      if (!currentUser.value) return
      emit('edit-poem', poem)
    }

    const deletePoem = (id) => {
      if (!currentUser.value) return
      emit('delete-poem', id)
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
    const logout = async () => {
      try {
        await signOut(auth)
        currentUser.value = null
        router.push('/login')
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }

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

      onAuthStateChanged(auth, (user) => {
        currentUser.value = user
        authReady.value = true
      })
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
      editPoem,
      deletePoem,
      currentUser,
      authReady,
      logout,
    }
  },
})
</script>

<style scoped>
/* Ensures the entire content is in a flex container */
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

/* Poem container styles */
.poem--container {
  flex: 1; /* Allow poem container to take up available space */
  font-size: 1.5rem;
  padding: 0 2rem;
}

.filter {
  margin: 1rem auto;
  width: fit-content;

  text-align: center;
}

.read-more-button {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  margin-top: 0.5rem;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
}

.read-more-button:hover {
  background-color: #0056b3;
}

.button {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

button img {
  width: 2rem;
}

.read-more-button:active {
  background-color: #003f7f;
}

select {
  padding: 0.5rem 1rem;
  border-radius: 9px;
  margin-left: 1rem;
  border: 2px solid black;
  width: 10rem;
}
label {
  font-weight: bold;
}

.container {
  padding: 0.5rem;
  height: 9rem;
  width: 22rem;
  background-color: #f8fafc;
  border-radius: 12px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(154, 166, 178, 0.3);
}
.logout-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout-btn {
  background-color: #dc3545;
  border: none;
  width: 4rem;
  height: 1.5rem;
  font-size: 0.6rem;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c82333;
}

.display {
  text-align: center;
  padding: 0.5rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Pagination fixed above the footer */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  font-size: 1rem;
}

/* Button styles */
.pagination button {
  padding-bottom: 2rem;
  border: none;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.disabled-img {
  filter: grayscale(100%);
  opacity: 0.5;
}

button {
  width: 3rem;
  height: 1.5rem;
  border-radius: 6px;
  color: white;
}
.delete-btn {
  background-color: tomato;
}
.edit-btn {
  background-color: #0056b3;
}
</style>
