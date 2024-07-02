<template>
  <div class="flex h-screen w-full">
    <div :class="{ 'blur-sm': isLoading }" class="flex-1 flex items-center justify-center bg-gray-200 overflow-hidden">
      <img src="../assets/image.webp" alt="Imagen de la izquierda" class="w-full h-full object-cover" />
    </div>
    <div :class="{ 'blur-sm': isLoading }" class="flex-1 flex items-center justify-center">
      <form @submit.prevent="handleLogin" class="max-w-lg w-full p-12 text-green-500">
        <div class="mb-6">
          <div class="relative">
            <i class="pi pi-envelope absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl"></i>
            <input id="email" v-model="form.email" type="email" required placeholder="Email" class="w-full py-3 pl-12 pr-4 text-lg border border-gray-300 rounded-md box-border bg-transparent focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
        </div>
        <div class="mb-6">
          <div class="relative">
            <i class="pi pi-lock absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl"></i>
            <input id="password" v-model="form.password" type="password" required placeholder="Password" class="w-full py-3 pl-12 pr-4 text-lg border border-gray-300 rounded-md box-border bg-transparent focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
        </div>
        <button type="submit" class="w-full py-3 text-lg bg-transparent border-2 rounded-md cursor-pointer font-semibold transition-transform duration-300 hover:scale-105">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/utils/auth';

export default {
  name: 'LoginForm',

  setup() {
    const form = ref({
      email: '',
      password: '',
    });

    const isLoading = ref(false);
    const router = useRouter();

    const handleLogin = async () => {
      isLoading.value = true;
      try {
        await login({ email: form.value.email, password: form.value.password });
        router.push('/');
      } catch (error) {
        console.error('Error during login:', error);
      } finally {
        setTimeout(() => {
          isLoading.value = false;
        }, 3000);
      }
    };

    return {
      form,
      handleLogin,
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
  color: rgba(128, 128, 128, 0.6);
  font-style: italic;
}

.blur-sm {
  filter: blur(5px);
}
</style>
