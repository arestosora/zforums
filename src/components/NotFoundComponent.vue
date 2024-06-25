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
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
  .not-found {
    padding: 20px;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
    margin-top: 7%;
    text-align: center;
    font-family: 'Poppins', sans-serif;
  }
  
  .not-found h1 {
    color: #333;
    font-family: 'Poppins', sans-serif;
  }
  
  .not-found p {
    color: #666;
    line-height: 1.6;
    font-family: 'Poppins', sans-serif;
  }
  
  .not-found a {
    color: #1e90ff;
    text-decoration: none;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
  }
  
  .not-found a:hover {
    text-decoration: underline;
  }
  </style>
  