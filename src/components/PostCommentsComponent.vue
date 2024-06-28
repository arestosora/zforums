<!-- src/components/PostComments.vue -->
<template>
  <div class="post-comments">
    <div v-if="post">
      <div class="post bg-black text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg">
        <div class="header flex items-center mb-4">
          <img class="avatar w-10 h-10 rounded-full mr-4" :src="post.author.avatar" alt="Avatar" />
          <div class="user-info flex-grow">
            <div class="flex items-center">
              <span class="username font-bold">{{ post.author.name }}</span>
              <span class="timestamp text-gray-500 text-sm ml-2">@{{ post.author.name }} · {{ formatDate(post.createdAt)
                }}</span>
            </div>
          </div>
        </div>
        <div class="content mb-4">
          <p>{{ post.content }}</p>
          <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" class="post-image w-full rounded">
        </div>
      </div>

      <div class="comments">
        <h3 class="text-white mb-4">Comments</h3>
        <div v-for="comment in post.comments" :key="comment.id"
          class="comment bg-gray-800 text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg">
          <p>{{ comment.content }}</p>
          <span class="timestamp text-gray-500 text-sm">{{ formatDate(comment.createdAt) }}</span>
        </div>
      </div>
      <div class="add-comment bg-black text-white border border-gray-300 rounded-lg p-4 shadow-lg">
        <textarea v-model="newComment" class="w-full p-2 bg-black border rounded mb-4" rows="3"
          placeholder="Write a comment..."></textarea>
        <div class="actions flex justify-end">
          <button @click="submitComment"
            class="submit-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Submit
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { format } from 'date-fns';
import { useToast } from 'primevue/usetoast';
import { authState } from '../auth';


const route = useRoute();
const toast = useToast();
const post = ref(null);
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
    newComment.value = '';
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error submitting comment', detail: 'Please try again later.' });
    console.error(err);
  }
};

onMounted(async () => {
  if (!authState.token) {
    toast.add({ severity: 'error', summary: 'Session Expired', detail: 'Please log in again.' });
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
    toast.add({ severity: 'error', summary: 'Error fetching post', detail: 'Please try again later.' });
    console.error(err);
  }
});
</script>

<style scoped>
.post-comments {
  font-family: 'Arial', sans-serif;
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

.action-button {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.action-button i {
  margin-right: 5px;
}

.comments .comment {
  margin-top: 10px;
  margin-bottom: 10px;
}

.comments .comment .timestamp {
  display: block;
  color: gray;
  font-size: 0.9em;
  margin-top: 5px;
}

.add-comment .submit-button {
  cursor: pointer;
}
</style>