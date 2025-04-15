<template>
  <div class="container">
    <the-header></the-header>
    <transition name="fade" mode="out-in">
      <router-view @submit-poem="handlePoemSubmission"></router-view>
    </transition>
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

    const submitPoem = async ({ type, poem }) => {
      await fetch('https://poems-1eaf3-default-rtdb.firebaseio.com/poems.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          type: type,
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
    provide('poems', poems)
    provide('isLoading', isLoading)
    provide('submitPoem', submitPoem)

    onMounted(() => {
      getPoem()
    })

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
          result.push({ id: id, type: data[id].type, poem: data[id].poem.replaceAll(',', '') })
        }

        poems.value = result
      }
    }

    return {
      submitPoem,
      getPoem,
      poems,
      isLoading,
      handlePoemSubmission,
    }
  },
})
</script>

<style>
.container {
  height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
