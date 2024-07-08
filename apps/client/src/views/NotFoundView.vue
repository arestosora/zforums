<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <router-link to="/">Go back home</router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'NotFound'
  });
  </script>
  
  <style scoped>
  @import '@/assets/styles/NotFoundView.css'
  </style>