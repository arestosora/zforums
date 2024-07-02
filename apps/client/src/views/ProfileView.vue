<template>
    <div class="flex flex-col min-h-screen bg-transparent text-white pb-6">
      <SidebarComponent />
      <main class="flex-grow -p-1 flex justify-center items-start overflow-auto mt-6 main-container">
        <div class="relative p-8 bg-transparent rounded-lg shadow-lg w-full max-w-4xl border border-light-green">
          <LoadingComponent :visible="isLoading" />
          <div class="banner-container relative">
            <img :src="authState.user?.banner || defaultBanner" alt="Banner Image"
              :class="['banner-image', { 'darken-image': showSettings }]" />
            <button v-if="showSettings" @click="triggerBannerUpload" class="edit-icon absolute top-1 left-2">
              <i class="pi pi-pencil"></i>
            </button>
            <input type="file" ref="bannerInput" @change="uploadBanner" class="hidden">
          </div>
          <div class="absolute top-2 right-2">
            <button @click="showSettings = !showSettings" class="edit-icon">
              <i class="pi pi-cog"></i>
            </button>
          </div>
          <div class="flex flex-col items-center mt-12 relative">
            <img :src="authState.user?.avatar || defaultAvatar" alt="User Avatar"
              :class="['profile-avatar mb-4', { 'darken-image': showSettings }]" />
            <button v-if="showSettings" @click="triggerAvatarUpload"
              class="edit-icon absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <i class="pi pi-pencil"></i>
            </button>
            <input type="file" ref="avatarInput" @change="uploadAvatar" class="hidden">
            <p class="username mt-2">{{ authState.user?.name }}</p>
            <textarea v-if="showSettings" v-model="bio" class="bio text-area"></textarea>
            <p v-else class="bio">{{ authState.user?.bio || 'No bio was provided yet.' }}</p>
          </div>
          <div v-if="showSettings" class="mt-6">
            <div class="mb-6 flex justify-center">
              <button @click="currentSection = 'name'" :class="buttonClass(currentSection === 'name')"
                class="custom-button py-2 px-4 rounded-l">My Data</button>
              <button @click="currentSection = 'password'" :class="buttonClass(currentSection === 'password')"
                class="custom-button py-2 px-4 rounded-r">Change Password</button>
            </div>
            <form v-if="currentSection === 'name'" @submit.prevent="updateProfile">
              <div class="mb-5">
                <label for="name" class="block text-beige mb-1">Name</label>
                <input type="text" v-model="name" id="name"
                  class="w-full mt-1 bg-transparent text-lightgreen border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
              </div>
              <div class="mb-5">
                <label for="email" class="block text-beige mb-1">Email</label>
                <input type="email" v-model="email" id="email"
                  class="w-full mt-1 bg-transparent text-lightgreen border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
              </div>
              <button type="submit"
                class="custom-update-button w-full py-2 rounded transition-transform transform hover:scale-105">Update Profile</button>
            </form>
            <form v-if="currentSection === 'password'" @submit.prevent="updatePassword">
              <div class="mb-5">
                <label for="password" class="block text-beige mb-1">Password</label>
                <input type="password" v-model="password" id="password"
                  class="w-full mt-1 bg-transparent text-lightgreen border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
              </div>
              <div class="mb-5">
                <label for="confirmPassword" class="block text-beige mb-1">Confirm Password</label>
                <input type="password" v-model="confirmPassword" id="confirmPassword"
                  class="w-full mt-1 bg-transparent text-lightgreen border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
              </div>
              <button type="submit"
                class="custom-update-button w-full py-2 rounded transition-transform transform hover:scale-105">Change Password</button>
            </form>
          </div>
  
          <!-- Sección para mostrar los posts compartidos -->
          <div class="shared-posts mt-6 overflow-auto max-h-96">
            <div v-if="sharedPosts.length === 0" class="text-center text-gray-500">No shared posts yet.</div>
            <div v-for="post in sharedPosts" :key="post.id"
              class="post bg-black text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg transition-transform transform hover:scale-105">
              <div class="header flex items-center mb-4">
                <img class="post-avatar w-8 h-8 rounded-full mr-4" :src="post.author.avatar" alt="Avatar" />
                <div class="user-info flex-grow">
                  <div class="flex items-center">
                    <span class="username font-bold">{{ post.author.name }}</span>
                    <span class="timestamp text-gray-500 text-sm ml-2">@{{ post.author.name }} · {{
                      formatDate(post.createdAt) }}</span>
                  </div>
                  <div class="shared-post text-gray-500 text-sm italic">{{ authState.user?.name }} has shared this post</div>
                </div>
              </div>
              <div class="content mb-4">
                <p>{{ post.content }}</p>
                <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image"
                  class="post-image w-full rounded">
              </div>
              <div class="actions flex justify-between text-gray-500">
                <button @click="toggleLike(post)"
                  :class="{ 'text-green-500': post.liked, 'text-gray-500': !post.liked }"
                  class="action-button hover:text-green-500">
                  <i class="pi pi-thumbs-up mr-1"></i>Like <span class="ml-1">{{ post.likes }}</span>
                </button>
                <button @click="navigateToComments(post.id)" class="action-button hover:text-green-500">
                  <i class="pi pi-comments mr-1"></i>Comment <span class="ml-1">{{ post.comments.length }}</span>
                </button>
                <button class="action-button hover:text-green-500">
                  <i class="pi pi-share-alt mr-1"></i>Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { authState } from '../utils/auth';
  import { format } from 'date-fns';
  import SidebarComponent from '@/components/SidebarComponent.vue';
  import type { Post } from '@/types/Post';
  import { showErrorAlert, showSuccessAlert } from '@/utils/fireAlert';
  import LoadingComponent from '@/components/LoadingComponent.vue';
  
  const currentSection = ref('name');
  const showSettings = ref(false);
  const name = ref(authState.user?.name || '');
  const email = ref(authState.user?.email || '');
  const password = ref('');
  const confirmPassword = ref('');
  const bio = ref(authState.user?.bio || '');
  
  const defaultAvatar = 'path_to_default_avatar_image';
  const defaultBanner = '../assets/register_background.png';
  const sharedPosts = ref<Post[]>([]);
  const avatarInput = ref<HTMLInputElement | null>(null);
  const bannerInput = ref<HTMLInputElement | null>(null);
  const isLoading = ref(false);
  
  const buttonClass = (isActive: boolean) => isActive ? 'bg-gray-700 text-white' : 'bg-gray-500 text-gray-200';
  
  const updateProfile = async () => {
    console.log('Name:', name.value);
    console.log('Email:', email.value);
    console.log('Bio:', bio.value);
    try {
      const response = await axios.put('/auth/update-profile', {
        name: name.value,
        email: email.value,
        bio: bio.value,
        avatar: authState.user?.avatar,
        banner: authState.user?.banner
      }, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      });
      authState.user = {
        ...authState.user,
        name: response.data.name,
        email: response.data.email,
        bio: response.data.bio,
        avatar: response.data.avatar,
        banner: response.data.banner
      };
      localStorage.setItem('authState', JSON.stringify(authState));
      showSuccessAlert('Your profile has been updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (err) {
      console.error('Error updating profile:', err);
      showErrorAlert('Failed to update profile');
    }
  };
  
  const updatePassword = async () => {
    if (password.value !== confirmPassword.value) {
      showErrorAlert('Passwords do not match');
      return;
    }
    try {
      await axios.put('/auth/update-profile', {
        password: password.value
      }, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      });
      showSuccessAlert('Your password has been updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 3100);
    } catch (err) {
      console.error('Error updating password:', err);
      showErrorAlert('Failed to update password');
    }
  };
  
  const triggerAvatarUpload = () => {
    if (avatarInput.value) {
      avatarInput.value.click();
    }
  };
  
  const triggerBannerUpload = () => {
    if (bannerInput.value) {
      bannerInput.value.click();
    }
  };
  
  const uploadAvatar = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
  
    isLoading.value = true;
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
  
      const avatarUrl = response.data.secure_url;
      authState.user = {
        ...authState.user,
        avatar: avatarUrl
      };
      localStorage.setItem('authState', JSON.stringify(authState));
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
  
  const uploadBanner = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
  
    isLoading.value = true;
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
  
      const bannerUrl = response.data.secure_url;
      authState.user = {
        ...authState.user,
        banner: bannerUrl
      };
      localStorage.setItem('authState', JSON.stringify(authState));
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
  
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
  };
  
  onMounted(async () => {
    try {
      const response = await axios.get(`/posts/shared-by-user/${authState.user?.id}`, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      });
      sharedPosts.value = response.data.sort((a: any, b: any) => new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime());
    } catch (err) {
      console.error('Error fetching shared posts:', err);
    }
  });
  
  const toggleLike = async (post: Post) => {
    try {
      await axios.patch(`/posts/${post.id}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      });
  
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };
  
  const navigateToComments = (postId: number) => {
  
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
  
  .main-container {
      position: relative;
      top: -0px;
  }
  
  .text-beige {
      color: #f5f5dc;
  }
  
  .border-gray-600 {
      border-color: #4a4a4a;
  }
  
  .border-light-green {
      border-color: rgb(204, 255, 204);
  }
  
  .focus\:border-gray-400:focus {
      border-color: #a3a3a3;
  }
  
  .focus\:ring-gray-500:focus {
      --tw-ring-color: #6b6b6b;
  }
  
  .profile-avatar {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      margin-top: -150px;
      position: relative;
  }
  
  .banner-container {
      width: 100%;
      max-width: 800px;
      height: 200px;
      overflow: hidden;
  }
  
  .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  
  .bio {
      text-align: center;
      margin-top: 10px;
      font-size: 1rem;
  }
  
  footer {
      padding: 20px;
      text-align: center;
      width: 100%;
      position: relative;
      bottom: 0;
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
  
  .header .post-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
  }
  
  .username {
      font-weight: bold;
      color: #ffffff;
  }
  
  .timestamp {
      color: #777;
  }
  
  .shared-post {
      color: #777;
      font-style: italic;
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
  
  textarea {
      background-color: transparent;
      border: 1px solid #444;
      border-radius: 0.375rem;
      color: #90ee90;
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
  
  .shared-posts {
      max-height: 250px;
      overflow-y: auto;
      scroll-behavior: smooth;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  }
  
  .shared-posts::-webkit-scrollbar {
      width: 8px;
  }
  
  .shared-posts::-webkit-scrollbar-track {
      background: #1a1a1a; 
  }
  
  .shared-posts::-webkit-scrollbar-thumb {
      background-color: #22c55e;
      border-radius: 10px; 
      border: 2px solid #1a1a1a; 
  }
  
  .shared-posts::-webkit-scrollbar-thumb:hover {
      background-color: #2fd072;
  }
  
  .edit-icon {
      background: none;
      border: none;
      color: rgba(144, 238, 144, 0.5);
      cursor: pointer;
      font-size: 1.5rem;
      transition: color 0.3s ease;
  }
  
  .edit-icon:hover {
      color: rgba(144, 238, 144, 0.8);
  }
  
  .darken-image {
      filter: brightness(50%);
  }
  
  body {
      font-family: 'Poppins', sans-serif;
  }
  
  .custom-update-button {
      background-color: transparent;
      border: 1px solid rgb(204, 255, 204);
      color: rgb(204, 255, 204);
      font-weight: bold;
      transition: transform 0.3s ease;
  }
  
  .custom-update-button:hover {
      transform: scale(1.1);
  }
  
  .custom-button {
      background-color: transparent;
      border: 1px solid rgb(204, 255, 204);
      color: rgb(204, 255, 204);
      font-weight: bold;
      transition: transform 0.3s ease;
  }
  
  .custom-button:hover {
      transform: scale(1.1);
  }
  
  input[type="text"], input[type="email"], input[type="password"] {
      background-color: transparent;
      color: rgba(144, 238, 144, 0.5);
      border: 1px solid rgba(144, 238, 144, 0.5);
  }
  
  input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus {
      border-color: rgba(144, 238, 144, 0.8);
      outline: none;
  }
  </style>
  