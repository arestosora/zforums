<template>
  <div class="container mx-auto flex">
    <!-- Sidebar Section -->
    <div class="sidebar w-1/4 p-4">
      <SidebarComponent />
    </div>

    <!-- Main Content Section -->
    <div class="post-comments-container w-2/4 p-4 overflow-y-auto">
      <div v-if="post">
        <!-- Post Section -->
        <div class="post bg-black text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg">
          <div class="header flex items-center mb-4">
            <img class="avatar w-10 h-10 rounded-full mr-4" :src="post.author.avatar" alt="Avatar" />
            <div class="user-info">
              <div class="flex items-center">
                <span class="username font-bold">{{ post.author.name }}</span>
                <span class="timestamp text-gray-500 text-sm ml-2">@{{ post.author.username }} · {{
                  formatDate(post.createdAt) }}</span>
              </div>
            </div>
          </div>
          <div class="content mb-4">
            <p>{{ post.content }}</p>
            <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" class="post-image w-full rounded mt-2">
          </div>
        </div>

        <!-- Comments Section -->
        <div class="comments">
          <div v-for="comment in sortedComments" :key="comment.id"
            class="comment bg-transparent text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg">
            <div class="header flex items-center mb-2">
              <img class="avatar w-8 h-8 rounded-full mr-3" :src="comment.author.avatar" alt="Avatar" />
              <div class="user-info">
                <span class="username font-bold">{{ comment.author.name }}</span>
                <span class="timestamp text-gray-500 text-sm ml-2">{{ formatDate(comment.createdAt) }}</span>
              </div>
            </div>
            <p>{{ comment.content }}</p>
          </div>
        </div>

        <!-- Add Comment Section -->
        <div class="add-comment bg-black text-white rounded-lg p-2 shadow-lg">
          <textarea v-model="newComment" class="w-full p-2 bg-black mb-2 placeholder-gray-500 text-white" rows="3"
            placeholder="Write a comment..."></textarea>
          <div class="actions flex justify-end">
            <button @click="submitComment"
              class="submit-button text-light-green border border-gray-700 px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { fetchPost, submitComment as postComment } from '@/services/PostCommentService';
import { format } from 'date-fns';
import { showErrorAlert } from '@/utils/fireAlert';

const route = useRoute();

const post = ref();
const newComment = ref('');

const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
};

const submitComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    const comment = await postComment(post.value.id, newComment.value);
    post.value.comments.push(comment);
    newComment.value = '';
  } catch (err) {
    // Error handling already done in postComment
  } finally {
    window.location.reload();
  }
};

const sortedComments = computed(() => {
  return post.value?.comments.slice().sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
});

onMounted(async () => {
  const postId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  try {
    post.value = await fetchPost(postId);
  } catch (err) {
    showErrorAlert('There was an error trying to post the comment.')
    console.error(err)
  }
});
</script>

<style scoped>
@import '@/assets/styles/PostCommentView.css'
</style>