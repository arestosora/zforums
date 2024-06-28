<template>
  <div class="register-form">
    <form @submit.prevent="register">
      <div class="form-field">
        <label for="username">Username</label>
        <input id="username" v-model="form.name" type="text" required />
      </div>

      <div class="form-field">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="form-field">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" required />
      </div>

      <div class="form-field">
        <label for="avatar">Profile Picture</label>
        <input id="avatar" type="file" @change="handleFileUpload" />
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import type { RegisterForm } from '@/interfaces/registerForm';
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const form = ref<RegisterForm>({
      name: '',
      email: '',
      password: '',
      avatar:'',
    });

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
      try {
        const response = await axios.post('/auth/register', { ...form.value });
        console.log(response.data);
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      form,
      handleFileUpload,
      register,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.register-form {
  font-family: 'Poppins', sans-serif;
  max-width: 500px;
  margin: auto;
  margin-top: 5%;
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
</style>
