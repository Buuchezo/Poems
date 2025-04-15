<template>
  <section>
    <main>
      <the-body :isLoading="isLoading" :poems="poems"></the-body>
    </main>
  </section>
</template>
<script>
import { defineComponent, inject } from 'vue'

import TheBody from '../components/TheBody.vue'

export default defineComponent({
  components: {
    TheBody,
  },
  setup() {
    const isLoading = inject('isLoading')
    const poems = inject('poems')

    return {
      poems,
      isLoading,
    }
  },
})
</script>
<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* width: 95vw;
  margin: 0 auto; */
}
form {
  display: flex;
  flex-direction: column;
}
textarea {
  height: 10rem;
  width: 30rem;
}
</style>
