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
    if (get().news[region].length === 0) {
      void get().fetchNews(region);
    }
  },
  fetchNews: async (region = get().activeRegion) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await apiClient.get<NewsItem[]>(
        `/api/news?region=${region}`,
      );
      set((state) => ({
        news: { ...state.news, [region]: data },
        isLoading: false,
      }));
    } catch (error) {
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

