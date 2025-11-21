'use client';

import { Calendar, Newspaper } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { NewsItem } from "@/types";

interface NewsAccordionProps {
  news: NewsItem[];
}

export function NewsAccordion({ news }: NewsAccordionProps) {
  return (
    <div className="ml-14 space-y-2">
      <Accordion type="single" collapsible className="w-full">
        {news.map((item) => (
          <AccordionItem
            key={item.id}
            value={`item-${item.id}`}
            className="border border-gray-200 rounded-lg px-5 mb-2 bg-gray-50"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-start gap-3 text-left flex-1">
                <Newspaper className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 line-clamp-2">{item.summary}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-4">
              <div className="ml-8 space-y-4">
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
                <div className="flex items-center gap-6 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Newspaper className="w-4 h-4" />
                    <span>{item.source}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
