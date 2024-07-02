<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import LoadingComponent from './components/LoadingComponent.vue';
const isLoading = ref(false);
</script>

<template>
  <div class="app-container flex flex-col min-h-screen">
    <HeaderComponent />
    <LoadingComponent :visible="isLoading" />
    <main class="flex-grow p-6 overflow-hidden">
      <router-view @loading="isLoading = $event" />
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
