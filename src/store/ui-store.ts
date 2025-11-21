'use client';

import { create } from "zustand";

interface UIState {
  isDrawerOpen: boolean;
  theme: "light" | "dark";
  sidebarCollapsed: boolean;
  toggleDrawer: () => void;
  setDrawerOpen: (isOpen: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDrawerOpen: false,
  theme: "light",
  sidebarCollapsed: false,
  toggleDrawer: () =>
    set((state) => ({
      isDrawerOpen: !state.isDrawerOpen,
    })),
  setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),
}));

