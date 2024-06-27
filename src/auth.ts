import axios from 'axios';
import { reactive } from 'vue';

const savedAuthState = localStorage.getItem('authState');
const initialState = savedAuthState ? JSON.parse(savedAuthState) : { isAuthenticated: false, user: null, token: null };

export const authState = reactive({
  isAuthenticated: initialState.isAuthenticated,
  user: initialState.user,
  token: initialState.token,
});

export const saveAuthState = () => {
  localStorage.setItem('authState', JSON.stringify(authState));
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', credentials);
    console.log('Login response:', response.data);
    if (response.data.token) {
      const userDetails = response.data;

      authState.isAuthenticated = true;
      authState.user = {
        email: credentials.email,
        name: userDetails.name,
        avatar: userDetails.avatar,
        handle: userDetails.handle
      };
      authState.token = response.data.token;
      saveAuthState();
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.error('Login error:', error);
    authState.isAuthenticated = false;
    authState.user = null;
    authState.token = null;
    saveAuthState();
  }
};

export const logout = () => {
  authState.isAuthenticated = false;
  authState.user = null;
  authState.token = null;
  saveAuthState();
};
