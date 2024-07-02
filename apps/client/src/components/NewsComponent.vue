<template>
  <div class="news-section p-4">
    <div v-for="news in newsList" :key="news.id" class="news-item mb-4 p-4 border border-gray-300 rounded-md shadow-sm">
      <img :src="news.image" alt="News image" class="news-image mb-4 w-full h-auto object-cover rounded-md"/>
      <h3 class="text-lg font-semibold">{{ news.title }}</h3>
      <p class="text-gray-300">{{ news.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newsList = ref([
  { id: 1, title: 'New Mushuku Tensei Movie?', content: 'This new installment was produced by Studio Bind, with Ryōsuke Shibuya, assistant director of the first part, in charge of directing. On the other hand, Toshiya Ōno was responsible for the script.', image: 'https://a.storyblok.com/f/178900/1920x1080/22d162c483/mushoku-tensei-jobless-reincarnation.png/m/1200x0/filters:quality(95)format(webp)' },
  { id: 2, title: 'Is the new Elden Ring DLC, Too hard?', content: 'The great debate surrounding Shadow of the Erdtree, the Elden Ring DLC, has been focused on its difficulty. Specifically, it centers on certain bosses like Messmer or the one that concludes the expansion.', image: 'https://www.enter.co/wp-content/uploads/2024/06/elden_ring_shadow_erdtree_details.jpg'  },
]);
</script>

<style scoped>
.news-section {
  flex: 1;
  padding: 1rem;
  background-color: transparent;
  overflow-y: auto;
  color: white;
  border-left: 1px solid #444;
  scrollbar-width: thin;
  scrollbar-color: #888 #333;
}

.news-section::-webkit-scrollbar {
  width: 8px;
}

.news-section::-webkit-scrollbar-track {
  background: #333;
  border-radius: 10px;
}

.news-section::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 2px solid #333;
}

.news-section h2 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.news-item {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #444;
  border-radius: 0.5rem;
  background-color: transparent;
  color: white;
}

.news-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
