import {
  HttpContentType,
  HttpHeader,
  HttpStatus,
} from '@/common/enums/http.enum';
import { environment } from '@/config/environment';
import axios from 'axios';
import type { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { store } from '../redux/store';
import { logoutUser, refetchToken } from '../redux/auth/auth.actions';

const config: CreateAxiosDefaults = {
  baseURL: environment.apiBaseUrl,
  headers: {
    [HttpHeader.CONTENT_TYPE]: HttpContentType.JSON,
  },
};

const api = axios.create(config);

api.interceptors.request.use((config) => {
  const token = store.getState().auth.userToken;
  if (!token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    console.log(error?.response?.status);

    if (
      error.response &&
      error.response.status === HttpStatus.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const {
          payload: { accessToken },
        } = await store.dispatch(refetchToken());

        if (accessToken) {
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        return api(originalRequest);
      } catch (refreshError) {
        await store.dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
