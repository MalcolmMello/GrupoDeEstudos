import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const api = axios.create({
    baseURL: 'https://reqres.in/api/'
});

api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        config.headers.Authorization = user?.token;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)