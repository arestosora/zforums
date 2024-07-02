<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <div class="app-container flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-grow p-6 overflow-hidden">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: black;
  overflow: hidden;
}
</style>

<style>

body {
  overflow: hidden;
  margin: 0;
}
</style>
