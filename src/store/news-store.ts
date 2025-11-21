'use client';

import { create } from "zustand";
import apiClient from "@/services/api-client";
import type { NewsItem, Region } from "@/types";

interface NewsState {
  activeRegion: Region;
  news: Record<Region, NewsItem[]>;
  isLoading: boolean;
  error: string | null;
  setActiveRegion: (region: Region) => void;
  fetchNews: (region?: Region) => Promise<void>;
  hydrate: (data: Partial<Record<Region, NewsItem[]>>) => void;
}

const defaultState: Record<Region, NewsItem[]> = {
  all: [],
  africa: [],
  "southeast-asia": [],
  "central-asia": [],
  "latin-america": [],
};

export const useNewsStore = create<NewsState>((set, get) => ({
  activeRegion: "all",
  news: defaultState,
  isLoading: false,
  error: null,
  setActiveRegion: (region) => {
    set({ activeRegion: region });
    // fetchNews는 컴포넌트의 useEffect에서 처리하도록 변경
    // 여기서 호출하면 무한 루프 발생 가능
  },
  fetchNews: async (region = get().activeRegion) => {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === "undefined") {
      return;
    }
    
    set({ isLoading: true, error: null });
    try {
      // baseURL이 설정되어 있으면 그대로 사용, 없으면 상대 경로로 Next.js API 라우트 사용
      const { data } = await apiClient.get<NewsItem[]>(
        `/api/news?region=${region}`,
      );
      set((state) => ({
        news: { ...state.news, [region]: data },
        isLoading: false,
      }));
    } catch (error) {
      // 에러가 발생해도 앱이 크래시되지 않도록 처리
      console.warn("뉴스 데이터를 불러오지 못했습니다:", error);
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "뉴스 데이터를 불러오지 못했습니다.",
      });
    }
  },
  hydrate: (data) =>
    set((state) => ({
      news: {
        ...state.news,
        ...Object.keys(data).reduce(
          (acc, key) => ({
            ...acc,
            [key as Region]: data[key as Region] ?? [],
          }),
          {},
        ),
      },
    })),
}));

