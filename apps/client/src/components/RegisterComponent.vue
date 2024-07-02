<template>
  <div class="flex h-screen w-full relative">
    <div :class="{ 'blur-sm': isLoading }" class="flex-1 flex items-center justify-center bg-gray-200 overflow-hidden">
      <img src="../assets/image.webp" alt="Imagen de la izquierda" class="w-full h-full object-cover" />
    </div>
    <div :class="{ 'blur-sm': isLoading }" class="flex-1 flex items-center justify-center">
      <form @submit.prevent="register" class="max-w-lg w-full p-12">
        <div class="mb-6">
          <label for="username" class="block mb-3 text-lg font-semibold">Username</label>
          <div class="relative">
            <i class="pi pi-user absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl text-gray-400"></i>
            <input id="username" v-model="form.name" type="text" required class="w-full py-3 pl-12 pr-4 text-lg border border-gray-300 rounded-md box-border bg-transparent text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 zoom-in" />
          </div>
        </div>

        <div class="mb-6">
          <label for="email" class="block mb-3 text-lg font-semibold">Email</label>
          <div class="relative">
            <i class="pi pi-envelope absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl text-gray-400"></i>
            <input id="email" v-model="form.email" type="email" required class="w-full py-3 pl-12 pr-4 text-lg border border-gray-300 rounded-md box-border bg-transparent text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 zoom-in" />
          </div>
        </div>

        <div class="mb-6">
          <label for="password" class="block mb-3 text-lg font-semibold">Password</label>
          <div class="relative">
            <i class="pi pi-lock absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl text-gray-400"></i>
            <input id="password" v-model="form.password" type="password" required class="w-full py-3 pl-12 pr-4 text-lg border border-gray-300 rounded-md box-border bg-transparent text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 zoom-in" />
          </div>
        </div>

        <div class="mb-6">
          <label for="avatar" class="block mb-3 text-lg font-semibold">Profile Picture</label>
          <div class="relative">
            <input id="avatar" type="file" @change="handleFileUpload" class="absolute inset-0 opacity-0 cursor-pointer" />
            <i class="pi pi-image mr-2 text-green-300 text-4xl cursor-pointer"></i>
          </div>
          <img v-if="avatarFile" :src="avatarFile" alt="Profile Picture Preview" class="mt-4 w-32 h-32 object-cover rounded border border-gray-300" />
        </div>

        <button type="submit" class="w-full py-3 text-lg bg-transparent text-green-400 border-2 border-green-400 rounded-md cursor-pointer font-semibold transition-transform duration-300 hover:scale-105">
          Register
        </button>
        <FooterComponent />
      </form>
    </div>
    <LoadingScreen v-if="isLoading" />
  </div>
</template>


<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import LoadingScreen from './LoadingScreenComponent.vue';
import type { RegisterForm } from '@/interfaces/registerForm';
import FooterComponent from './FooterComponent.vue';

export default {
  name: 'RegisterForm',
  components: {
    LoadingScreen,
  },
  setup() {
    const form = ref<RegisterForm>({
      name: '',
      email: '',
      password: '',
      avatar: '',
    });

    const isLoading = ref(false);
    const router = useRouter();
    const avatarFile = ref<string | null>(null);

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

        avatarFile.value = response.data.secure_url;
        form.value.avatar = avatarFile.value!;
      } catch (err) {
        console.error(err);
      }
    };

    const register = async () => {
      isLoading.value = true;
      try {
        const response = await axios.post('/auth/register', { ...form.value });
        console.log(response.data);
        router.push('/');
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          isLoading.value = false;
        }, 3000);
      }
    };

    return {
      form,
      handleFileUpload,
      register,
      avatarFile,
      isLoading,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

html,
body {
  font-family: 'Poppins', sans-serif;
}

input:focus,
button:focus {
  outline: none;
}

input::placeholder {
  color: lightgray;
}

.blur-sm {
  filter: blur(5px);
}
</style>
