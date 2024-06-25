<template>
  <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="login-form mt-10 p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-field mb-5">
          <label for="email" class="block text-beige mb-1">Email</label>
          <InputText v-model="email" id="email" type="email" class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
        </div>
        <div class="form-field mb-5">
          <label for="password" class="block text-beige mb-1">Password</label>
          <InputText v-model="password" id="password" type="password" class="w-full mt-1 bg-black text-white border border-gray-600 rounded focus:border-gray-400 focus:ring-2 focus:ring-gray-500" />
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" @click="closeModal" class="btn-cancel w-full">Cancel</button>
          <button type="submit" class="btn-login w-full">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import { login } from '../auth';

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
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  login({ email: email.value });
  closeModal();
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

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

.login-form {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #202020;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
}

.form-field {
  margin-bottom: 1rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-field input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  color: black;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #323436;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

button:hover {
  background-color: #18191a;
}

.btn-cancel {
  background-color: #a3a3a3;
  font-weight: 600;
}

.btn-login {
  background-color: #4a4a4a;
  font-weight: 600;
}
</style>
