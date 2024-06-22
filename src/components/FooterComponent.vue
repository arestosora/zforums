<template>
  <footer class="bg-black text-mainColor shadow-md mt-8">
    <div class="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-10">
        <span class="ml-2 text-base font-semibold">© 2024 Inside Out</span>
      </div>
      <nav class="mt-4 md:mt-0">
        <ul class="flex space-x-6 text-base font-semibold">
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">About Us</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">Contact</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">Privacy Policy</a>
          </li>
        </ul>
      </nav>
      <div class="mt-4 md:mt-0">
        <ul class="flex space-x-4">
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">
              <font-awesome-icon :icon="['fab', 'facebook']" class="h-5 w-5" />
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">
              <font-awesome-icon :icon="['fab', 'twitter']" class="h-5 w-5" />
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-400 transition duration-300">
              <font-awesome-icon :icon="['fab', 'instagram']" class="h-5 w-5" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebook, faTwitter, faInstagram);

export default defineComponent({
  name: "FooterComponent",
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