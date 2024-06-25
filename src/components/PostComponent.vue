<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="container mx-auto p-4 flex-1">
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div class="flex justify-end mb-4">
        <button @click="openModal" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">Create New Post</button>
      </div>
      <div v-for="post in posts" :key="post.id"
        class="post bg-black text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg">
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
          <button class="like-button hover:text-green-500">Like</button>
          <button class="comment-button hover:text-green-500">Comment</button>
          <button class="share-button hover:text-green-500">Share</button>
        </div>
      </div>
      <div v-if="posts.length === 0" class="text-white">
        Loading...
      </div>
    </div>

    <!-- Create Post Modal -->
    <CreatePostComponent :visible="isModalVisible" @close="closeModal" @postCreated="handlePostCreated" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
    posts.value = response.data;
    console.log('Datos recibidos:', response.data);
  } catch (err) {
    error.value = 'Error fetching posts';
    console.error(err);
  }
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
  const newPost = {
    title: 'New Post',
    content: newPostContent,
  };
  posts.value.unshift(newPost);
};
</script>

<style scoped>
.container {
  background-color: #000000;
  min-height: 100vh;
}

.post {
  max-width: 700px;
  margin: 0 auto;
}

.header .avatar {
  border-radius: 50%;
}

.username {
  font-weight: bold;
}

.timestamp {
  color: #777;
}

.actions button {
  cursor: pointer;
}
</style>
