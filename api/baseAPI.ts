import Axios from 'axios';

const initializers = {
    baseURL: process.env.API_URL,
    timeout: 30000,
}

function returnAxiosInstance() {
    const axios = Axios.create(initializers)
    axios.interceptors.request.use((req) => {
        req.params = {
            ...req.params
        }
        return req
    });
    return axios
}

export function get<T>(url: string, params?: object) {
    const axios = returnAxiosInstance();

    return axios.get<T>(url, { params });
}

export function post<T>(url: string, requestData: T) {
    const axios = returnAxiosInstance();
    return axios.post<T>(url, requestData);
}