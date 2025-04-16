<template>
  <div class="navbar">
    <img class="logo" src="../assets/poem-logo-white.webp" alt="" loading="lazy" />

    <!-- Burger icon or Cancel icon -->
    <img
      v-if="!isMenuOpen"
      src="../assets/burger.svg"
      alt="Burger Icon"
      @click="toggleMenu"
      class="menu-icon"
    />
    <img
      v-if="isMenuOpen"
      src="../assets/cancel.svg"
      alt="Close Icon"
      @click="toggleMenu"
      class="menu-icon cancel-icon"
    />

    <!-- Dropdown Menu -->
    <transition name="dropdown-menu">
      <div v-if="isMenuOpen" class="dropdown-menu">
        <ul>
          <li @click="handleMenuClick"><router-link to="/">Home</router-link></li>
          <li @click="handleMenuClick"><router-link to="/poems">Poems</router-link></li>
          <li @click="handleMenuClick"><router-link to="/admin">admin</router-link></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    // State to control the dropdown visibility
    const isMenuOpen = ref(false)

    // Toggle the visibility of the dropdown menu
    const toggleMenu = () => {
      
      isMenuOpen.value = !isMenuOpen.value
    }

    // Placeholder function for page navigation (replace with actual routing)
    const handleMenuClick = () => {
      isMenuOpen.value = false
    }
    return {
      isMenuOpen,
      toggleMenu,
      handleMenuClick,
    }
  },
})
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 10vh;
  background-color: black;
  /* background-color: #d9eafd; */
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between title and icon */
  border-bottom: 6px solid #bcccdc;
  font-size: 1rem;
  position: relative;
  z-index: 10;

 
}

h1 {
  margin-left: 2rem; /* Ensure no margin shifts */
}
.logo {
  width: 5rem;
  margin-bottom: 1rem;
  margin-left: 1.4rem;
}
.menu-icon {
  width: 2.5rem;
  cursor: pointer; /* Ensures the icon is clickable */
  position: absolute;
  right: 2.5rem; 
  filter: invert(1)
}

.cancel-icon {
  width: 1.5rem;
  position: absolute;
  right: 3rem; /* Smaller size for the cancel icon */
}

.dropdown-menu {
  position: absolute;
  top: 10vh;
  right: 0;
  left: 0; /* Add this to stretch full width */
  margin: 0 auto;
  background-color: #f8fafc;
  border: 2px solid rgba(154, 166, 178, 0.2);
  padding: 0.2rem;
  width: 100%; /* Make it responsive */
  z-index: 5;
  display: flex;
  justify-content: center;
}
.dropdown-menu a {
  color: inherit;
  text-decoration: none;
  display: block;
  width: 100%;
  padding: 1rem 0;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 400px; /* Keep items in the center */
  text-align: center;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 0.5rem 0;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #9aa6b2;
  font-size: 1rem;
}

.dropdown-menu li:hover {
  background-color: #bcccdc;
  color: white;
  font-size: 1.2rem;
  border-top: 4px solid rgb(255, 255, 255);
}



.dropdown-menu-enter-active,
.dropdown-menu-leave-active {
  transition: transform 0.5s ease-out, opacity 0.9s ease-out;
}

.dropdown-menu-enter-from,
.dropdown-menu-leave-to {
  transform: translateY(1vh);
  opacity: 0;
}

.dropdown-menu-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>
