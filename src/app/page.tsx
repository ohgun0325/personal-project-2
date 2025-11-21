'use client';

import { ChatInterface } from "@/components/chat/ChatInterface";
import { FileUploadDrawer } from "@/components/chat/FileUploadDrawer";
import { NewsSection } from "@/components/news/NewsSection";
import { Navbar } from "@/components/shared/Navbar";

export default function Home() {
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
