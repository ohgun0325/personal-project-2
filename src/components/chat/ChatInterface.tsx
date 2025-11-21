'use client';

import Image from "next/image";
import { useCallback, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/store/chat-store";

export function ChatInterface() {
    const [input, setInput] = useState("");
    const { generateProposal, isGenerating } = useChatStore();

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!input.trim()) return;
            await generateProposal(input);
            setInput("");
        },
        [generateProposal, input],
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
            }
        },
        [handleSubmit],
    );

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-16 mt-16 text-center">
                <div className="mb-8 inline-flex items-center justify-center rounded-3xl bg-white p-6 shadow-lg">
                    <Image
                        src="/assets/koica-gpt.png"
                        alt="KOICA 로고"
                        width={200}
                        height={80}
                        priority
                    />
                </div>
                <h1 className="mb-4 text-gray-900">KOICA 사업제안서 작성을 시작하세요</h1>
                <p className="text-lg text-gray-600">
                    AI가 귀하의 프로젝트 아이디어를 전문적인 제안서로 작성해드립니다
                </p>
            </div>

            <div className="sticky bottom-8">
                <form onSubmit={handleSubmit} className="relative">
                    <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-xl transition-colors focus-within:border-[#0066CC]">
                        <Textarea
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="어떤 제안서를 작성하시겠습니까?"
                            className="min-h-[140px] resize-none border-0 p-6 text-lg text-gray-900 placeholder:text-gray-400 focus-visible:ring-0"
                        />
                        <div className="flex items-center justify-between px-6 pb-4">
                            <p className="text-gray-500">Shift + Enter로 줄바꿈</p>
                            <Button
                                type="submit"
                                disabled={!input.trim() || isGenerating}
                                size="lg"
                                className="gap-2 bg-[#0066CC] text-white disabled:opacity-50 hover:bg-[#0052A3]"
                            >
                                <Send className="h-5 w-5" />
                                {isGenerating ? "생성 중..." : "제안서 생성"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

