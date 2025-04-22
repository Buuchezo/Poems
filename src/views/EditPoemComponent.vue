<template>
  <div class="edit-container">
    <h2>Edit Poem</h2>
    <form @submit.prevent="submitEdit">
      <div class="form-group">
        <label for="type">Type</label>
        <input id="type" v-model="type" required />
      </div>

      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="title" required />
      </div>

      <div class="form-group">
        <label for="poem">Poem</label>
        <textarea id="poem" v-model="poem" rows="8" required></textarea>
      </div>

      <button type="submit" class="submit-button">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const poemId = route.params.id

    const type = ref('')
    const title = ref('')
    const poem = ref('')

    const fetchPoem = async () => {
      const response = await fetch(
        `https://poems-1eaf3-default-rtdb.firebaseio.com/poems/${poemId}.json`,
      )
      if (response.ok) {
        const data = await response.json()
        type.value = data.type
        title.value = data.title
        poem.value = data.poem
      } else {
        alert('Failed to load poem.')
      }
    }

    const submitEdit = async () => {
      await fetch(`https://poems-1eaf3-default-rtdb.firebaseio.com/poems/${poemId}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type.value,
          title: title.value,
          poem: poem.value,
        }),
      })

      router.push('/poems') // or your poem list route
    }

    onMounted(() => {
      fetchPoem()
    })

    return {
      type,
      title,
      poem,
      submitEdit,
    }
  },
})
</script>

<style scoped>
.edit-container {
  width: 30rem;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;

  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

textarea {
  height: 30rem;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
