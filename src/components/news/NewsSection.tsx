'use client';

import { useEffect, useRef, useState } from "react";
import { NewsAccordion } from "@/components/news/NewsAccordion";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { newsRegions, newsSeedData } from "@/lib/news-data";
import { useNewsStore } from "@/store/news-store";

export function NewsSection() {
    const [mounted, setMounted] = useState(false);
    const { activeRegion, setActiveRegion, news, isLoading, fetchNews, hydrate } =
        useNewsStore();
    const allNewsCount = news.all.length;
    const currentNewsCount = news[activeRegion]?.length ?? 0;

    // 무한 루프 방지를 위한 ref
    const hasHydrated = useRef(false);
    const fetchedRegions = useRef<Set<string>>(new Set());

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (!hasHydrated.current && !allNewsCount) {
            hasHydrated.current = true;
            hydrate(newsSeedData);
        }
    }, [mounted, allNewsCount, hydrate]);

    useEffect(() => {
        if (!mounted) return;
        if (!currentNewsCount && !fetchedRegions.current.has(activeRegion)) {
            fetchedRegions.current.add(activeRegion);
            void fetchNews(activeRegion);
        }
    }, [mounted, activeRegion, currentNewsCount, fetchNews]);

    return (
        <div className="border-t border-gray-200 pt-12">
            <div className="mb-8">
                <h2 className="mb-2 text-gray-900">2025년 최신 국제개발협력 동향</h2>
                <p className="text-gray-600">지역을 선택하여 최신 개발협력 뉴스를 확인하세요</p>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {newsRegions.map((region) => (
                    <button
                        key={region.value}
                        onClick={() => setActiveRegion(region.value)}
                        className={`flex flex-col items-center rounded-xl border-2 p-6 transition-all hover:shadow-md ${activeRegion === region.value
                            ? "border-[#0066CC] bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                    >
                        <div
                            className={`mb-4 h-20 w-20 overflow-hidden rounded-lg border-2 ${activeRegion === region.value ? "border-[#0066CC]" : "border-gray-200"
                                }`}
                        >
                            <ImageWithFallback
                                src={region.mapImage}
                                alt={`${region.label} 지도`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <h3
                            className={`mb-1 ${activeRegion === region.value ? "text-[#0066CC]" : "text-gray-900"
                                }`}
                        >
                            {region.label}
                        </h3>
                        <p className="text-gray-500">{news[region.value].length}개</p>
                    </button>
                ))}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-gray-900">
                        {newsRegions.find((region) => region.value === activeRegion)?.label} 뉴스
                    </h3>
                    {isLoading && <span className="text-sm text-gray-500">불러오는 중...</span>}
                </div>
                <NewsAccordion news={news[activeRegion]} />
            </div>
        </div>
    );
}

