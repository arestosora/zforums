import axios from 'axios';
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import { authState } from '../utils/auth';
import { showErrorAlert, showSuccessAlert } from '@/utils/fireAlert';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import type { Post } from '../types/Post';

const isLoading = ref(false);
const posts = ref<Post[]>([]);
const newPostContent = ref('');
const newPostImageUrl = ref('');
const fileInput = ref<HTMLInputElement | null>(null);
const router = useRouter();

const fetchPosts = async () => {
  isLoading.value = true;
  if (!authState.token) {
    showErrorAlert('Session Expired. Please log in again.');
    isLoading.value = false;
    return;
  }

  try {
    const response = await axios.get('/posts', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authState.token}`
      }
    });
    posts.value = response.data.map((post: Post) => ({
      ...post,
      liked: false
    })).sort((a: Post, b: Post) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    console.log('Data received:', response.data);
  } catch (err) {
    showErrorAlert('Error fetching posts. Please try again later.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const sortedPosts = computed(() => {
  return posts.value.slice().sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
});

const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
};

const createPost = async () => {
  if (!newPostContent.value) return;

  isLoading.value = true;
  try {
    const response = await axios.post('/posts', {
      title: 'New Post',
      content: newPostContent.value,
      imageUrl: newPostImageUrl.value
    }, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });

    posts.value.unshift({
      ...response.data,
      liked: false
    });
    newPostContent.value = '';
    newPostImageUrl.value = '';
    setTimeout(() => {
      location.reload();
    }, 500);
  } catch (err) {
    showErrorAlert('Error creating post. Please try again later.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const deletePost = async (postId: number) => {
  isLoading.value = true;
  try {
    await axios.delete(`/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });
    posts.value = posts.value.filter(post => post.id !== postId);
    showSuccessAlert('Post deleted successfully');
  } catch (err) {
    showErrorAlert('Error deleting post. Please try again later.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const editPost = (postId: number) => {
  Swal.fire({
    icon: 'info',
    title: 'Edit Post',
    text: 'Feature coming soon!',
    showConfirmButton: false,
    timer: 1000,
    customClass: {
      popup: 'swal2-popup',
      title: 'swal2-title'
    }
  });
};

const toggleLike = async (post: Post) => {
  isLoading.value = true;
  try {
    await axios.patch(`/posts/${post.id}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });

    post.liked = !post.liked;
    post.likes! += post.liked ? 1 : -1;
  } catch (err) {
    showErrorAlert('Error liking post. Please try again later.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  isLoading.value = true;
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

    newPostImageUrl.value = response.data.secure_url;
  } catch (err) {
    showErrorAlert('Error uploading image. Please try again later.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const navigateToComments = (postId: number) => {
  router.push({ name: 'postComments', params: { id: postId } });
};

const sharePost = async (postId: number) => {
  isLoading.value = true;
  try {
    await axios.post(`/posts/${postId}/share`, {}, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });

    showSuccessAlert('Post shared successfully');
  } catch (err) {
    showErrorAlert('You have shared this post already.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

export {
  isLoading,
  posts,
  newPostContent,
  newPostImageUrl,
  fileInput,
  fetchPosts,
  sortedPosts,
  formatDate,
  createPost,
  deletePost,
  editPost,
  toggleLike,
  triggerFileInput,
  handleFileUpload,
  navigateToComments,
  sharePost
};