import axios from 'axios';
import { authState } from '@/core/auth';
import type { Post } from '@/types/Post';

export const updateProfile = async (name: string, email: string, bio: string) => {
  const response = await axios.put('/auth/update-profile', {
    name,
    email,
    bio,
    avatar: authState.user?.avatar,
    banner: authState.user?.banner
  }, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
  return response.data;
};

export const updatePassword = async (password: string) => {
  await axios.put('/auth/update-profile', {
    password
  }, {
    headers: {
      'Authorization': `Bearer ${authState.token}`
    }
  });
};

export const fetchSharedPosts = async (): Promise<Post[]> => {
    const response = await axios.get(`/posts/shared-by-user/${authState.user?.id}`, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });
    return response.data.sort((a: Post, b: Post) => new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime());
  };
  
  export const togglePostLike = async (post: Post): Promise<void> => {
    await axios.patch(`/posts/${post.id}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });
  
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  };