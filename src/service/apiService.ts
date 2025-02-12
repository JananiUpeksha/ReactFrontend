import {toast} from "react-toastify";
import promise = toast.promise;
import axios from "axios"

export const api = axios.create({
    baseURL:  "http://localhost:3003",
})
api.interceptors.request.use(
    (config) => {
        if (!config?.url?.includes("/auth")) {
            const token = localStorage.getItem("jwt_token");
            if (token) {
                if (config.headers) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);