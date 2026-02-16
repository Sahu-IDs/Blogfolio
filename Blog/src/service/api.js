import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';
import { getAccessToken, getType } from '../utils/common-utils.js';

// Use environment variable for production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    function (config) {
        if (config.service.authenticate) {
            const token = getAccessToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        if (response.data && (response.data.isSuccess !== undefined || response.data.isFailure !== undefined)) {
            return response.data;
        }
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message,
            code: response?.status
        }
    }
}

const processError = (error) => {
    if (error.response) {
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: error.response.data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message,
            code: error.response.status
        }
    } else if (error.request) {
        console.log('ERROR IN REQUEST: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
            code: error.code || ""
        }
    } else {
        console.log('ERROR IN NETWORK: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError.message,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        // Handle Path Parameters (params: true)
        let finalUrl = value.url;
        if (value.params) {
            if (typeof body === 'string') {
                finalUrl = `${value.url}/${body}`;
            } else if (typeof body === 'object' && body._id) {
                finalUrl = `${value.url}/${body._id}`;
            } else if (typeof body === 'object' && body.id) {
                finalUrl = `${value.url}/${body.id}`;
            } else if (typeof body === 'object' && body.userId) { // Added support for userId
                finalUrl = `${value.url}/${body.userId}`;
            }
        }

        console.log(`🌐 API CALL: [${value.method}] ${finalUrl}`, { body, query: getType(value, body) });

        return axiosInstance({
            method: value.method,
            url: finalUrl,
            data: body,
            ...getType(value, body),
            responseType: value.responseType,
            service: { authenticate: value.authenticate },
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        });
    }
}

export { API };