<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <div class="bg-black text-white min-h-screen flex flex-col">
    <HeaderComponent />
    <main class="flex-grow p-6">
      <router-view />
    </main>
    <FooterComponent />
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