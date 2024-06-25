<template>
    <div class="container">
        <div class="post" v-if="post">
            <div class="header">
                <img class="avatar" :src="post.avatar" alt="Avatar" />
                <div class="user-info">
                    <span class="username">{{ post.name }}</span>
                    <span class="timestamp">{{ post.createdAt }}</span>
                </div>
            </div>
            <div class="content">
                <p>{{ post.content }}</p>
            </div>
            <div class="actions">
                <button class="like-button">Like</button>
                <button class="comment-button">Comment</button>
                <button class="share-button">Share</button>
            </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Props {
    avatar: string
    name: string
    content: string
}

const posts = ref<Post | null>(null)

onMounted(async () => {
    try {
        const response = await axios.get('/posts',{headers:{'Accept':'application/json', 'Authorization':'Bearer token'}})  .then(response => {
    posts.value = response.data;
    console.log('Datos recibidos:', response.data);
    
  })
  .catch(error => {
    if (error.response) {
      console.error('Error en la respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Encabezados:', error.response.headers);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error en la configuración de la solicitud:', error.message);
    }
    console.error('Configuración completa del error:', error.config);
  });

        
    } catch (error) {
        console.error('Error fetching the post:', error)
    }
})

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #000000;
    padding: 20px;
}

.post {
    background-color: #000000;
    color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.username {
    font-weight: bold;
}

.timestamp {
    color: #777;
    font-size: 0.9em;
}

.content {
    margin-bottom: 10px;
}

.actions {
    display: flex;
    justify-content: space-around;
}

.actions button {
    background: none;
    border: none;
    color: #365899;
    cursor: pointer;
    font-size: 1em;
    padding: 10px;
    border-radius: 5px;
}

.actions button:hover {
    background-color: #f0f2f5;
}
</style>