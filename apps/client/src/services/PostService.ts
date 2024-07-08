import axios from 'axios';
import { authState } from '@/core/auth';
import type { Post } from '@/types/Post';

const API_URL = '/posts';

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
  return response.data;
};

export const createPost = async (content: string, imageUrl: string): Promise<Post> => {
  const response = await axios.post(API_URL, {
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

export const deletePost = async (postId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${postId}`, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
};

export const toggleLike = async (postId: number): Promise<void> => {
  await axios.patch(`${API_URL}/${postId}/like`, {}, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
};

export const sharePost = async (postId: number): Promise<void> => {
  await axios.post(`${API_URL}/${postId}/share`, {}, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
};