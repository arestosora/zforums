import { reactive } from 'vue';

// Cargar el estado inicial de autenticación desde localStorage
const savedAuthState = localStorage.getItem('authState');
const initialState = savedAuthState ? JSON.parse(savedAuthState) : { isAuthenticated: false, user: null };

export const authState = reactive({
  isAuthenticated: initialState.isAuthenticated,
  user: initialState.user,
});

// Guardar el estado de autenticación en localStorage cada vez que cambie
export const saveAuthState = () => {
  localStorage.setItem('authState', JSON.stringify(authState));
};

export const login = (user: { email: string }) => {
  authState.isAuthenticated = true;
  authState.user = user;
  saveAuthState();
};

export const logout = () => {
  authState.isAuthenticated = false;
  authState.user = null;
  saveAuthState();
};

