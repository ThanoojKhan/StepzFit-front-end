import axios from 'axios'
import { Store } from '../store/store'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    headers: {
        "Content-Type": 'application/json'
    }
})


axiosInstance.interceptors.request.use(
    config => {
        const userState = Store.getState().User;
        const adminState = Store.getState().Admin;
        const trainerState = Store.getState().Trainer;
        const role = config.url.split("/")[1]

        if (role === 'user') {
            config.headers['Authorization'] = `Bearer ${userState.token}`;
        }

        if (role === 'admin') {
            config.headers['Authorization'] = `Bearer ${adminState.token}`;
        }

        if (role === 'trainer') {
            config.headers['Authorization'] = `Bearer ${trainerState.token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance