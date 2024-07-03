import axios from 'axios';
import { authState } from '@/utils/auth';

const getPosts = async () => {
  const response = await axios.get('/posts', {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
  return response.data;
};

const createPost = async (content: string, imageUrl: string | null) => {
  const response = await axios.post('/posts', {
    title: 'New Post',
    content,
    imageUrl
  }, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
  return response.data;
};

const deletePost = async (postId: number) => {
  await axios.delete(`/posts/${postId}`, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
};

const toggleLike = async (postId: number) => {
  await axios.patch(`/posts/${postId}/like`, {}, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
};

const sharePost = async (postId: number) => {
  await axios.post(`/posts/${postId}/share`, {}, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
};

export {
  getPosts,
  createPost,
  deletePost,
  toggleLike,
  sharePost
};