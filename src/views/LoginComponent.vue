<template>
  <div class="login">
    <h2>Admin Login</h2>

    <!-- 👇 Login Form -->
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

      <button type="submit" class="login-btn">Login</button>
    </form>

    <!-- 👇 Logout button -->
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

// ✅ Firebase Auth Watch
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user
  })
})

// ✅ Login Handler
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

// ✅ Logout Handler
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding: 2rem;
}

h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 1.5rem;
}

input {
  border: 2px solid #ccc;
  border-radius: 8px;
  height: 3.5rem;
  font-size: 1rem;
  padding: 0 1rem;
  width: 100%;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

input::placeholder {
  font-size: 0.9rem;
  color: #999;
}

/* Password field */
.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  padding-right: 3rem;
}

.eye-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 1.3rem;
  color: #666;
  cursor: pointer;
}

/* Buttons */
button {
  height: 3rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.login-btn {
  background-color: #28a745;
  color: white;
}

.login-btn:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.logout-btn {
  background-color: crimson;
  color: white;
  margin-top: 2rem;
  width: 10rem;
}

.logout-btn:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 480px) {
  .login {
    padding: 1rem;
  }

  form {
    width: 90%;
  }
}
</style>
