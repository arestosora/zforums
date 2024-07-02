<template>
  <div class="news-section p-4">
    <h2 class="text-xl font-semibold mb-6">Latest News</h2>
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
  { id: 1, title: 'News 1', content: 'This is the content for news 1.', image: '../assets/img2.png' },
  { id: 2, title: 'News 2', content: 'This is the content for news 2.', image: 'image.png' },
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
