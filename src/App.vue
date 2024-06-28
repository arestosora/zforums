<script setup lang="ts">
import { ref } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import LoadingScreen from './components/LoadingScreenComponent.vue';
import { isLoading } from './loadingState';
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="app-container background-image text-white flex flex-col min-h-screen">
    <LoadingScreen v-if="isLoading" />
    <HeaderComponent @open-login-modal="openModal" />
    <main class="flex-grow p-6 overflow-auto">
      <router-view />
    </main>
    <FooterComponent />
    <LoginComponent :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: fit-content;
}

.background-image {
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: 1;
}
</style>
