<template>
  <div class="outer-container">
    <div :class="{ 'blur-background': showCookieBanner }">
      <div class="main--container">
        <the-header />

        <!-- Only show HeroBanner on certain pages -->
        <div v-if="showHeroBanner" class="hero-banner-wrapper">
          <hero-banner />
        </div>

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

        <the-footer />
      </div>
    </div>
    <!-- Cookie Banner at the bottom -->
    <div v-if="showCookieBanner" class="cookie-banner-bottom">
      <div class="cookie-banner-content">
        <p>
          We use cookies to improve your experience. Accept to allow all cookies, or deny to refuse
          non-essential ones. You can update your choice anytime.
        </p>
        <div class="cookie-banner-buttons">
          <button class="accept" @click="acceptCookies">Accept</button>
          <button class="deny" @click="denyCookies">Deny</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, provide, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import HeroBanner from './components/HeroBanner.vue'

export default defineComponent({
  components: {
    TheHeader,
    TheFooter,
    HeroBanner,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref(false)
    const poems = ref([])
    const soulFoods = ref([])
    const showCookieBanner = ref(true)
    const userConsent = ref(null) // 'accepted' or 'denied'

    const acceptCookies = () => {
      userConsent.value = 'accepted'
      localStorage.setItem('cookieConsent', 'accepted')
      showCookieBanner.value = false
    }

    const denyCookies = () => {
      userConsent.value = 'denied'
      localStorage.setItem('cookieConsent', 'denied')
      showCookieBanner.value = false
    }

    const showHeroBanner = computed(() => {
      return ['poems', 'PoemDetails', 'soulFood', 'SoulFoodDetails'].includes(route.name)
    })

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
      console.log(type, title, poem)
      await getPoem()
    }
    const handlePoemSubmission = async (poemData) => {
      await submitPoem(poemData)

      // Logout user and redirect
      localStorage.removeItem('loggedIn')
      router.push('/poems') // <- Make sure this route exists
    }
    const submitSoulFood = async ({ title, poem }) => {
      await fetch('https://poems-1eaf3-default-rtdb.firebaseio.com/soulfoods.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: poem,
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
            poem: (data[id].poem || '').replaceAll(',', ''),
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
      const consent = localStorage.getItem('cookieConsent')
      if (consent) {
        userConsent.value = consent
        showCookieBanner.value = false
      }
    })

    return {
      submitPoem,
      getPoem,
      poems,
      soulFoods,
      isLoading,
      showHeroBanner,
      handlePoemSubmission,
      handleEditPoem,
      handleDeletePoem,
      handleSoulFoodSubmission,
      handleDeleteSoulFood,
      handleEditSoulFood,
      acceptCookies,
      denyCookies,
      showCookieBanner,
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
.hero-banner-wrapper {
  display: none; /* Hidden by default */
  width: 100%;
}
/* Basic Blur effect for content when banner is active */
.blur-background {
  filter: blur(5px); /* Apply a soft blur effect */
  transition: filter 0.3s ease;
}

/* Cookie Banner - Fixed at the bottom of the screen */
.cookie-banner-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%; /* Ensure it doesn't affect the layout width */
  background: rgba(255, 255, 255, 0.7);
  padding: 1.5rem 2rem;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999; /* Make sure it's on top of other content */
  display: flex;
  justify-content: center;
}

Cookie banner content and buttons * .cookie-banner-content {
  max-width: 114rem; /* Optional: match your main container max-width */
  width: 100%;
  text-align: center;
}

.cookie-banner-content p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.cookie-banner-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Accept and Deny buttons */
.cookie-banner-buttons button {
  padding: 0.5rem 1.3rem;
  font-size: 1.4rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.cookie-banner-buttons .accept {
  background-color: #28a745;
  color: white;
}

.cookie-banner-buttons .accept:hover {
  background-color: #218838;
}

.cookie-banner-buttons .deny {
  background-color: #dc3545;
  color: white;
}

.cookie-banner-buttons .deny:hover {
  background-color: #c82333;
}

/* Main Content container to handle the blur effect */
.outer-container {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  /* width: 100%; */
  /* min-height: 100vh; */
  position: relative;
  box-sizing: border-box; /* Ensure padding and margin don't affect width */
}

.main--container {
  transition: filter 0.3s ease;
  width: 100%; /* Ensure it doesn't shrink or expand based on its content */
  box-sizing: border-box; /* Ensure padding and margin don't affect width */
}

/* Apply blur to content only when needed */
.blurred {
  filter: blur(5px);
  pointer-events: none; /* Disable interactions with blurred content */
  user-select: none;
}

/* Cookie Banner positioning at the bottom */
.cookie-banner {
  width: 100%;
  max-width: 37.5rem; /* Same as main container width */
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px); /* Apply blur effect to the background */
  padding: 2rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.5s ease-out;
  z-index: 1000;
}

/* Slide-up animation for the cookie banner */
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Cookie banner buttons */
.cookie-buttons {
  margin-top: 1.5rem;
}

.cookie-buttons button {
  margin: 0 1rem;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  background-color: #007bff;
  color: white;
  transition: background 0.3s ease;
}

.cookie-buttons button:hover {
  background-color: #0056b3;
}

/* Show the hero banner only on desktop and above */

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
  .hero-banner-wrapper {
    display: block;
    margin-bottom: 2rem;
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
