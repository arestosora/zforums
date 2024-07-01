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
          <img :src="authState.user?.avatar || defaultAvatar" alt="User Avatar" class="avatar mb-4"/>
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
      </div>
    </main>
    <footer class="w-full">
      <FooterComponent />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { authState } from '../auth';
import FooterComponent from './FooterComponent.vue';

const currentSection = ref('name');
const showSettings = ref(false);
const name = ref(authState.user?.name || '');
const email = ref(authState.user?.email || '');
const password = ref('');
const confirmPassword = ref('');

const defaultAvatar = 'path_to_default_avatar_image';

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

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -150px;
}

.banner-container {
  width: 100%;
  max-width: 800px;
  height: 300px;
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
</style>
