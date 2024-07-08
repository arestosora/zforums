import axios from 'axios';
import { authState } from '@/core/auth';
import { showSuccessAlert, showErrorAlert } from '@/utils/fireAlert';

export const fetchPost = async (postId: string) => {
  try {
    const response = await axios.get(`/posts/${postId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authState.token}`
      }
    });
    return response.data;
  } catch (err) {
    showErrorAlert('Error fetching post, please try again later.');
    console.error(err);
    throw err;
  }
};

export const submitComment = async (postId: string, content: string) => {
  try {
    const response = await axios.post('/comments', {
      postId,
      content
    }, {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });

    showSuccessAlert('Comment submitted successfully!');
    return response.data;
  } catch (err) {
    showErrorAlert('Error submitting comment, please try again later.');
    console.error(err);
    throw err;
  }
};
