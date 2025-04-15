<template>
  <div class="admin--container">
    <form @submit.prevent="handleSubmit">
      <div class="type">
        <label for="type">Type</label>
        <input type="text" id="type" placeholder="Set Type..." v-model.trim="poemType" />
      </div>
      <textarea v-model.trim="enteredPoem" placeholder="Write your poem here..."></textarea>
      <button>Submit</button>
    </form>
    <button class="logout" @click="logout">Logout</button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  emits: ['submit-poem'], // Declare emitted event

  setup(props, { emit }) {
    const router = useRouter()
    const enteredPoem = ref('')
    const poemType = ref('')

    const handleSubmit = () => {
      if (poemType.value && enteredPoem.value) {
        emit('submit-poem', {
          type: poemType.value,
          poem: enteredPoem.value,
        })
        enteredPoem.value = ''
        poemType.value = ''
      } else {
        alert('Please fill out both fields.')
      }
    }

    const logout = () => {
      localStorage.removeItem('loggedIn')
      router.push('/')
    }

    return {
      enteredPoem,
      poemType,
      handleSubmit,
      logout,
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
  height: 100vh;
  text-align: center;
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
}

input {
  border: 2px solid #ccc;
  width: 35rem;
  border-radius: 8px;
  height: 3.2rem;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 1rem;
}

input::placeholder {
  text-align: start;
}

textarea {
  width: 35rem;
  height: 25rem;
  padding: 1rem;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 1rem;
  outline: none;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  margin-top: 2rem;
}

textarea:focus {
  border-color: #f4a261;
  box-shadow: 0 0 8px rgba(244, 162, 97, 0.5);
}

button {
  width: 20rem;
  padding: 1rem;
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
  width: 20rem;
}
</style>
