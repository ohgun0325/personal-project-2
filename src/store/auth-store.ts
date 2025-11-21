'use client';

import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "@/services/api-client";
import type { AuthResponse, LoginCredentials, User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await apiClient.post<AuthResponse>(
            "/api/auth/login",
            credentials,
          );
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "로그인에 실패했습니다.",
            isLoading: false,
            isAuthenticated: false,
            user: null,
            token: null,
          });
          throw error;
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { data } = await apiClient.get<User>("/api/auth/me");
          set({
            user: data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: ({ token, user, isAuthenticated }) => ({
        token,
        user,
        isAuthenticated,
      }),
      // 서버 사이드에서 hydration 스킵하여 hydration mismatch 방지
      skipHydration: true,
    },
  ),
);

