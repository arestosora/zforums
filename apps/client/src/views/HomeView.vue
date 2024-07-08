<template>
  <div class="home-container h-screen w-full overflow-auto p-6">
    <div class="home-content flex flex-col items-center">
      <img :src="animeGif" alt="Anime GIF" class="rounded-lg interactive-image">
      <img :src="img2" alt="Image 2" class="rounded-lg interactive-image image-secondary">
      <img :src="img3" alt="Image 3" class="rounded-lg interactive-image image-third">
    </div>
  </div>
</template>

<script setup lang="ts">
import animeGif from '@/assets/anime.gif';
import img2 from '@/assets/img2.png';
import img3 from '@/assets/img3.png';
</script>

<script lang="ts">
export default {
  name: 'HomeView'
}
</script>

<style scoped>
@import '@/assets/styles/HomeView.css'
</style>

