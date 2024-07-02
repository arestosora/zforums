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
import axios from 'axios';
import { format } from 'date-fns';
import { authState } from '../utils/auth';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { showSuccessAlert, showErrorAlert } from '@/utils/fireAlert';
const route = useRoute();

const post = ref();
const newComment = ref('');

const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
};

const submitComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    const response = await axios.post('/comments', {
      postId: post.value.id,
      content: newComment.value
    }, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });

    post.value.comments.push(response.data);
    showSuccessAlert('Comment submitted successfully!');
    newComment.value = '';
    window.location.reload();
  } catch (err) {
    showErrorAlert('Error submitting comment, please try again later.');
    console.error(err);
  }
};

const sortedComments = computed(() => {
  return post.value?.comments.slice().sort((a: { createdAt: string }, b: { createdAt: string }) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
});

onMounted(async () => {
  if (!authState.token) {
    showErrorAlert('Your session has expired. You need to be logged in to view this page.');
    return;
  }

  const postId = route.params.id;
  try {
    const response = await axios.get(`/posts/${postId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authState.token}`
      }
    });
    post.value = response.data;
  } catch (err) {
    showErrorAlert('Error fetching post, please try again later.');
    console.error(err);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.container {
  display: flex;
}

.sidebar {
  width: 25%;
}

.post-comments-container {
  width: 50%;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  padding-bottom: 4rem;
}

.post {
  margin-bottom: 20px;
}

.header .avatar {
  border-radius: 50%;
}

.header .user-info {
  display: flex;
  align-items: center;
}

.header .username {
  font-weight: bold;
}

.header .timestamp {
  margin-left: 10px;
  color: gray;
}

.content {
  margin-top: 10px;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.comment {
  margin-top: 10px;
  margin-bottom: 10px;
}

.comment .header .avatar {
  border-radius: 50%;
}

.comment .header .user-info {
  display: flex;
  align-items: center;
}

.comment .username {
  font-weight: bold;
}

.comment .timestamp {
  color: gray;
  font-size: 0.9em;
  margin-left: 10px;
}

.add-comment {
  padding: 0.5rem;
}

.add-comment .submit-button {
  cursor: pointer;
  background-color: transparent;
  color: #90ee90;
  border: 1px solid #90ee90;
  transition: transform 0.2s;
}

.add-comment .submit-button:hover {
  transform: scale(1.1);
}

textarea {
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
}

textarea::placeholder {
  color: gray;
}
</style>