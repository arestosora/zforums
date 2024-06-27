<template>
  <div class="home-content flex flex-col items-center overflow-auto p-6">
    <img :src="animeGif" alt="Anime GIF" class="rounded-lg interactive-image">
    <img :src="img2" alt="Image 2" class="rounded-lg interactive-image image-secondary">
    <img :src="img3" alt="Image 3" class="rounded-lg interactive-image image-third"> <!-- Nueva imagen añadida aquí -->
  </div>
</template>

<script setup lang="ts">
import animeGif from '@/assets/anime.gif';
import img2 from '@/assets/img2.png';
import img3 from '@/assets/img3.png'; // Importando la nueva imagen
</script>

<style scoped>
.home-content {
  max-height: 100%;
  overflow-y: auto;
  width: 100%;
}

.rounded-lg {
  border-radius: 0.9rem; 
}

.interactive-image {
  width: 65%; 
  height: auto; 
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
}

.interactive-image:hover {
  transform: scale(0.98);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.image-secondary {
  margin-top: 3rem;
}

.image-third {
  margin-top: 3rem;
}
</style>
