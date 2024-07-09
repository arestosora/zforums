<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="sidebar-container">
      <SidebarComponent class="sidebar-component" />
    </div>
    
    <!-- Main Container -->
    <div class="flex flex-col lg:flex-row justify-center items-start w-full max-w-screen-lg mx-auto mt-4 lg:mt-0">
      <!-- Loading component -->
      <LoadingComponent :visible="isLoading" />

      <!-- Main Content -->
      <div class="main-content">
        <!-- Posts Wrapper -->
        <div class="posts-wrapper flex-3 flex flex-col overflow-y-auto pb-16">
          <!-- Create Post Container -->
          <div class="create-post-container">
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
                <input type="file" ref="fileInput" @change="onFileChange" class="hidden">
              </div>
              <img v-if="newPostImageUrl" :src="newPostImageUrl" alt="Selected Image" class="selected-image w-full rounded mb-4">
            </div>
            <div class="actions flex justify-end text-gray-500">
              <button @click="handleCreatePost" class="create-post-button hover:text-green-500">
                <i class="pi pi-plus mr-2"></i>Post
              </button>
            </div>
          </div>
          <div v-for="post in sortedPosts" :key="post.id" class="post ">
            <div class="header flex items-center mb-4">
              <img class="avatar w-10 h-10 rounded-full mr-4" :src="post.author!.avatar" alt="Avatar" />
              <div class="user-info flex-grow">
                <div class="flex items-center">
                  <span class="username font-bold">{{ post.author!.name }}</span>
                  <span class="timestamp ">@{{ post.author!.name }} · {{ formatDate(post.createdAt!) }}</span>
                </div>
              </div>
              <div v-if="authState.user?.id === post.author!.id" class="flex ml-auto">
                <button @click="editPost(post.id!)" class="edit-button ">
                  <i class="pi pi-pencil"></i>
                </button>
                <button @click="handleDeletePost(post.id!)" class="delete-button hover:text-red-500">
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
            <div class="content mb-4">
              <p>{{ post.content }}</p>
              <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" class="post-image w-full rounded">
            </div>
            <div class="actions flex justify-between text-gray-500">
              <button @click="handleToggleLike(post)" :class="{'text-green-500': post.liked, 'text-gray-500': !post.liked}" class="action-button hover:text-green-500">
                <i class="pi pi-thumbs-up mr-1"></i>Like <span class="ml-1">{{ post.likes }}</span>
              </button>
              <button @click="navigateToComments(post.id!)" class="action-button hover:text-green-500">
                <i class="pi pi-comments mr-1"></i>Comment <span class="ml-1">{{ post.comments!.length }}</span>
              </button>
              <button @click="handleSharePost(post.id!)" class="action-button hover:text-green-500">
                <i class="pi pi-share-alt mr-1"></i>Share
              </button>
            </div>
          </div>
          <!-- Extra space at the bottom -->
          <div class="bottom-gap"></div>
        </div>
      </div>
      <!-- News Component -->
      <NewsComponent class="news-component custom-news-width mx-auto mt-4 lg:mt-0 lg:ml-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authState } from '../core/auth';
import { formatDate } from '@/utils/utils';
import type { Post } from '../types/Post';
import SidebarComponent from '@/components/SidebarComponent.vue';
import NewsComponent from '@/components/NewsComponent.vue';
import { showErrorAlert, showSuccessAlert } from '@/utils/fireAlert';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { useFileUpload } from '@/services/uploadService';
import { getPosts, createPost, deletePost, toggleLike, sharePost } from '@/services/PostService';

const isLoading = ref(false);
const router = useRouter();
const posts = ref<Post[]>([]);
const newPostContent = ref('');
const { handleFileUpload, newPostImageUrl } = useFileUpload(isLoading);
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(async () => {
  isLoading.value = true;
  if (!authState.token) {
    showErrorAlert('Session Expired. Please log in again.');
    isLoading.value = false;
    return;
  }

  try {
    const data = await getPosts();
    posts.value = data.map(post => ({
      ...post,
      liked: false
    })).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    console.log('Data received:', data);
  } catch (err) {
    showErrorAlert('Error fetching posts. Please try again later.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});

const sortedPosts = computed(() => {
  return posts.value.slice().sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
});

const handleCreatePost = async () => {
  if (!newPostContent.value) return;

  isLoading.value = true;
  try {
    const newPost = await createPost(newPostContent.value, newPostImageUrl.value!);
    posts.value.unshift({
      ...newPost,
      liked: false
    });
    newPostContent.value = '';
    newPostImageUrl.value = '';
    setTimeout(() => {
      location.reload();
    }, 500);
  } catch (err) {
    showErrorAlert('Error creating post. Please try again later.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handleDeletePost = async (postId: number) => {
  isLoading.value = true;
  try {
    await deletePost(postId);
    posts.value = posts.value.filter(post => post.id !== postId);
    showSuccessAlert('Post deleted successfully');
  } catch (err) {
    showErrorAlert('Error deleting post. Please try again later.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handleToggleLike = async (post: Post) => {
  isLoading.value = true;
  try {
    await toggleLike(post.id!);
    post.liked = !post.liked;
    post.likes! += post.liked ? 1 : -1;
  } catch (err) {
    showErrorAlert('Error liking post. Please try again later.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    handleFileUpload(file);
  }
};

const navigateToComments = (postId: number) => {
  router.push({ name: 'postComments', params: { id: postId } });
};

const editPost = (id: number) => {
  showSuccessAlert('Upcoming feature!');
}
const handleSharePost = async (postId: number) => {
  isLoading.value = true;
  try {
    await sharePost(postId);
    showSuccessAlert('Post shared successfully');
  } catch (err) {
    showErrorAlert('You have shared this post already.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import '@/assets/styles/PostsView.css'
</style>