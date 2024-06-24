<template>
    <div class="flex flex-col min-h-screen bg-black text-white">
      <main class="flex-grow p-6 flex justify-center items-start">
        <div class="mt-10 p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-3xl font-semibold text-center mb-6">My Profile</h2>
          <div class="mb-6">
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
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  import { authState } from '../auth'; // Importar el estado de autenticación
  
  const currentSection = ref('Name');
  
  const name = ref(authState.user?.email || '');
  const email = ref(authState.user?.email || '');
  const password = ref('');
  const confirmPassword = ref('');
  
  const buttonClass = (isActive: boolean) => isActive ? 'bg-gray-700 text-white' : 'bg-gray-500 text-gray-200';
  
  const updatenameAndEmail = () => {
    // Aquí puedes manejar el proceso de actualización del nombre de usuario y correo electrónico
    console.log('Name:', name.value);
    console.log('Email:', email.value);
  
    // Actualizar el estado de autenticación con los nuevos datos del usuario
    authState.user = {
      email: email.value
    };
  
    // Guardar el estado de autenticación actualizado en localStorage
    localStorage.setItem('authState', JSON.stringify(authState));
  
    alert("Profile updated successfully");
  };
  
  const updatePassword = () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match");
      return;
    }
  
    // Aquí puedes manejar el proceso de actualización de la contraseña
    console.log('Password:', password.value);
  
    alert("Password updated successfully");
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
  