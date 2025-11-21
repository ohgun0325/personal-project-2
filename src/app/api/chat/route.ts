import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const content = prompt
    ? `다음 요청을 기반으로 제안서를 준비했습니다:\n\n${prompt}\n\n- 개요, 목표, 기대효과를 포함한 초안이 생성되었습니다.\n- 업로드한 자료를 추가하면 더욱 정교한 결과를 얻을 수 있습니다.`
    : "요청된 내용이 없어 빈 제안서를 생성했습니다.";

  return NextResponse.json({
    id: nanoid(),
    role: "assistant",
    content,
    createdAt: new Date().toISOString(),
  });
}

