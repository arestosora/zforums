<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-black text-white p-8 rounded-lg shadow-lg w-96 border border-green-500">
            <h2 class="text-xl font-bold mb-4">Create New Post</h2>
            <textarea v-model="content" class="w-full p-2 bg-gray-800 text-white border rounded mb-4" rows="4"
                placeholder="What's on your mind?"></textarea>
            <div class="flex justify-end">
                <button @click="closeModal"
                    class="mr-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Cancel</button>
                <button @click="createPost"
                    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">Post</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { authState } from '@/auth';
import axios from 'axios';
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(['close', 'postCreated']);

const content = ref('');

const closeModal = () => {
    emits('close');
};

const createPost = async () => {
    await axios.post('/posts', content.value, {
        headers: {
            Authorization: `Bearer ${authState.token}`
        }
    });

    emits('postCreated', content.value);
    closeModal();
};
</script>

<style scoped>
.fixed {
    position: fixed;
}

.inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.bg-opacity-50 {
    background-opacity: 0.5;
}
</style>