<template>
  <div class="flex flex-col min-h-screen bg-transparent text-white">
    <main class="flex-grow p-6 flex justify-center items-start overflow-auto">
      <div class="relative mt-0 p-8 bg-transparent rounded-lg shadow-lg w-full max-w-2xl border border-light-green">
        <div class="banner-container">
          <img src="../assets/register_background.png" alt="Banner Image" class="banner-image"/>
        </div>
        <div class="absolute top-2 right-2">
          <Button icon="pi pi-cog" class="p-button-rounded p-button-secondary" @click="showSettings = !showSettings" />
        </div>
        <div class="flex flex-col items-center mt-12">
          <img :src="authState.user?.avatar || defaultAvatar" alt="User Avatar" class="profile-avatar mb-4"/>
          <p class="bio">{{ authState.user?.bio || 'This is a user bio.' }}</p>
        </div>
        <div v-if="showSettings" class="mt-6">
          <div class="mb-6 flex justify-center">
            <button @click="currentSection = 'name'" :class="buttonClass(currentSection === 'name')" class="py-2 px-4 rounded-l">My Data</button>
            <button @click="currentSection = 'password'" :class="buttonClass(currentSection === 'password')" class="py-2 px-4 rounded-r">Change Password</button>
          </div>
          <form v-if="currentSection === 'name'" @submit.prevent="updatenameAndEmail">
            <div class="mb-5">
              <label for="name" class="block text-beige mb-1">Name</label>
              <InputText v-model="name" id="name" class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <div class="mb-5">
              <label for="email" class="block text-beige mb-1">Email</label>
              <InputText v-model="email" id="email" type="email" class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <Button label="Update Profile" type="submit" class="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-600 transition-colors" />
          </form>
          <form v-if="currentSection === 'password'" @submit.prevent="updatePassword">
            <div class="mb-5">
              <label for="password" class="block text-beige mb-1">Password</label>
              <Password v-model="password" id="password" toggleMask class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <div class="mb-5">
              <label for="confirmPassword" class="block text-beige mb-1">Confirm Password</label>
              <Password v-model="confirmPassword" id="confirmPassword" toggleMask class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <Button label="Change Password" type="submit" class="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-600 transition-colors" />
          </form>
        </div>

        <!-- Sección para mostrar los posts compartidos -->
        <div class="shared-posts mt-6 overflow-auto max-h-96">
          <h2 class="text-center mb-4 text-lg font-bold">Shared Posts</h2>
          <div v-if="sharedPosts.length === 0" class="text-center text-gray-500">No shared posts yet.</div>
          <div v-for="post in sharedPosts" :key="post.id" class="post bg-black text-white border border-gray-700 rounded-lg p-4 mb-4 shadow-lg transition-transform transform hover:scale-105">
            <div class="header flex items-center mb-4">
              <img class="post-avatar w-8 h-8 rounded-full mr-4" :src="post.author.avatar" alt="Avatar" />
              <div class="user-info flex-grow">
                <div class="flex items-center">
                  <span class="username font-bold">{{ post.author.name }}</span>
                  <span class="timestamp text-gray-500 text-sm ml-2">@{{ post.author.name }} · {{ formatDate(post.createdAt) }}</span>
                </div>
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
    <footer class="w-full">
      <FooterComponent />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { authState } from '../auth';
import FooterComponent from './FooterComponent.vue';
import { format } from 'date-fns';

const currentSection = ref('name');
const showSettings = ref(false);
const name = ref(authState.user?.name || '');
const email = ref(authState.user?.email || '');
const password = ref('');
const confirmPassword = ref('');

const defaultAvatar = 'path_to_default_avatar_image';
const sharedPosts = ref([]);

const buttonClass = (isActive: boolean) => isActive ? 'bg-gray-700 text-white' : 'bg-gray-500 text-gray-200';

const updatenameAndEmail = () => {
  console.log('Name:', name.value);
  console.log('Email:', email.value);
  authState.user = {
    ...authState.user,
    name: name.value,
    email: email.value
  };
  localStorage.setItem('authState', JSON.stringify(authState));

  alert("Profile updated successfully");
};

const updatePassword = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }
  console.log('Password:', password.value);

  alert("Password updated successfully");
};

// Función para formatear la fecha
const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
};

// Cargar posts compartidos por el usuario
onMounted(async () => {
  try {
    const response = await axios.get(`/posts/shared-by-user/${authState.user?.id}`, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });
    sharedPosts.value = response.data;
  } catch (err) {
    console.error('Error fetching shared posts:', err);
  }
});

const toggleLike = async (post) => {
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

const navigateToComments = (postId) => {
  // Navega a la sección de comentarios para el post especificado
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
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
}

.banner-container {
  width: 100%;
  max-width: 800px;
  height: 200px; /* Reducir la altura del banner a la mitad */
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

.shared-posts {
  max-height: 400px;
  overflow-y: auto;
}
</style>
