<template>
  <div class="flex h-screen w-full relative">
    <LoadingComponent :visible="isLoading" />
    <div :class="{ 'blur-sm': isLoading }" class="flex-1 flex items-center justify-center bg-gray-200 overflow-hidden">
      <img src="../assets/image.webp" alt="Imagen de la izquierda" class="w-full h-full object-cover" />
    </div>
    <div :class="{ 'blur-sm': isLoading }" class="flex-1 flex items-center justify-center">
      <form @submit.prevent="register" class="max-w-lg w-full p-12 text-green-500">
        <div class="mb-6">
          <div class="relative">
            <i class="pi pi-user absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl"></i>
            <input id="username" v-model="form.name" type="text" required placeholder="Username" class="input-field" />
          </div>
        </div>

        <div class="mb-6">
          <div class="relative">
            <i class="pi pi-envelope absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl"></i>
            <input id="email" v-model="form.email" type="email" required placeholder="Email" class="input-field" />
          </div>
        </div>
        <div class="mb-6">
          <div class="relative">
            <i class="pi pi-lock absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl"></i>
            <input id="password" v-model="form.password" type="password" required placeholder="Password" class="input-field" />
          </div>
        </div>
        <div class="mb-6">
          <div class="relative flex items-center">
            <input id="avatar" type="file" @change="onFileChange" class="absolute inset-0 opacity-0 cursor-pointer" />
            <i class="pi pi-image text-4xl cursor-pointer"></i>
            <span class="ml-2 text-lg">Upload Image</span>
            <img v-if="avatarFile" :src="avatarFile" alt="Profile Picture Preview" class="ml-4 w-16 h-16 object-cover rounded-full border-2" />
          </div>
        </div>
        <button type="submit" class="submit-button">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { registerUser } from '@/services/RegisterService';
import { useFileUpload } from '@/services/uploadService';
import { showErrorAlert } from '@/utils/fireAlert';

export default {
  name: 'RegisterForm',
  components: {
    LoadingComponent,
  },
  setup() {
    const form = ref({
      name: '',
      email: '',
      password: '',
      avatar: '',
    });

    const isLoading = ref(false);
    const router = useRouter();
    const { handleFileUpload, newPostImageUrl } = useFileUpload(isLoading);

    const onFileChange = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        await handleFileUpload(file);
        form.value.avatar = newPostImageUrl.value!;
      }
    };

    const register = async () => {
      isLoading.value = true;
      try {
        await registerUser(form.value);
        router.push('/');
      } catch (error) {
        console.error(error);
        showErrorAlert('There was an error trying to register!')
      } finally {
        setTimeout(() => {
          isLoading.value = false;
        }, 1500);
      }
    };

    return {
      form,
      onFileChange,
      register,
      avatarFile: newPostImageUrl,
      isLoading,
    };
  },
};
</script>

<style scoped>
@import '@/assets/styles/RegisterView.css'
</style>