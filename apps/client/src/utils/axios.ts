import axios from 'axios';
import { authState } from "@/utils/auth";
import { config } from './config';

axios.defaults.baseURL = `${config.api.baseUrl}/api/v1`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use(config => {
    const token = authState.token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axios;
