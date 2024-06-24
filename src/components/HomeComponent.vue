<template>
  <div class="flex flex-col min-h-screen text-white">
    <main class="flex-grow p-6 flex flex-col justify-start items-center">
      <img :src="animeGif" alt="Anime GIF" class="rounded-lg interactive-image">
      <img :src="img2" alt="Image 2" class="rounded-lg interactive-image image-secondary">
      <img :src="img3" alt="Image 3" class="rounded-lg interactive-image image-third"> <!-- Nueva imagen añadida aquí -->
    </main>
  </div>
</template>

<script setup lang="ts">
import animeGif from '@/assets/anime.gif';
import img2 from '@/assets/img2.png';
import img3 from '@/assets/img3.png'; // Importando la nueva imagen
</script>

<style>
.rounded-lg {
  border-radius: 0.9rem; /* Bordes redondeados */
}

.interactive-image {
  width: 65%; /* Tamaño de la imagen */
  height: auto; /* Mantiene la proporción de la imagen */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animación suave */
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6); /* Sombra inicial */
}

.interactive-image:hover {
  transform: scale(0.98); /* Efecto de hundimiento */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Sombra más suave */
}

.image-secondary {
  margin-top: 3rem; /* Espacio entre la primera y segunda imagen */
}

.image-third {
  margin-top: 3rem; /* Espacio entre la segunda y tercera imagen */
}
</style>
