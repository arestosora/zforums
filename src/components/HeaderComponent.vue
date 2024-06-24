<template>
  <header class="bg-black text-mainColor shadow-md">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-10">
      </div>
      <nav>
        <ul class="flex space-x-6 text-base font-semibold">
          <li>
            <router-link to="/" class="hover:text-gray-400 transition duration-300">Home</router-link>
          </li>
          <li>
            <router-link to="/services" class="hover:text-gray-400 transition duration-300">Services</router-link>
          </li>
        </ul>
      </nav>
      <div class="hidden md:block relative">
        <template v-if="!authState.isAuthenticated">
          <button @click="$emit('open-login-modal')" class="bg-gray-800 hover:bg-gray-700 text-mainColor font-semibold py-2 px-4 rounded transition duration-300">Login</button>
          <router-link to="/register">
            <button class="ml-4 bg-transparent hover:bg-gray-700 text-mainColor font-semibold hover:text-white py-2 px-4 border border-customColor hover:border-transparent rounded transition duration-300">Sign Up</button>
          </router-link>
        </template>
        <template v-else>
          <button @click="toggleMenu" class="focus:outline-none">
            <font-awesome-icon :icon="['fas', 'user']" class="text-mainColor" />
          </button>
          <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
            <router-link to="/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Profile</router-link>
            <router-link to="/pets" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Pets</router-link>
            <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { authState, logout } from '../auth';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser);

// Estado del menú desplegable
const isMenuOpen = ref(false);

// Función para alternar el estado del menú
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Cerrar el menú cuando se haga clic fuera de él
const closeMenu = (event: Event) => {
  if (!(event.target as HTMLElement).closest('.relative')) {
    isMenuOpen.value = false;
  }
};

// Escuchar eventos de clic en el documento
document.addEventListener('click', closeMenu);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.relative .fa-user {
  font-size: 24px;
  cursor: pointer;
}
</style>
