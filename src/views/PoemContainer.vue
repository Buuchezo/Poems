<template>
  <div>
    <div v-if="authReady">
      <div v-if="currentUser" class="logout-wrapper">
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- Full-width Hero Image -->
      <!-- <div class="hero-image-wrapper">
        <img src="../assets/pexels-arnie-chou-304906-1151513.webp" alt="Poetry Hero" />
      </div> -->

      <!-- Centered Main Content -->
      <div class="main-content">
        <div class="poem--container" v-if="!isLoading">
          <!-- Filter Dropdown -->
          <div class="filter">
            <label for="type-filter">Filter by Type:</label>
            <select id="type-filter" v-model="selectedType">
              <option value="">All</option>
              <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>

          <!-- Poem Cards -->
          <div>
            <div class="poem-cards-wrapper">
              <div class="container" v-for="poem in paginatedPoems" :key="poem.id">
                <p class="display">{{ `${truncuatedMessage(poem.poem)}...` }}</p>
                <div class="button-container">
                  <button v-if="currentUser" class="edit-btn" @click="editPoem(poem)">Edit</button>
                  <router-link
                    :to="{
                      name: 'PoemDetails',
                      params: { id: poem.id },
                      query: { page: currentPage },
                    }"
                    class="read-more-button"
                  >
                    Read more
                  </router-link>
                  <button v-if="currentUser" class="delete-btn" @click="deletePoem(poem.id)">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>

      <!-- Pagination Section -->
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
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth } from '@/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'

export default defineComponent({
  emits: ['edit-poem', 'delete-poem'],
  setup(_, { emit }) {
    const poems = inject('poems')
    const isLoading = inject('isLoading')
    const selectedType = ref('')
    const currentPage = ref(1)

    const poemsPerPage = ref(4) // Default 4 for mobile/tablet
    const route = useRoute()
    const router = useRouter()
    const currentUser = ref(null)
    const authReady = ref(false)

    const truncuatedMessage = (text) => text.slice(0, 40)

    const editPoem = (poem) => {
      if (!currentUser.value) return
      emit('edit-poem', poem)
    }

    const deletePoem = (id) => {
      if (!currentUser.value) return
      emit('delete-poem', id)
    }

    const uniqueTypes = computed(() => [...new Set(poems.value.map((poem) => poem.type))])
    const filteredPoems = computed(() => {
      if (!selectedType.value) return poems.value
      return poems.value.filter((poem) => poem.type === selectedType.value)
    })

    const totalPages = computed(() => Math.ceil(filteredPoems.value.length / poemsPerPage.value))

    const paginatedPoems = computed(() => {
      const start = (currentPage.value - 1) * poemsPerPage.value
      return filteredPoems.value.slice(start, start + poemsPerPage.value)
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
      if (currentPage.value < totalPages.value) currentPage.value++
    }

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--
    }

    watch(selectedType, () => {
      currentPage.value = 1
    })

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        poemsPerPage.value = 6
      } else {
        poemsPerPage.value = 4
      }
    }

    onMounted(() => {
      if (route.query.page) {
        currentPage.value = parseInt(route.query.page)
      }
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user
        authReady.value = true
      })
      // Set poems per page correctly based on screen size
      handleResize()
      window.addEventListener('resize', handleResize)
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
  }
})

</script>

<style scoped>
/* General Text */
p {
  font-size: 1rem;
}

/* Entire Wrapper */
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Hero Image (hidden on mobile by default) */
.hero-image-wrapper {
  display: none;
}
.hero-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Main Content */
.main-content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
}

/* Filter Section */
.filter {
  margin: 1rem auto;
  text-align: center;
}
select {
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border-radius: 6px;
  border: 2px solid #ccc;
  font-size: 1rem;
  width: 10rem;
}
label {
  font-weight: bold;
}

/* Poem Cards Wrapper */
.poem-cards-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

/* Each Poem Card */
.container {
  flex: 1 1 250px; /* Grow/Shrink but minimum width 250px */
  max-width: 320px;
  min-width: 250px;
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(154, 166, 178, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.container:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* Display text inside card */
.display {
  font-size: 1rem;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Button container inside each poem */
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

/* Buttons */
button {
  width: 5rem;
  height: 2.2rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  border: none;
  cursor: pointer;
}

.edit-btn {
  background-color: #0056b3;
}
.delete-btn {
  background-color: tomato;
}
.read-more-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.85rem;
  display: inline-block;
  cursor: pointer;
}
.read-more-button:hover {
  background-color: #0056b3;
}
.read-more-button:active {
  background-color: #003f7f;
}

/* Logout button styles */
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
  margin-top: 1rem;
}
.logout-btn:hover {
  background-color: #c82333;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
  font-size: 1rem;
  width: 100%;
}
button img {
  width: 2rem;
}
.disabled-img {
  filter: grayscale(100%);
  opacity: 0.5;
}

/* Hero fade-in animation */
.hero-image-wrapper {
  animation: fadeIn 0.8s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tablet (≥768px) */
@media (min-width: 768px) {
  .container {
    flex: 1 1 45%; /* 2 cards per row on tablet */
    max-width: 400px;
    padding: 2rem;
  }
}

/* Desktop (≥1024px) */
@media (min-width: 1024px) {
  .hero-image-wrapper {
    display: block;
    width: 100vw;
    height: 22rem;
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .container {
    flex: 1 1 30%; /* 3 cards per row if space allows */
    max-width: 450px;
    padding: 2.5rem;
  }
}

/* Large Desktop (≥1200px) */
@media (min-width: 1200px) {
  .container {
    flex: 1 1 25%;
    max-width: 500px;
    padding: 3rem;
  }
}
</style>
