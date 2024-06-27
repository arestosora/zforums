<template>
  <div class="h-screen bg-black text-white flex flex-col overflow-hidden">
    <div>
      <!-- Logo Section -->
      <div class="flex items-center p-4">
        <img src="../assets/logo2.png" alt="Logo" class="h-8 w-8 mr-2"/>
        <h1 class="text-xl font-bold">Animerse</h1>
      </div>
      <!-- Navigation Links -->
      <nav class="mt-5">
        <ul>
          <li class="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <i class="pi pi-home"></i>
            <span class="ml-4">Home</span>
          </li>
          <li class="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <i class="pi pi-search"></i>
            <span class="ml-4">Explore</span>
          </li>
          <!-- Add more navigation links here -->
        </ul>
      </nav>
      <!-- User Profile Section -->
      <div class="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
        <img :src="userProfilePic" alt="Profile" class="h-8 w-8 rounded-full"/>
        <div class="ml-4">
          <h2 class="text-sm font-semibold">{{ userName }}</h2>
          <p class="text-xs text-gray-400">@{{ userName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import 'primeicons/primeicons.css';
import { authState } from '../auth';

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const userName = ref<string>('');
    const userProfilePic = ref<string>('');
    const userHandle = ref<string>('');

    onMounted(() => {
      if (authState.user) {
        userName.value = authState.user.name;
        userProfilePic.value = authState.user.avatar;
      }
    });

    return {
      userName,
      userProfilePic,
    };
  }
});
</script>

<style scoped>
</style>
