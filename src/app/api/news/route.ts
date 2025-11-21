import { NextResponse } from "next/server";
import { newsSeedData } from "@/lib/news-data";
import type { Region } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = (searchParams.get("region") ?? "all") as Region;
  const payload = newsSeedData[region] ?? newsSeedData.all;

  return NextResponse.json(payload);
}

