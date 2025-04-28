<template>
  <div>
    <div v-if="authReady">
      <div v-if="currentUser" class="logout-wrapper">
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- Hero Image -->
      <!-- <div class="hero-image-wrapper">
        <img src="../assets/pexels-arnie-chou-304906-1151513.webp" alt="Soul Food Hero" />
      </div> -->

      <!-- SoulFood Main Content -->
      <div class="main-content">
        <div class="soulfood--container" v-if="!isLoading">
          <div class="soulfood-cards-wrapper">
            <div class="container" v-for="item in paginatedSoulFoods" :key="item.id">
              <p class="display">{{ `${truncateText(item.content)}...` }}</p>
              <div class="button-container">
                <button v-if="currentUser" class="edit-btn" @click="editSoulFood(item)">
                  Edit
                </button>
                <router-link
                  :to="{
                    name: 'SoulFoodDetails',
                    params: { id: item.id },
                    query: { page: currentPage },
                  }"
                  class="read-more-button"
                >
                  Read more
                </router-link>
                <button v-if="currentUser" class="delete-btn" @click="deleteSoulFood(item.id)">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <p>Loading...</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="soulFoods.length > itemsPerPage">
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
import { defineComponent, inject, ref, computed, onMounted } from 'vue'
import { auth } from '@/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  emits: ['edit-soulfood', 'delete-soulfood'],
  setup(_, { emit }) {
    const soulFoods = inject('soulFoods')
    const isLoading = inject('isLoading')
    const currentUser = ref(null)
    const authReady = ref(false)

    const currentPage = ref(1)
    const itemsPerPage = ref(4) // ✅ Make dynamic!

    const route = useRoute()
    const router = useRouter()

    const truncateText = (text) => text.slice(0, 40)

    const totalPages = computed(() => Math.ceil(soulFoods.value.length / itemsPerPage.value))

    const paginatedSoulFoods = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      return soulFoods.value.slice(start, start + itemsPerPage.value)
    })

    const editSoulFood = (item) => {
      if (!currentUser.value) return
      emit('edit-soulfood', item)
    }

    const deleteSoulFood = (id) => {
      if (!currentUser.value) return
      emit('delete-soulfood', id)
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++
    }

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--
    }

    const logout = async () => {
      try {
        await signOut(auth)
        currentUser.value = null
        router.push('/login')
      } catch (err) {
        console.error('Logout failed:', err)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        itemsPerPage.value = 6
      } else {
        itemsPerPage.value = 4
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

      handleResize()
      window.addEventListener('resize', handleResize)
    })

    return {
      isLoading,
      soulFoods,
      authReady,
      currentUser,
      currentPage,
      totalPages,
      paginatedSoulFoods,
      truncateText,
      editSoulFood,
      deleteSoulFood,
      nextPage,
      prevPage,
      logout,
      itemsPerPage,
    }
  },
})
</script>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Hero Image */
.hero-image-wrapper {
  display: none;
}
.hero-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Main content */
.main-content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
}

/* Soulfood container */
.soulfood--container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Wrapper for cards */
.soulfood-cards-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

/* Each card */
.container {
  flex: 1 1 250px;
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

.display {
  font-size: 1rem;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.button-container {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
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

/* Logout */
.logout-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logout-btn {
  background-color: #dc3545;
  width: 4rem;
  height: 1.5rem;
  font-size: 0.6rem;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  margin-top: 2rem;
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

/* Responsive Breakpoints */

/* Tablet */
@media (min-width: 768px) {
  .container {
    flex: 1 1 45%;
    max-width: 400px;
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero-image-wrapper {
    display: block;
    width: 100vw;
    height: 22rem;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  .container {
    flex: 1 1 30%;
    max-width: 450px;
    padding: 2.5rem;
  }
}

/* Large desktop */
@media (min-width: 1200px) {
  .container {
    flex: 1 1 25%;
    max-width: 500px;
    padding: 3rem;
  }
}
</style>
