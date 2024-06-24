<script setup lang="ts">
import { ref } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import LoginComponent from './components/LoginComponent.vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="bg-black text-white min-h-screen flex flex-col">
    <HeaderComponent @open-login-modal="openModal" />
    <main class="flex-grow p-6">
      <router-view />
    </main>
    <FooterComponent />
    <LoginComponent :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<style>
body {
  margin: 0;
}
html, body, #app {
  height: 100%;
}
</style>