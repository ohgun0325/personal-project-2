import axios from "axios";

// 프로덕션에서는 환경 변수가 없으면 Next.js API 라우트를 사용 (상대 경로)
const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
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

