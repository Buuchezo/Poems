<template>
  <div class="login">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <input type="password" v-model="password" placeholder="Enter password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')

const login = () => {
  if (password.value === 'admin123') {
    localStorage.setItem('loggedIn', 'true')
    router.push('/admin')
  } else {
    alert('Wrong password')
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
