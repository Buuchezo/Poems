<template>
  <div class="login">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Enter email" required />
      <input type="password" v-model="password" placeholder="Enter password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    localStorage.setItem('loggedIn', 'true')
    router.push('/admin')
  } catch (error) {
    alert('Login failed: ' + error.message)
  }
}
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 1.5rem;
}
form {
  display: inherit;
  flex-direction: inherit;
  width: 80%;
}
input {
  border: 3px solid black;
  border-radius: 1.2rem;
  height: 4rem;
  font-size: 1rem;
}
input::placeholder {
  padding: 1rem;
  font-size: 1rem;
}
input:focus {
  padding-left: 1rem;
}
button {
  font-size: 1rem;
  margin-top: 3rem;
  background-color: green;
  color: white;
  border-radius: 12px;
  height: 3rem;
  font-weight: bold;
}
</style>
