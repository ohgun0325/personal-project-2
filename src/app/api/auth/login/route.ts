import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId } = body;

  return NextResponse.json({
    token: "mock-token",
    user: {
      id: "user-1",
      name: userId || "KOICA 사용자",
      email: `${userId ?? "user"}@koica.go.kr`,
      roles: ["user"],
    },
  });
}

