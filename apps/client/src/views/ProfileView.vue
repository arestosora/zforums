<template>
  <div class="flex flex-col min-h-screen bg-transparent text-white pb-6">
    <SidebarComponent />
    <main class="main-container">
      <div class="relative p-8 bg-transparent rounded-lg shadow-lg w-full max-w-4xl border border-light-green h-[55rem] flex flex-col">
        <LoadingComponent :visible="isLoading" />
        <div class="banner-container relative">
          <img :src="authState.user?.banner || defaultBanner" alt="Banner Image"
            :class="['banner-image', { 'darken-image': showSettings }]" />
          <button v-if="showSettings" @click="triggerBannerUpload" class="edit-icon absolute top-1 left-2">
            <i class="pi pi-pencil"></i>
          </button>
          <input type="file" ref="bannerInput" @change="handleUploadBanner" class="hidden">
        </div>
        <div class="absolute top-2 right-2">
          <button @click="showSettings = !showSettings" class="edit-icon">
            <i class="pi pi-cog"></i>
          </button>
        </div>
        <div class="flex flex-col items-center mt-8 relative">
          <img :src="authState.user?.avatar || defaultAvatar" alt="User Avatar"
            :class="['profile-avatar mb-4', { 'darken-image': showSettings }]" />
          <button v-if="showSettings" @click="triggerAvatarUpload"
            class="edit-icon absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <i class="pi pi-pencil"></i>
          </button>
          <input type="file" ref="avatarInput" @change="handleUploadAvatar" class="hidden">
          <p class="username mt-2">{{ authState.user?.name }}</p>
          <textarea v-if="showSettings" v-model="bio" class="bio text-area"></textarea>
          <p v-else class="bio">{{ authState.user?.bio || 'No bio was provided yet.' }}</p>
        </div>
        <div v-if="showSettings" class="mt-4">
          <div class="mb-4 flex justify-center">
            <button @click="currentSection = 'name'" :class="buttonClass(currentSection === 'name')"
              class="custom-button py-2 px-4 rounded-l">My Data</button>
            <button @click="currentSection = 'password'" :class="buttonClass(currentSection === 'password')"
              class="custom-button py-2 px-4 rounded-r">Change Password</button>
          </div>
          <form v-if="currentSection === 'name'" @submit.prevent="handleUpdateProfile">
            <div class="mb-4">
              <label for="name" class="block text-beige mb-1">Name</label>
              <input type="text" v-model="name" id="name"
                class="w-full mt-1 bg-transparent text-lightgreen border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-beige mb-1">Email</label>
              <input type="email" v-model="email" id="email"
                class="w-full mt-1 bg-transparent text-lightgreen border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <button type="submit"
              class="custom-update-button w-full py-2 rounded transition-transform transform hover:scale-105">Update Profile</button>
          </form>
          <form v-if="currentSection === 'password'" @submit.prevent="handleUpdatePassword">
            <div class="mb-4">
              <label for="password" class="block text-beige mb-1">Password</label>
              <input type="password" v-model="password" id="password"
                class="w-full mt-1 bg-transparent text-lightgreen border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <div class="mb-4">
              <label for="confirmPassword" class="block text-beige mb-1">Confirm Password</label>
              <input type="password" v-model="confirmPassword" id="confirmPassword"
                class="w-full mt-1 bg-transparent text-lightgreen border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <button type="submit"
              class="custom-update-button w-full py-2 rounded transition-transform transform hover:scale-105">Change Password</button>
          </form>
        </div>

        <!-- Sección para mostrar los posts compartidos -->
        <div v-if="!showSettings" class="shared-posts mt-4 overflow-auto flex-grow">
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
import { authState } from '../core/auth';
import SidebarComponent from '@/components/SidebarComponent.vue';
import type { Post } from '@/types/Post';
import { showErrorAlert, showSuccessAlert } from '@/utils/fireAlert';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { updateProfile, updatePassword } from '@/services/ProfileService';
import { fetchSharedPosts, togglePostLike } from '@/services/ProfileService';
import { useFileUpload } from '@/services/uploadService';
import { formatDate } from '@/utils/utils';

const currentSection = ref('name');
const showSettings = ref(false);
const name = ref(authState.user?.name || '');
const email = ref(authState.user?.email || '');
const password = ref('');
const confirmPassword = ref('');
const bio = ref(authState.user?.bio || '');
const defaultAvatar = '../assets/avatar.png';
const defaultBanner = '../assets/register_background.png';
const sharedPosts = ref<Post[]>([]);
const avatarInput = ref<HTMLInputElement | null>(null);
const bannerInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);

const { handleFileUpload } = useFileUpload(isLoading);

const buttonClass = (isActive: boolean) => isActive ? 'bg-gray-700 text-white' : 'bg-gray-500 text-gray-200';

const handleUpdateProfile = async () => {
  try {
    const updatedUser = await updateProfile(name.value, email.value, bio.value);
    authState.user = {
      ...authState.user,
      ...updatedUser
    };
    showSuccessAlert('Your profile has been updated successfully');
    setTimeout(() => {
      window.location.reload();
    }, 1100);
  } catch (err) {
    console.error('Error updating profile:', err);
    showErrorAlert('Failed to update profile');
  }
};

const handleUpdatePassword = async () => {
  if (password.value !== confirmPassword.value) {
    showErrorAlert('Passwords do not match');
    return;
  }
  try {
    await updatePassword(password.value);
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

const handleUploadAvatar = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  isLoading.value = true;
  try {
    await handleFileUpload(file, 'avatar');
  } catch (err) {
    console.error('Error uploading avatar:', err);
  } finally {
    isLoading.value = false;
  }
};

const handleUploadBanner = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  isLoading.value = true;
  try {
    await handleFileUpload(file, 'banner');
  } catch (err) {
    console.error('Error uploading banner:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    const posts = await fetchSharedPosts();
    sharedPosts.value = posts;
  } catch (err) {
    console.error('Error fetching shared posts:', err);
  }
});

const toggleLike = async (post: Post) => {
  try {
    await togglePostLike(post);
  } catch (err) {
    console.error('Error liking post:', err);
  }
};

const navigateToComments = (postId: number) => {
  // Lógica para navegar a los comentarios
};
</script>

<style scoped>
@import '@/assets/styles/ProfileView.css'
</style>
