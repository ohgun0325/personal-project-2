'use client';

import axios from "axios";

// 프로덕션에서는 환경 변수가 없으면 Next.js API 라우트를 사용 (상대 경로)
// 클라이언트에서만 환경 변수 접근
const getBaseURL = () => {
  // 클라이언트에서만 환경 변수 접근
  if (typeof window === "undefined") {
    return "";
  }
  // NEXT_PUBLIC_ prefix가 있는 환경 변수만 클라이언트에서 접근 가능
  return (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) || "";
};

const apiClient = axios.create({
  // 초기 baseURL은 빈 문자열로 설정하고, interceptor에서 동적으로 설정
  baseURL: "",
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  // baseURL을 동적으로 설정 (환경 변수가 변경될 수 있으므로)
  const baseURL = getBaseURL();
  if (baseURL) {
    config.baseURL = baseURL;
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);

export default apiClient;

