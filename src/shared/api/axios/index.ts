import axios from 'axios'
import * as process from 'process'

export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
})

httpClient.interceptors.request.use(
    async (config) => {
        try {
            const token = localStorage.getItem('access')

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        } catch (error) {
            return Promise.reject(error)
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

httpClient.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        if (error.response) {
            return Promise.reject(error.response)
        }

        if (error.request) {
            return Promise.reject(error.request)
        }

        return Promise.reject(error.message)
    }
)
