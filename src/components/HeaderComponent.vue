<template>
  <header class="bg-black text-mainColor shadow-md">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-10">
      </div>
      <nav>
        <ul class="flex space-x-6 text-base font-semibold">
          <li>
            <router-link to="/" class="hover:text-gray-400 transition duration-300">Home</router-link>
          </li>
          <li>
            <router-link to="/services" class="hover:text-gray-400 transition duration-300">Services</router-link>
          </li>
        </ul>
      </nav>
      <div class="hidden md:block">
        <button class="bg-gray-800 hover:bg-gray-700 text-mainColor font-semibold py-2 px-4 rounded transition duration-300">Login</button>
        <router-link to="/register">
          <button class="ml-4 bg-transparent hover:bg-gray-700 text-mainColor font-semibold hover:text-white py-2 px-4 border border-customColor hover:border-transparent rounded transition duration-300">Sign Up</button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "HeaderComponent",
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>