<template>
<<<<<<< HEAD
  <div>
    <div v-if="authReady">
      <p style="font-size: 0.8rem">
        Auth status: <strong>{{ currentUser ? '✅ Logged In' : '❌ Logged Out' }}</strong>
      </p>
      <div v-if="authReady && currentUser" class="logout-wrapper">
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
    <div class="content-wrapper">
      <!-- Main content that grows to push pagination to the bottom -->
      <div style="flex: 1; width: 100%">
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
            <p class="display">{{ `${truncuatedMessage(poem.poem)}...` }}</p>
            <!-- Buttons and "Read more" link in the same container -->
            <div class="button-container">
              <button class="edit-btn" @click="editPoem(poem)">Edit</button>
              <router-link
                :to="{ name: 'PoemDetails', params: { id: poem.id }, query: { page: currentPage } }"
                class="read-more-button"
              >
                Read more
              </router-link>
              <button class="delete-btn" @click="deletePoem(poem.id)">Delete</button>
            </div>
          </div>
        </div>
        <!-- Loading state -->
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
      <!-- Pagination pinned at the bottom -->
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
            alt="next"
            :class="{ 'disabled-img': currentPage === totalPages }"
          />
        </button>
      </div>
    </div>
=======
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
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
  </div>
</template>

<script>
import { defineComponent, inject, ref, computed, watch, onMounted } from 'vue'
<<<<<<< HEAD
import { useRoute, useRouter } from 'vue-router'
import { auth } from '@/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
=======
import { useRoute } from 'vue-router'
import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a

export default defineComponent({
  emits: ['edit-poem', 'delete-poem'],
  setup(_, { emit }) {
    const poems = inject('poems')
    const isLoading = inject('isLoading')
    const selectedType = ref('')
    const currentPage = ref(1)
<<<<<<< HEAD
    const poemsPerPage = 4
=======
    const poemsPerPage = 3
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
    const route = useRoute()
    const router = useRouter()

    const currentUser = ref(null)
    const authReady = ref(false)

<<<<<<< HEAD
    const truncuatedMessage = (text) => text.slice(0, 60)
=======
    const truncuatedMessage = (text) => {
      return text.slice(0, 40)
    }
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a

    const editPoem = (poem) => {
      if (!currentUser.value) return
      emit('edit-poem', poem)
    }

    const deletePoem = (id) => {
      if (!currentUser.value) return
      emit('delete-poem', id)
    }

<<<<<<< HEAD
    const uniqueTypes = computed(() => [...new Set(poems.value.map((poem) => poem.type))])
=======
    const uniqueTypes = computed(() => {
      return [...new Set(poems.value.map((poem) => poem.type))]
    })
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a

    const filteredPoems = computed(() => {
      if (!selectedType.value) return poems.value
      return poems.value.filter((poem) => poem.type === selectedType.value)
    })

<<<<<<< HEAD
    const totalPages = computed(() => Math.ceil(filteredPoems.value.length / poemsPerPage))

    const paginatedPoems = computed(() => {
      const start = (currentPage.value - 1) * poemsPerPage
      return filteredPoems.value.slice(start, start + poemsPerPage)
    })

=======
    const totalPages = computed(() => {
      return Math.ceil(filteredPoems.value.length / poemsPerPage)
    })

    const paginatedPoems = computed(() => {
      const start = (currentPage.value - 1) * poemsPerPage
      const end = start + poemsPerPage
      return filteredPoems.value.slice(start, end)
    })
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
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
<<<<<<< HEAD
      if (currentPage.value < totalPages.value) currentPage.value++
    }

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--
    }

    watch(selectedType, () => {
      currentPage.value = 1
=======
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
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
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
<<<<<<< HEAD
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}
p {
  font-size: 1rem;
=======
/* Ensures the entire content is in a flex container */
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
}

/* Poem container styles */
.poem--container {
<<<<<<< HEAD
=======
  flex: 1; /* Allow poem container to take up available space */
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
  font-size: 1.5rem;
  padding: 0 2rem;
}

.filter {
  margin: 1rem auto;
<<<<<<< HEAD
=======
  width: fit-content;

>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
  text-align: center;
}

.read-more-button {
  display: inline-block;
<<<<<<< HEAD
  height: 2rem;
  padding: 0.3rem 0.8rem;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: none;
}
.read-more-button:hover {
  background-color: #0056b3;
}
=======
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

>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
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
<<<<<<< HEAD

=======
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
label {
  font-weight: bold;
}

.container {
  padding: 0.5rem;
<<<<<<< HEAD
  height: 12rem;
  width: 30rem;
=======
  height: 9rem;
  width: 22rem;
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
  background-color: #f8fafc;
  border-radius: 12px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(154, 166, 178, 0.3);
}
<<<<<<< HEAD

=======
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
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
<<<<<<< HEAD
=======

>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
.logout-btn:hover {
  background-color: #c82333;
}

.display {
  text-align: center;
  padding: 0.5rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

<<<<<<< HEAD
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

button {
  width: 4rem;
  height: 2rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: white;
  cursor: pointer;
}

.edit-btn {
  background-color: #007bff;
}

.delete-btn {
  background-color: tomato;
}

button img {
  width: 2rem;
}

.pagination {
  width: 100%;
=======
/* Pagination fixed above the footer */
.pagination {
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  font-size: 1rem;
<<<<<<< HEAD
  background-color: #fff;
}

.pagination button {
  border: none;
  background: transparent;
=======
}

/* Button styles */
.pagination button {
  padding-bottom: 2rem;
  border: none;
  color: #fff;
  border-radius: 6px;
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
  cursor: pointer;
}

.disabled-img {
  filter: grayscale(100%);
  opacity: 0.5;
}
<<<<<<< HEAD
=======

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
>>>>>>> 0f9e58ab00736e0d00eacffcbf80390f9463522a
</style>
