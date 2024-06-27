<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="container mx-auto p-4 flex-1">
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div class="flex justify-end mb-4">
        <button @click="openModal" class="create-post-button">
          <i class="pi pi-plus mr-2"></i>Create New Post
        </button>
      </div>
      <div v-for="post in sortedPosts" :key="post.id"
        class="post bg-black text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg transition-transform transform hover:scale-105">
        <div class="header flex items-center mb-4">
          <img class="avatar w-10 h-10 rounded-full mr-4" :src="post.author!.avatar" alt="Avatar" />
          <div class="user-info">
            <div class="flex items-center">
              <span class="username font-bold">{{ post.author!.name }}</span>
              <span class="timestamp text-gray-500 text-sm ml-2">@{{ post.author!.name }} · {{ formatDate(post.createdAt!) }}</span>
            </div>
          </div>
        </div>
        <div class="content mb-4">
          <p>{{ post.content }}</p>
        </div>
        <div class="actions flex justify-between text-gray-500">
          <button class="action-button hover:text-green-500">
            <i class="pi pi-thumbs-up mr-1"></i>Like
          </button>
          <button class="action-button hover:text-green-500">
            <i class="pi pi-comments mr-1"></i>Comment
          </button>
          <button class="action-button hover:text-green-500">
            <i class="pi pi-share-alt mr-1"></i>Share
          </button>
        </div>
      </div>
    </div>

    <!-- Create Post Modal -->
    <CreatePostComponent :visible="isModalVisible" @close="closeModal" @postCreated="handlePostCreated" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { authState } from '../auth';
import { format } from 'date-fns';
import type { Post } from '@/interfaces/post';
import Sidebar from './SidebarComponent.vue';
import CreatePostComponent from './CreatePostComponent.vue';

const posts = ref<Post[]>([]);
const error = ref<string | null>(null);
const isModalVisible = ref(false);

onMounted(async () => {
  if (!authState.token) {
    error.value = 'No token available';
    return;
  }

  try {
    const response = await axios.get('/posts', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authState.token}`
      }
    });
    posts.value = response.data.sort((a: Post, b: Post) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    console.log('Datos recibidos:', response.data);
  } catch (err) {
    error.value = 'Your session has expired. Please log in again.';
    console.error(err);
  }
});

const sortedPosts = computed(() => {
  return posts.value.slice().sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
});

const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
};

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const handlePostCreated = (newPostContent: string) => {
  const newPost: Post = {
    title: 'New Post',
    content: newPostContent,
  };
  posts.value.unshift(newPost);
};
</script>

<style scoped>
@import 'primeicons/primeicons.css';

.container {
  background-color: #000000;
  min-height: 100vh;
  padding-top: 2rem;
}

.create-post-button {
  background-color: #22c55e;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.create-post-button:hover {
  background-color: #16a34a;
}

.post {
  max-width: 700px;
  margin: 0 auto;
  border-radius: 0.75rem;
  transition: transform 0.3s ease;
}

.post:hover {
  transform: scale(1.05);
}

.header .avatar {
  border-radius: 50%;
}

.username {
  font-weight: bold;
  color: #ffffff;
}

.timestamp {
  color: #777;
}

.actions .action-button {
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.actions .action-button:hover {
  color: #22c55e;
}
</style>
