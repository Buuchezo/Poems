<!-- <template>
  <div class="login">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Enter email" required />

      <- 👁️ Password field with eye icon toggle
      <div class="password-wrapper">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Enter password"
          required
        />
        <i
          :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"
          class="eye-icon"
          @click="showPassword = !showPassword"
        ></i>
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'


const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const login = async () => {
  if (!email.value || !password.value) {
    alert('Please fill in all fields.')
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    alert('Please enter a valid email address.')
    return
  }

  if (password.value.length < 6) {
    alert('Password must be at least 6 characters long.')
    return
  }

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
  margin-bottom: 1rem;
  padding-left: 1rem;
  width: 100%;
}

input::placeholder {
  font-size: 1rem;
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  padding-right: 3rem; /* reserve space for the icon */
}

.eye-icon {
  position: absolute;
  right: 1.2rem;
  top: 40%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.4rem;
  color: rgba(51, 51, 51,0.5);
  height: 1.4rem;
  width: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  pointer-events: all;
}


button {
  font-size: 1rem;
  margin-top: 3rem;
  background-color: green;
  color: white;
  border-radius: 12px;
  height: 3rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
</style> -->
<template>
  <div class="login">
    <h2>Admin Login</h2>

    <!-- 👇 Show Login Form if NOT Logged In -->
    <form @submit.prevent="login" v-if="!isLoggedIn">
      <input type="email" v-model="email" placeholder="Enter email" required />

      <div class="password-wrapper">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Enter password"
          required
        />
        <i
          :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"
          class="eye-icon"
          @click="showPassword = !showPassword"
        ></i>
      </div>

      <button type="submit">Login</button>
    </form>

    <!-- 👇 Show Logout Button if Logged In -->
    <button v-if="isLoggedIn" class="logout-btn" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoggedIn = ref(false)

// ✅ Watch Firebase Auth State
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user
  })
})

// ✅ Login
const login = async () => {
  if (!email.value || !password.value) {
    alert('Please fill in all fields.')
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    alert('Please enter a valid email address.')
    return
  }

  if (password.value.length < 6) {
    alert('Password must be at least 6 characters long.')
    return
  }

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/admin')
  } catch (error) {
    alert('Login failed: ' + error.message)
  }
}

// ✅ Logout
const logout = async () => {
  try {
    await signOut(auth)
    isLoggedIn.value = false
    router.push('/login')
  } catch (error) {
    alert('Logout failed: ' + error.message)
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
  margin-bottom: 1rem;
  padding-left: 1rem;
  width: 100%;
}

input::placeholder {
  font-size: 1rem;
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  padding-right: 3rem;
}

.eye-icon {
  position: absolute;
  right: 1.2rem;
  top: 40%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.4rem;
  color: rgba(51, 51, 51, 0.5);
  height: 1.4rem;
  width: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  pointer-events: all;
}

button {
  font-size: 1rem;
  margin-top: 3rem;
  background-color: green;
  color: white;
  border-radius: 12px;
  height: 3rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.logout-btn {
  background-color: crimson;
}
</style>
