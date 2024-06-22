<template>
  <header class="bg-black text-white shadow-md">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-10">
      </div>
      <nav>
        <ul class="flex space-x-6 text-base font-semibold">
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">Home</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">Services</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">Status</a>
          </li>
        </ul>
      </nav>
      <div class="hidden md:block">
        <button class="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-300">Login</button>
        <button class="ml-4 bg-transparent hover:bg-gray-700 text-gray-400 font-semibold hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent rounded transition duration-300">Sign Up</button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "HeaderComponent",
});
</script>

<style scoped>
/* Importa la fuente Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>
