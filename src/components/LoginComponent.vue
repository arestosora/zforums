<template>

    <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="mt-10 p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="mb-5">
              <label for="email" class="block text-beige mb-1">Email</label>
              <InputText v-model="email" id="email" type="email" class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <div class="mb-5">
              <label for="password" class="block text-beige mb-1">Password</label>
              <Input type="password" v-model="password" id="password" class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-600 transition-colors">Cancel</button>
            <button type="submit" class="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-600 transition-colors">Login</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';
  
  interface Props {
    isOpen: boolean;
  }
  
  const props = defineProps<Props>();
  const emit = defineEmits(['close']);
  
  const email = ref('');
  const password = ref('');
  
  const closeModal = () => {
    emit('close');
  };
  
  const handleLogin = () => {
    // Aquí puedes manejar el proceso de login
    console.log('Email:', email.value);
    console.log('Password:', password.value);
    closeModal();
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
    
  .bg-gray-800 {
    background-color: #2d2d2d;
  }
  
  .border-gray-600 {
    border-color: #4a4a4a;
  }
  
  .focus\:border-gray-400:focus {
    border-color: #a3a3a3;
  }
  
  .focus\:ring-gray-500:focus {
    --tw-ring-color: #6b6b6b;
  }
</style>