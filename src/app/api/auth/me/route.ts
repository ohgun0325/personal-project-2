import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    id: "user-1",
    name: "KOICA 사용자",
    email: "user@koica.go.kr",
    roles: ["user"],
  });
}

