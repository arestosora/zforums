<template>
    <div class="flex flex-col min-h-screen bg-black text-white">
      <main class="flex-grow p-6 flex justify-center items-start">
        <div class="mt-10 p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-3xl font-semibold text-center mb-6">Register</h2>
          <form @submit.prevent="register">
            <div class="mb-5">
              <label for="username" class="block text-beige mb-1">Username</label>
              <InputText v-model="username" id="username" class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <div class="mb-5">
              <label for="email" class="block text-beige mb-1">Email</label>
              <InputText v-model="email" id="email" type="email" class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <div class="mb-5">
              <label for="password" class="block text-beige mb-1">Password</label>
              <Password v-model="password" id="password" toggleMask class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <div class="mb-5">
              <label for="confirmPassword" class="block text-beige mb-1">Confirm Password</label>
              <Password v-model="confirmPassword" id="confirmPassword" toggleMask class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
            </div>
            <Button label="Register" type="submit" class="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-600 transition-colors" />
          </form>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const register = () => {
    console.log('Username:', username.value);
    console.log('Email:', email.value);
    console.log('Password:', password.value);
    console.log('Confirm Password:', confirmPassword.value);
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
  
  .bg-black {
    background-color: #000;
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
  
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  </style>
  