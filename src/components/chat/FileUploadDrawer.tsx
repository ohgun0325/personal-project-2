'use client';

import { useCallback, useEffect, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { useUIStore } from "@/store/ui-store";

export function FileUploadDrawer() {
    const [isDragging, setIsDragging] = useState(false);
    const { isDrawerOpen, setDrawerOpen } = useUIStore((state) => ({
        isDrawerOpen: state.isDrawerOpen,
        setDrawerOpen: state.setDrawerOpen,
    }));
    const { uploadedFiles, uploadFiles, removeFile } = useChatStore(
        (state) => ({
            uploadedFiles: state.uploadedFiles,
            uploadFiles: state.uploadFiles,
            removeFile: state.removeFile,
        }),
    );

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isDrawerOpen]);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(false);
        },
        [],
    );

    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(false);

            const files = Array.from(event.dataTransfer.files).filter(
                (file) => file.type === "application/pdf",
            );
            if (files.length) {
                uploadFiles(files);
            }
        },
        [uploadFiles],
    );

    const handleFileSelect = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(event.target.files ?? []).filter(
                (file) => file.type === "application/pdf",
            );
            if (files.length) {
                uploadFiles(files);
            }
        },
        [uploadFiles],
    );

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isDrawerOpen ? "opacity-50" : "pointer-events-none opacity-0"
                    }`}
                onClick={() => setDrawerOpen(false)}
            />

            <div
                className={`fixed right-0 top-0 z-50 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 ease-out md:w-[480px] ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-gray-200 p-6">
                        <div>
                            <h2 className="mb-1 text-gray-900">훈련 자료 관리</h2>
                            <p className="text-gray-600">제안서 작성에 참고할 자료를 업로드하세요</p>
                        </div>
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                        >
                            <X className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div
                            className={`mb-6 rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${isDragging
                                    ? "scale-[1.02] border-[#0066CC] bg-blue-50"
                                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center gap-4 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                                    <Upload className="h-8 w-8 text-[#0066CC]" />
                                </div>
                                <div>
                                    <p className="mb-2 text-gray-900">PDF 파일을 드래그하여 놓으세요</p>
                                    <p className="mb-4 text-gray-500">또는</p>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer border-[#0066CC] text-[#0066CC] hover:bg-blue-50"
                                        onClick={() => document.getElementById("drawer-file-upload")?.click()}
                                    >
                                        파일 선택
                                    </Button>
                                    <input
                                        id="drawer-file-upload"
                                        type="file"
                                        accept=".pdf"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                </div>
                                <p className="text-gray-500">이전 제안서, 가이드라인 등</p>
                            </div>
                        </div>

                        {uploadedFiles.length > 0 ? (
                            <div>
                                <h3 className="mb-4 text-gray-900">
                                    업로드된 파일 ({uploadedFiles.length})
                                </h3>
                                <div className="space-y-3">
                                    {uploadedFiles.map((file, index) => (
                                        <div
                                            key={`${file.name}-${index}`}
                                            className="group flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:border-[#0066CC] hover:shadow-sm"
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-blue-50">
                                                <FileText className="h-5 w-5 text-[#0066CC]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-gray-900">{file.name}</p>
                                                <p className="text-gray-500">{formatFileSize(file.size)}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFile(index)}
                                                className="flex-shrink-0 rounded p-1.5 opacity-0 transition-all hover:bg-gray-200 group-hover:opacity-100"
                                            >
                                                <X className="h-4 w-4 text-gray-600" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500">아직 업로드된 파일이 없습니다</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 p-6">
                        <p className="mb-4 text-gray-600">
                            업로드된 자료는 AI가 제안서 작성 시 참고하여 더욱 정확하고 전문적인 내용을
                            생성합니다.
                        </p>
                        <Button
                            onClick={() => setDrawerOpen(false)}
                            className="w-full bg-[#0066CC] text-white hover:bg-[#0052A3]"
                        >
                            완료
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

