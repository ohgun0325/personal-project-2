'use client';

import { nanoid } from "nanoid";
import { create } from "zustand";
import apiClient from "@/services/api-client";
import type { Message, ProposalPayload } from "@/types";

interface ChatState {
  messages: Message[];
  uploadedFiles: File[];
  isGenerating: boolean;
  addMessage: (message: Omit<Message, "id" | "createdAt">) => void;
  generateProposal: (prompt: string) => Promise<void>;
  uploadFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  uploadedFiles: [],
  isGenerating: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: nanoid(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  generateProposal: async (prompt) => {
    if (!prompt.trim()) return;

    const payload: ProposalPayload = {
      prompt,
      files: get().uploadedFiles,
    };

    set({ isGenerating: true });
    try {
      const { data } = await apiClient.post<Message>("/api/chat", payload, {
        headers: { "Content-Type": "application/json" },
      });
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: nanoid(),
            role: "user",
            content: prompt,
            createdAt: new Date().toISOString(),
          },
          {
            ...data,
            id: data.id ?? nanoid(),
            createdAt: data.createdAt ?? new Date().toISOString(),
          },
        ],
        isGenerating: false,
      }));
    } catch (error) {
      console.error(error);
      set({ isGenerating: false });
    }
  },
  uploadFiles: (files) =>
    set((state) => ({
      uploadedFiles: [...state.uploadedFiles, ...files],
    })),
  removeFile: (index) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((_, i) => i !== index),
    })),
  clearChat: () => set({ messages: [], uploadedFiles: [] }),
}));

