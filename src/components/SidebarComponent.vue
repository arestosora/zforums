<template>
  <div class="h-screen bg-black text-white flex flex-col justify-between">
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
            <font-awesome-icon :icon="['fas', 'home']" />
            <span class="ml-4">Home</span>
          </li>
          <li class="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <font-awesome-icon :icon="['fas', 'search']" />
            <span class="ml-4">Explore</span>
          </li>
          <!-- Add more navigation links here -->
        </ul>
      </nav>
    </div>
    <div>
      <!-- User Profile Section -->
      <div class="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
        <img :src="userProfilePic" alt="Profile" class="h-8 w-8 rounded-full"/>
        <div class="ml-4">
          <h2 class="text-sm font-semibold">{{ userName }}</h2>
          <p class="text-xs text-gray-400">@{{ userHandle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { authState } from '../auth';

export default defineComponent({
  name: 'Sidebar',
  components: {
    FontAwesomeIcon
  },
  setup() {
    const userName = ref<string>('');
    const userProfilePic = ref<string>('');
    const userHandle = ref<string>('');

    onMounted(() => {
      if (authState.user) {
        userName.value = authState.user.name;
        userProfilePic.value = authState.user.avatar;
        userHandle.value = authState.user.handle;
      }
    });

    return {
      userName,
      userProfilePic,
      userHandle
    };
  }
});
</script>

<style scoped>
</style>
