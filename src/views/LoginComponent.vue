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
  height: 82vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form {
  display: inherit;
  flex-direction: inherit;
  width: 80%;
}
input {
  border: 3px solid black;
  border-radius: 12px;
  height: 40px;
}
input::placeholder {
  padding: 10px;
}
input:focus {
  padding-left: 10px;
}
button {
  margin-top: 30px;
  background-color: green;
  color: white;
  border-radius: 12px;
  height: 30px;
  font-weight: bold;
}
</style>
