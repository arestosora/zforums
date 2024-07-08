import axios from 'axios';
import { showSuccessAlert, showErrorAlert } from '@/utils/fireAlert';

export const registerUser = async (form: { name: string; email: string; password: string; avatar: string }) => {
  try {
    const response = await axios.post('/auth/register', form);
    console.log(response.data);
    showSuccessAlert('You have registered successfully!');
    return response.data;
  } catch (error) {
    showErrorAlert('Error registering, please try again later.');
    console.error(error);
    throw error;
  }
};