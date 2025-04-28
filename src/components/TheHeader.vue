<template>
  <div class="navbar">
    <img class="logo" src="../assets/poem-logo-white.webp" alt="Logo" loading="lazy" />

    <!-- Burger Menu (Mobile Only) -->
    <img
      v-if="!isMenuOpen"
      src="../assets/burger.svg"
      alt="Burger Icon"
      @click="toggleMenu"
      class="menu-icon burger-icon"
    />
    <img
      v-if="isMenuOpen"
      src="../assets/cancel.svg"
      alt="Close Icon"
      @click="toggleMenu"
      class="menu-icon cancel-icon"
    />

    <!-- Dropdown Menu (Mobile Only) -->
    <transition name="dropdown-menu">
      <div v-if="isMenuOpen" class="dropdown-menu mobile-menu">
        <ul>
          <li @click="handleMenuClick"><router-link to="/">Home</router-link></li>
          <li @click="handleMenuClick"><router-link to="/poems">Poems</router-link></li>
          <li @click="handleMenuClick"><router-link to="/soul-food">Soul Food</router-link></li>
          <li @click="handleMenuClick"><router-link to="/admin">Admin</router-link></li>
        </ul>
      </div>
    </transition>

    <!-- Horizontal Menu (Desktop Only) -->
    <nav class="desktop-menu">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/poems">Poems</router-link></li>
        <li><router-link to="/soul-food">Soul Food</router-link></li>
        <li><router-link to="/admin">Admin</router-link></li>
      </ul>
    </nav>
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
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 6px solid #bcccdc;
  font-size: 1rem;
  position: relative;
  z-index: 10;
  padding: 0 2rem; /* Mobile default padding */
}

.logo {
  width: auto;
  max-height: 80%;
  margin-bottom: 0.5rem;
  object-fit: contain;
}

/* Mobile menu icon (burger / cancel) */
.menu-icon {
  width: auto;
  max-height: 50%;
  cursor: pointer;
  position: absolute;
  right: 2.5rem;
  filter: invert(1);
  object-fit: contain;
}

.cancel-icon {
  width: auto;
  max-height: 30%;
  right: 3rem;
  object-fit: contain;
}

/* Dropdown menu (mobile) */
.dropdown-menu {
  position: absolute;
  top: 10vh;
  right: 0;
  left: 0;
  margin: 0 auto;
  background-color: #f8fafc;
  border: 2px solid rgba(154, 166, 178, 0.2);
  padding: 0.2rem;
  width: 100%;
  z-index: 5;
  display: flex;
  justify-content: center;
}

.dropdown-menu a {
  text-decoration: none;
  color: #505050;
}
.dropdown-menu a:hover {
  color: #ffffff;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.dropdown-menu li {
  padding: 0;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 600;
}

.dropdown-menu li a {
  display: block;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  text-decoration: none;
  color: #505050;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #9aa6b2;
}

.dropdown-menu li a:hover {
  background-color: #bcccdc;
  color: white;
  border-top: 4px solid white;
}

/* Dropdown animation */
.dropdown-menu-enter-active,
.dropdown-menu-leave-active {
  transition:
    transform 0.5s ease-out,
    opacity 0.9s ease-out;
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

/* Desktop menu (hidden by default) */
.desktop-menu {
  display: none;
}

/* Desktop adjustments (≥1024px) */
@media (min-width: 1024px) {
  .navbar {
    padding: 0 10rem;
  }

  .logo {
    width: 10rem;
  }

  .menu-icon {
    display: none;
  }

  .mobile-menu {
    display: none;
  }

  .desktop-menu {
    display: block;
  }

  .desktop-menu ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 3rem;
  }

  .desktop-menu li {
    font-size: 1.3rem;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    position: relative; /* important */
  }

  .desktop-menu a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative; /* added */
  }

  .desktop-menu a:hover {
    color: #bcccdc;
  }

  /* Default hidden underline */
  .desktop-menu a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 0;
    height: 2px;
    background-color: #bcccdc;
    transition: width 0.3s ease;
  }

  /* Grow underline on hover */
  .desktop-menu a:hover::after {
    width: 100%;
  }

  /* 🛠 KEEP underline if active */
  .desktop-menu a.router-link-exact-active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 100%;
    height: 2px;
    background-color: #bcccdc;
  }
}
</style>
