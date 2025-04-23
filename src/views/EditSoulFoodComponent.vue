<template>
  <div class="edit-container">
    <h2>Edit Poem</h2>
    <form @submit.prevent="submitEdit">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="title" required />
      </div>

      <div class="form-group">
        <label for="poem">Soulfood</label>
        <textarea id="poem" v-model="content" rows="8" required></textarea>
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
    const soulFoodId = route.params.id

    const title = ref('')
    const content = ref('')

    const fetchPoem = async () => {
      const response = await fetch(
        `https://poems-1eaf3-default-rtdb.firebaseio.com/soulfoods/${soulFoodId}.json`,
      )
      if (response.ok) {
        const data = await response.json()

        title.value = data.title
        content.value = data.content
      } else {
        alert('Failed to load poem.')
      }
    }

    const submitEdit = async () => {
      await fetch(`https://poems-1eaf3-default-rtdb.firebaseio.com/soulfoods/${soulFoodId}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.value,
          content: content.value,
        }),
      })

      router.push('/soul-food') // or your poem list route
    }

    onMounted(() => {
      fetchPoem()
    })

    return {
      title,
      submitEdit,
      content,
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
