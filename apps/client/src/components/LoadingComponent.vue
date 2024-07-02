<template>
    <div class="loading-overlay" v-if="visible">
      <div class="loading-spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps<{ visible: boolean }>();
  
  const visible = ref(props.visible);
  watch(() => props.visible, (newVal) => {
    visible.value = newVal;
  });
  </script>
  
  <style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
  }
  
  .loading-spinner {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100px;
    height: 100px;
  }
  
  .bounce1, .bounce2, .bounce3 {
    width: 25px;
    height: 25px;
    background-color: #47db34;
    border-radius: 50%;
    animation: bounce 1.5s infinite ease-in-out;
  }
  
  .bounce2 {
    animation-delay: -0.3s;
  }
  
  .bounce3 {
    animation-delay: -0.6s;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: scale(0);
      opacity: 0.6;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
  </style>
  