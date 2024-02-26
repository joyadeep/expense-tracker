import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    // const token = localStorage.getItem("expense_tracker_token");
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default axiosInstance;