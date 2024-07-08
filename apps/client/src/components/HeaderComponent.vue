<template>
    <header class="bg-dark-gray shadow-md">
        <div class="container mx-auto px-6 py-2 flex justify-between items-center">
            <div>
            </div>
            <div class="text-white text-center flex-grow">
                <span v-if="!authState.isAuthenticated">
                    if you need to sign up,
                    <router-link to="/register" class="text-light-green hover:underline">click here</router-link>,
                    or if you want to sign in,
                    <router-link to="/login" class="text-light-green hover:underline">click here.</router-link>
                </span>
            </div>
            <div v-if="authState.isAuthenticated">
                <button @click="handleLogout" class="text-light-green hover:underline">log out</button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { authState, logout } from '../core/auth';

const router = useRouter();

const handleLogout = async () => {
    logout();
    router.push('/');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

* {
    font-family: 'Poppins', sans-serif;
}

.text-light-green {
    color: #90ee90;
}

.bg-dark-gray {
    background-color: #0f0f0f;
}

.pi-globe {
    font-size: 1.5rem;
}
</style>
