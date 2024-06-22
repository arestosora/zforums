<template>
  <header class="bg-black text-mainColor shadow-md">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-10">
      </div>
      <nav>
        <ul class="flex space-x-6 text-base font-semibold">
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">
              <font-awesome-icon :icon="['fas', 'home']" class="h-5 w-5" />
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">
              <font-awesome-icon :icon="['fas', 'cogs']" class="h-5 w-5" />
            </a>
          </li>
        </ul>
      </nav>
      <div class="hidden md:block">
        <button class="bg-gray-800 hover:bg-gray-700 text-mainColor font-semibold py-2 px-4 rounded transition duration-300">Login</button>
        <button class="ml-4 bg-transparent hover:bg-gray-700 text-mainColor font-semibold hover:text-white py-2 px-4 border border-customColor hover:border-transparent rounded transition duration-300">Sign Up</button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faCogs } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faCogs);

export default defineComponent({
  name: "HeaderComponent",
  components: {
    FontAwesomeIcon
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
* {
  font-family: 'Poppins', sans-serif;
}
</style>
