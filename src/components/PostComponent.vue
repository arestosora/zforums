<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content flex-1 flex flex-col">
      <div class="posts-wrapper flex-1 flex flex-col overflow-y-auto pb-16">
        <!-- Create Post Container -->
        <div class="create-post-container post bg-black text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg transition-transform transform hover:scale-105">
          <div class="header flex items-center mb-4">
            <img class="avatar w-10 h-10 rounded-full mr-4" :src="authState.user?.avatar || '../assets/avatar.png'" alt="Avatar" />
            <div class="user-info">
              <div class="flex items-center">
                <span class="username font-bold">{{ authState.user?.name || 'Username' }}</span>
              </div>
            </div>
          </div>
          <div class="content mb-4">
            <textarea v-model="newPostContent" class="w-full p-2 bg-gray-800 text-white border rounded mb-4" rows="3" placeholder="What's on your mind?"></textarea>
            <div class="flex items-center mb-4">
              <button @click="triggerFileInput" class="upload-button hover:text-green-500">
                <i class="pi pi-image mr-2"></i>Upload Image
              </button>
              <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden">
            </div>
            <img v-if="newPostImageUrl" :src="newPostImageUrl" alt="Selected Image" class="selected-image w-full rounded mb-4">
          </div>
          <div class="actions flex justify-end text-gray-500">
            <button @click="createPost" class="create-post-button hover:text-green-500">
              <i class="pi pi-plus mr-2"></i>Post
            </button>
          </div>
        </div>

        <div v-for="post in sortedPosts" :key="post.id" class="post bg-black text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg transition-transform transform hover:scale-105">
          <div class="header flex items-center mb-4">
            <img class="avatar w-10 h-10 rounded-full mr-4" :src="post.author!.avatar" alt="Avatar" />
            <div class="user-info flex-grow">
              <div class="flex items-center">
                <span class="username font-bold">{{ post.author!.name }}</span>
                <span class="timestamp text-gray-500 text-sm ml-2">@{{ post.author!.name }} · {{ formatDate(post.createdAt!) }}</span>
              </div>
            </div>
            <div v-if="authState.user?.id === post.author!.id" class="flex ml-auto">
              <button @click="editPost(post.id!)" class="edit-button hover:text-blue-500 mr-2">
                <i class="pi pi-pencil"></i>
              </button>
              <button @click="deletePost(post.id!)" class="delete-button hover:text-red-500">
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </div>
          <div class="content mb-4">
            <p>{{ post.content }}</p>
            <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" class="post-image w-full rounded">
          </div>
          <div class="actions flex justify-between text-gray-500">
            <button @click="toggleLike(post)" :class="{'text-green-500': post.liked, 'text-gray-500': !post.liked}" class="action-button hover:text-green-500">
              <i class="pi pi-thumbs-up mr-1"></i>Like <span class="ml-1">{{ post.likes }}</span>
            </button>
            <button @click="navigateToComments(post.id!)" class="action-button hover:text-green-500">
              <i class="pi pi-comments mr-1"></i>Comment <span class="ml-1">{{ post.comments!.length }}</span>
            </button>
            <button class="action-button hover:text-green-500">
              <i class="pi pi-share-alt mr-1"></i>Share
            </button>
          </div>
        </div>
        
        <!-- Extra space at the bottom -->
        <div class="bottom-gap"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { authState } from '../auth';
import { format } from 'date-fns';
import type { Post } from '@/interfaces/post';
import Sidebar from './SidebarComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref<Post[]>([]);
const newPostContent = ref('');
const newPostImageUrl = ref('');
const toast = useToast();
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(async () => {
  if (!authState.token) {
    toast.add({ severity: 'error', summary: 'Session Expired', detail: 'Please log in again.' });
    return;
  }

  try {
    const response = await axios.get('/posts', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authState.token}`
      }
    });
    posts.value = response.data.map((post: Post) => ({
      ...post,
      liked: false
    })).sort((a: Post, b: Post) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    console.log('Data received:', response.data);
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error fetching posts', detail: 'Please try again later.' });
    console.error(err);
  }
});

const sortedPosts = computed(() => {
  return posts.value.slice().sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
});

const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
};

const createPost = async () => {
  if (!newPostContent.value) return;

  try {
    const response = await axios.post('/posts', {
      title: 'New Post',
      content: newPostContent.value,
      imageUrl: newPostImageUrl.value
    }, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });

    posts.value.unshift({
      ...response.data,
      liked: false
    });
    newPostContent.value = '';
    newPostImageUrl.value = '';

    location.reload();
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error creating post', detail: 'Please try again later.' });
    console.error(err);
  }
};

const deletePost = async (postId: number) => {
  try {
    await axios.delete(`/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });
    posts.value = posts.value.filter(post => post.id !== postId);
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error deleting post', detail: 'Please try again later.' });
    console.error(err);
  }
};

const editPost = (postId: number) => {
  toast.add({ severity: 'info', summary: 'Edit Post', detail: 'Feature coming soon!' });
};

const toggleLike = async (post: Post) => {
  try {
    await axios.patch(`/posts/${post.id}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });

    post.liked = !post.liked;
    post.likes! += post.liked ? 1 : -1;
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error liking post', detail: 'Please try again later.' });
    console.error(err);
  }
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  
  const uploadPreset = 'ljgz0ika';
  const apiKey = '186842759432363';
  const timestamp = Math.floor(Date.now() / 1000);

  formData.append('upload_preset', uploadPreset);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());

  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dijbgmxrh/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    newPostImageUrl.value = response.data.secure_url;
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error uploading image', detail: 'Please try again later.' });
    console.error(err);
  }
};

const navigateToComments = (postId: number) => {
  router.push({ name: 'postComments', params: { id: postId } });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.main-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
}

.posts-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 4rem; /* Adjust the bottom padding as needed */
}

.bottom-gap {
  height: 4rem; /* Adjust the height to create the gap */
}

.create-post-container {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  border-radius: 0.75rem;
}

.create-post-button {
  background-color: #22c55e;
  color: #ffffff;
  padding: 0.25rem 1rem;
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
  width: 100%;
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

.delete-button {
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  transition: color 0.3s ease;
}

.delete-button:hover {
  color: #ff0000;
}

.edit-button {
  background: none;
  border: none;
  color: #00bfff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.edit-button:hover {
  color: #007fff;
}

textarea {
  background-color: #1f1e1e;
  border: 1px solid #444;
  border-radius: 0.375rem;
  color: #fff;
  padding: 0.5rem;
  width: 100%;
  resize: none;
}

img.post-image {
  max-width: 100%;
  border-radius: 0.375rem;
  margin-top: 1rem;
}

img {
  max-width: 100%;
  border-radius: 0.375rem;
}

button.upload-button {
  background: none;
  border: none;
  color: #22c55e;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

button.upload-button:hover {
  color: #16a34a;
}

.selected-image {
  max-width: 100%;
  border-radius: 0.375rem;
}
</style>
