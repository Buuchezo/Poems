<template>
  <div class="admin--container">
    <form @submit.prevent="handleSubmit">
      <!-- Select between Poem or Soul Food -->
      <div class="select-mode">
        <label for="mode">Choose Entry Type</label>
        <select id="mode" v-model="entryType">
          <option value="poem">Poem</option>
          <option value="soulfood">Soul Food</option>
        </select>
      </div>

      <!-- Poem Category -->
      <div class="type" v-if="entryType === 'poem'">
        <label for="type">Category</label>
        <input type="text" id="type" placeholder="Set Type..." v-model="poemType" />
        <p class="error" v-if="errors.type">{{ errors.type }}</p>
      </div>

      <!-- Common Title -->
      <div class="title">
        <label for="title">Title</label>
        <input type="text" id="title" placeholder="Title..." v-model="poemTitle" />
        <p class="error" v-if="errors.title">{{ errors.title }}</p>
      </div>

      <!-- Common Text Area -->
      <textarea
        v-model="enteredPoem"
        :placeholder="
          entryType === 'poem' ? 'Write your poem here...' : 'Write your soul food message...'
        "
      ></textarea>
      <p class="error" v-if="errors.poem">{{ errors.poem }}</p>

      <button type="submit">Submit</button>
    </form>

    <button class="logout" @click="logout">Logout</button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

export default defineComponent({
  emits: ['submit-poem', 'submit-soulfood'],

  setup(props, { emit }) {
    const router = useRouter()
    const enteredPoem = ref('')
    const poemType = ref('')
    const poemTitle = ref('')
    const entryType = ref('poem') // <-- New state for type selection
    const isLoggedIn = ref(false)

    const errors = ref({
      title: '',
      type: '',
      poem: '',
    })

    const validateForm = () => {
      errors.value.title = poemTitle.value.trim() ? '' : 'Title is required.'
      errors.value.poem = enteredPoem.value.trim() ? '' : 'Content is required.'

      // Only validate 'type' if entry is poem
      if (entryType.value === 'poem') {
        errors.value.type = poemType.value.trim() ? '' : 'Type is required.'
      } else {
        errors.value.type = ''
      }

      return !errors.value.title && !errors.value.type && !errors.value.poem
    }

    const handleSubmit = () => {
      if (validateForm()) {
        const submission = {
          title: poemTitle.value.trim(),
          poem: enteredPoem.value.trim(),
          createdAt: new Date(),
        }

        if (entryType.value === 'poem') {
          submission.type = poemType.value.trim()
          emit('submit-poem', submission)
        } else {
          emit('submit-soulfood', submission)
        }
        console.log(submission)
        // Clear the form
        poemTitle.value = ''
        poemType.value = ''
        enteredPoem.value = ''
      }
    }

    const logout = async () => {
      try {
        await signOut(auth)
        isLoggedIn.value = false
        router.push('/login')
      } catch (error) {
        alert('Logout failed: ' + error.message)
      }
    }

    return {
      enteredPoem,
      poemType,
      poemTitle,
      entryType,
      handleSubmit,
      logout,
      errors,
    }
  },
})
</script>

<style scoped>
.admin--container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.type {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

label {
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}
.title {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

input,
textarea {
  width: 90%;
  max-width: 30rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  box-sizing: border-box;
}

input {
  height: 3.2rem;
  text-align: center;
}

input::placeholder {
  text-align: start;
}

textarea {
  height: 25rem;
  resize: vertical;
  margin-top: 2rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

textarea:focus {
  border-color: #f4a261;
  box-shadow: 0 0 8px rgba(244, 162, 97, 0.5);
}

button {
  width: 90%;
  max-width: 10rem;
  padding: 0.5rem;
  font-size: 1.6rem;
  border: 2px solid #ccc;
  background-color: #9aa6b2;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 1rem 0;
  border-radius: 6px;
  color: white;
}

button:hover {
  background-color: #f4a261;
  color: white;
}

.logout {
  background-color: red;
  color: white;
  font-weight: bold;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}
.select-mode {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.select-mode label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.select-mode select {
  width: 90%;
  max-width: 30rem;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  text-align: center;
}
</style>
