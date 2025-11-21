'use client';

import { useEffect, useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { FileUploadDrawer } from "@/components/chat/FileUploadDrawer";
import { NewsSection } from "@/components/news/NewsSection";
import { Navbar } from "@/components/shared/Navbar";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 클라이언트에서만 렌더링하여 hydration mismatch 방지
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="sticky top-0 z-50 border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0066CC]"></div>
            <span className="text-gray-900">KOICA 제안서 AI</span>
          </div>
        </div>
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 mt-16 text-center">
              <h1 className="mb-4 text-gray-900">KOICA 사업제안서 작성을 시작하세요</h1>
              <p className="text-lg text-gray-600">
                AI가 귀하의 프로젝트 아이디어를 전문적인 제안서로 작성해드립니다
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
