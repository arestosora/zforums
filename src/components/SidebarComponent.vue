<template>
  <div>
    <Sidebar v-model:visible="visible" class="bg-black text-white">
      <!-- Logo Section -->
      <div class="flex items-center p-4 hover:zoom-in">
        <img src="../assets/logo2.png" alt="Logo" class="h-8 w-8 mr-2" />
        <h1 class="text-xl font-bold font-poppins">Animerse</h1>
      </div>
      <!-- Navigation Links -->
      <nav class="mt-5">
        <ul>

          <li class="flex items-center p-4 cursor-pointer hover:zoom-in">
            <router-link to="/" class="flex items-center">
              <i class="pi pi-home text-light-green"></i>
              <span class="ml-4 font-poppins">Home</span>
            </router-link>
          </li>

          <li class="flex items-center p-4 cursor-pointer hover:zoom-in">
            <router-link to="/" class="flex items-center">
              <i class="pi pi-search text-light-green"></i>
              <span class="ml-4 font-poppins">Explore</span>
            </router-link>
          </li>


        </ul>
      </nav>
      <!-- User Profile Section -->
      <div class="flex items-center p-4 cursor-pointer hover:zoom-in">
        <router-link to="/profile" class="flex items-center">
          <img :src="userProfilePic" alt="Profile" class="h-8 w-8 rounded-full" />
          <div class="ml-4">
            <h2 class="text-sm font-semibold font-poppins">{{ userName }}</h2>
            <p class="text-xs text-gray-400 font-poppins">@{{ userName }}</p>
          </div>
        </router-link>
      </div>
    </Sidebar>
    <!-- Button to toggle Sidebar -->
    <button class="p-button p-component" @click="visible = true">
      <i class="pi pi-bars"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import 'primeicons/primeicons.css';
import Sidebar from 'primevue/sidebar';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import { authState } from '../auth';

const visible = ref(false);
const userName = ref<string>('');
const userProfilePic = ref<string>('');

onMounted(() => {
  if (authState.user) {
    userName.value = authState.user.name;
    userProfilePic.value = authState.user.avatar;
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.bg-black {
  background-color: #000;
}

.text-white {
  color: #fff;
}

.text-light-green {
  color: #90ee90;
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:zoom-in:hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

a {
  text-decoration: none;
  color: inherit;
}

.router-link-active {
  color: #90ee90;
}
</style>
