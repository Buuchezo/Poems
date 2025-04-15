<template>
  <div class="navbar">
    <img class="logo" src="../assets/poem-logo-black.png" alt="" />

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
    <transition name="fade">
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
  height: 8vh;
  background-color: #d9eafd;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between title and icon */
  border-bottom: 6px solid #bcccdc;
  font-size: 10px;
  position: relative;
}

h1 {
  margin-left: 20px; /* Ensure no margin shifts */
}
.logo {
  width: 80px;
  position: absolute;
  top: -11px;
}
.menu-icon {
  width: 30px;
  cursor: pointer; /* Ensures the icon is clickable */
  position: absolute;
  right: 20px; /* Position it on the right */
}

.cancel-icon {
  width: 25px; /* Smaller size for the cancel icon */
}

.dropdown-menu {
  position: absolute;
  top: 5vh; /* Position just below the navbar */
  right: 0px; /* Align it to the right of the screen */
  background-color: #f8fafc;
  border: 2px solid rgba(154, 166, 178, 0.2);
  padding: 10px;
  width: 375px;
  z-index: 100;
}
.dropdown-menu a {
  color: inherit;
  text-decoration: none;
  display: block;
  width: 100%;
  padding: 8px 0;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 8px 0;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #9aa6b2;
}

.dropdown-menu li:hover {
  background-color: #bcccdc;
  color: white;
  font-size: 16px;
  border-top: 4px solid rgb(255, 255, 255);
}

.dropdown-menu-enter-active,
.dropdown-menu-leave-active {
  transition:
    transform 0.9s ease-out,
    opacity 0.9s ease-out;
}

.dropdown-menu-enter, .dropdown-menu-leave-to /* .dropdown-menu-leave-active in <2.1.8 */ {
  transform: translateY(-100%); /* Start from above the screen */
  opacity: 0;
}

.dropdown-menu-enter-to {
  transform: translateY(0); /* Slide down to normal position */
  opacity: 1; /* Fade in */
}
</style>
