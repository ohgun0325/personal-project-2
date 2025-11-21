'use client';

import { Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";

interface NewsCardProps {
  image: string;
  title: string;
  summary: string;
  source: string;
  date: string;
}

export function NewsCard({ image, title, summary, source, date }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group cursor-pointer">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 line-clamp-3 flex-1">
          {summary}
        </p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-gray-700">{source}</span>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </CardFooter>
    </Card>
  );
}
