'use client';

import { FileText, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { useUIStore } from "@/store/ui-store";

export function Navbar() {
    const fileCount = useChatStore((state) => state.uploadedFiles.length);
    const toggleDrawer = useUIStore((state) => state.toggleDrawer);

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0066CC]">
                        <FileText className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gray-900">KOICA 제안서 AI</span>
                </div>
                <Button
                    variant="outline"
                    className="relative gap-2 border-[#0066CC] text-[#0066CC] hover:bg-blue-50"
                    onClick={toggleDrawer}
                >
                    <Paperclip className="h-5 w-5" />
                    제안서 작성 도우미
                    {fileCount > 0 && (
                        <Badge className="ml-1 bg-[#0066CC] hover:bg-[#0052A3]">{fileCount}</Badge>
                    )}
                </Button>
            </div>
        </nav>
    );
}

