'use client';

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuthStore } from "@/store/auth-store";

// Zustand store를 사용하는 컴포넌트들을 클라이언트에서만 동적으로 로드
// SSR을 완전히 비활성화하여 hydration mismatch 방지
const Navbar = dynamic(() => import("@/components/shared/Navbar").then(mod => ({ default: mod.Navbar })), {
  ssr: false,
});

const ChatInterface = dynamic(() => import("@/components/chat/ChatInterface").then(mod => ({ default: mod.ChatInterface })), {
  ssr: false,
});

const NewsSection = dynamic(() => import("@/components/news/NewsSection").then(mod => ({ default: mod.NewsSection })), {
  ssr: false,
});

const FileUploadDrawer = dynamic(() => import("@/components/chat/FileUploadDrawer").then(mod => ({ default: mod.FileUploadDrawer })), {
  ssr: false,
});

export default function Home() {
  // 클라이언트에서만 auth store hydration 수행
  useEffect(() => {
    if (typeof window !== "undefined") {
      useAuthStore.persist.rehydrate();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <ChatInterface />
        <div className="mt-24">
          <NewsSection />
        </div>
      </main>
      <FileUploadDrawer />
    </div>
  );
}
