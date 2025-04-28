<template>
  <div class="main--container">
    <the-header></the-header>
    <main class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component
            :is="Component"
            @submit-poem="handlePoemSubmission"
            @submit-soulfood="handleSoulFoodSubmission"
            @edit-poem="handleEditPoem"
            @delete-poem="handleDeletePoem"
            @edit-soulfood="handleEditSoulFood"
            @delete-soulfood="handleDeleteSoulFood"
          />
        </transition>
      </router-view>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import { defineComponent, ref, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default defineComponent({
  components: {
    TheHeader,
    TheFooter,
  },

  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const poems = ref('[]')
    const soulFoods = ref([])

    const submitPoem = async ({ type, title, poem }) => {
      await fetch('https://poems-1eaf3-default-rtdb.firebaseio.com/poems.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          type: type,
          title: title,
          poem: poem,
        }),
      })

      await getPoem()
    }
    const handlePoemSubmission = async (poemData) => {
      await submitPoem(poemData)

      // Logout user and redirect
      localStorage.removeItem('loggedIn')
      router.push('/poems') // <- Make sure this route exists
    }
    const submitSoulFood = async ({ title, content }) => {
      await fetch('https://poems-1eaf3-default-rtdb.firebaseio.com/soulfoods.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      })
      await getSoulFood()
    }

    const handleSoulFoodSubmission = async (soulFoodData) => {
      await submitSoulFood(soulFoodData)

      // Optionally redirect or confirm
      localStorage.removeItem('loggedIn')
      router.push('/soul-food') // ✅ Make sure this route exists for listing them
    }

    provide('poems', poems)
    provide('isLoading', isLoading)
    provide('submitPoem', submitPoem)
    provide('soulFoods', soulFoods)

    const getPoem = async () => {
      isLoading.value = true
      const response = await fetch(
        `https://poems-1eaf3-default-rtdb.firebaseio.com/poems.json?timestamp=${new Date().getTime()}`,
      )

      if (response.ok) {
        const data = await response.json()
        isLoading.value = false

        const result = []
        for (const id in data) {
          result.push({
            id: id,
            type: data[id].type,
            title: data[id].title,
            poem: data[id].poem.replaceAll(',', ''),
          })
        }

        poems.value = result
      }
    }
    const getSoulFood = async () => {
      isLoading.value = true
      const response = await fetch(
        `https://poems-1eaf3-default-rtdb.firebaseio.com/soulfoods.json?timestamp=${new Date().getTime()}`,
      )

      if (response.ok) {
        const data = await response.json()
        isLoading.value = false

        const result = []
        for (const id in data) {
          result.push({
            id: id,
            title: data[id].title,
            content: data[id].content?.replaceAll(',', '') || '',
          })
        }

        soulFoods.value = result
      } else {
        isLoading.value = false
        console.error('Failed to fetch soul food entries.')
      }
    }

    const handleEditPoem = (poem) => {
      router.push({ name: 'editpoem', params: { id: poem.id } })
    }

    const handleDeletePoem = async (id) => {
      try {
        await fetch(`https://poems-1eaf3-default-rtdb.firebaseio.com/poems/${id}.json`, {
          method: 'DELETE',
        })
        await getPoem()
      } catch (error) {
        console.error('Error deleting poem:', error)
      }
    }
    const handleEditSoulFood = (soulFood) => {
      router.push({ name: 'editsoulfood', params: { id: soulFood.id } })
    }
    const handleDeleteSoulFood = async (id) => {
      try {
        await fetch(`https://poems-1eaf3-default-rtdb.firebaseio.com/soulfoods/${id}.json`, {
          method: 'DELETE',
        })
        await getSoulFood()
      } catch (error) {
        console.error('Error deleting poem:', error)
      }
    }

    onMounted(() => {
      getPoem()
      getSoulFood()
    })

    return {
      submitPoem,
      getPoem,
      poems,
      soulFoods,
      isLoading,
      handlePoemSubmission,
      handleEditPoem,
      handleDeletePoem,
      handleSoulFoodSubmission,
      handleDeleteSoulFood,
      handleEditSoulFood,
    }
  },
})
</script>

<style>
* {
  box-sizing: border-box;
  font-size: 62.5%;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  display: flex;
  flex-direction: column;
}

.main--container {
  width: 100%;
  max-width: 37.5rem; /* Still the same as your desired fixed layout width */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* Tablet (>=600px) */
@media (min-width: 600px) {
  .main--container {
    max-width: 60rem; /* 600px */
    /* padding: 2rem; More breathing room */
  }
}

/* Small Laptop (>=768px) */
@media (min-width: 768px) {
  .main--container {
    max-width: 80rem; /* 800px */
    /* padding: 2.5rem; */
  }
}

/* Medium Laptop (>=1024px) */
@media (min-width: 1024px) {
  .main--container {
    max-width: 96rem; /* 960px */
    /* padding: 3rem; */
  }
}

/* Desktop (>=1440px) */
@media (min-width: 1440px) {
  .main--container {
    max-width: 114rem; /* 1140px */
    /* padding: 4rem; */
  }
}
/* Desktop (>=2160px) */
@media (min-width: 2160px) {
  .main--container {
    max-width: 216rem; /* 2160px */
    /* padding: 4rem; */
  }
}
</style>
