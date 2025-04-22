<template>
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
      <!-- SoulFood Content -->
      <div class="soulfood--container" v-if="!isLoading">
        <div class="container" v-for="item in paginatedSoulFoods" :key="item.id">
          <p class="display">
            {{ `${truncateText(item.content)}...` }}
          </p>
          <!-- Buttons and "Read more" in the same container -->
          <div class="button-container">
            <button class="edit-btn" @click="editSoulFood(item)">Edit</button>
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
            <button class="delete-btn" @click="deleteSoulFood(item.id)">Delete</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
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
    const itemsPerPage = 4
    const route = useRoute()
    const router = useRouter()

    const truncateText = (text) => text.slice(0, 40)

    const totalPages = computed(() => Math.ceil(soulFoods.value.length / itemsPerPage))

    const paginatedSoulFoods = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return soulFoods.value.slice(start, end)
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
}

.soulfood--container {
  flex: 1;
  font-size: 1rem;
  padding: 0 2rem;
}
button img {
  width: 2rem;
}
.read-more-button {
  padding: 0.25rem 0.75rem;
  height: 2rem;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.8rem;
  display: inline-block;
  cursor: pointer;
}

.read-more-button:hover {
  background-color: #0056b3;
}

.button-container {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
}

.container {
  padding: 0.5rem;
  height: 12rem;
  width: 30rem;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  font-size: 1rem;
}

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

p {
  font-size: 1rem;
}

button {
  width: 4rem;
  height: 2rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: white;
  cursor: pointer;
}

.delete-btn {
  background-color: tomato;
}

.edit-btn {
  background-color: #0056b3;
}
</style>
