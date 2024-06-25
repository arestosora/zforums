<template>
  <header class="bg-dark-gray shadow-md">
    <div class="container mx-auto px-6 py-2 flex justify-between items-center">
      <div>
        <router-link to="/" class="text-light-green hover:underline">
          <i class="pi pi-home"></i>
        </router-link>
      </div>
      <div class="text-white text-center flex-grow">
        <span v-if="!authState.isAuthenticated">
          if you need to sign up,
          <router-link to="/register" class="text-light-green hover:underline">click here</router-link>,
          or if you want to sign in,
          <button @click="$emit('open-login-modal')" class="text-light-green hover:underline">click here.</button>
        </span>
      </div>
      <div v-if="authState.isAuthenticated">
        <button @click="logout" class="text-light-green hover:underline">log out</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { authState } from '../auth';
import { logout } from '../auth';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.text-light-green {
  color: #90ee90;
}

.bg-dark-gray {
  background-color: #0f0f0f;
}

.pi-home {
  font-size: 1.5rem; /* Ajusta el tamaño del ícono según tus necesidades */
}
</style>
