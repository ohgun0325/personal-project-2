'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export function LoginForm() {
    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [mounted, setMounted] = useState(false);
    const { login, isLoading } = useAuthStore((state) => ({
        login: state.login,
        isLoading: state.isLoading,
    }));
    const [error, setError] = useState<string | null>(null);

    // 클라이언트에서만 auth store hydration 수행
    useEffect(() => {
        if (typeof window !== "undefined") {
            useAuthStore.persist.rehydrate();
            setMounted(true);
        }
    }, []);

    // hydration이 완료될 때까지 렌더링 지연
    if (!mounted) {
        return null;
    }

    const handleLogin = async () => {
        setError(null);
        try {
            await login({ userId, password });
            router.push("/");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "로그인 요청을 처리할 수 없습니다.",
            );
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#c8d8f0] via-[#d8e8f8] to-[#e0f0ff]">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
                <span className="text-[20rem] tracking-wider text-gray-400">KOICA</span>
            </div>

            <div className="relative flex w-full max-w-[880px] items-center gap-16 rounded-lg bg-[#0c2b6b] p-12 shadow-2xl">
                <div className="flex flex-shrink-0 flex-col items-center gap-6">
                    <div className="flex items-center justify-center rounded-lg bg-white px-6 py-4">
                        <Image
                            src="/assets/koica-login.png"
                            alt="KOICA Logo"
                            width={160}
                            height={64}
                            priority
                        />
                    </div>
                    <h1 className="text-6xl font-extrabold tracking-wide text-white">LOGIN</h1>
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <label htmlFor="userId" className="mb-2 block text-sm text-white">
                            사용자 아이디
                        </label>
                        <Input
                            id="userId"
                            type="text"
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                            className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                            placeholder="아이디를 입력하세요"
                            autoComplete="username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm text-white">
                            비밀번호
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                            placeholder="비밀번호를 입력하세요"
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="rounded-md border border-red-400 bg-red-50 px-4 py-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleLogin}
                        disabled={!userId || !password || isLoading}
                        className="h-11 w-full bg-[#00a8e8] text-white hover:bg-[#0090c8]"
                    >
                        {isLoading ? "로그인 중..." : "로그인"}
                    </Button>

                    <div className="flex items-center justify-center gap-3 pt-2 text-sm text-white/70">
                        <button className="transition-colors hover:text-white">아이디 찾기</button>
                        <span>|</span>
                        <button className="transition-colors hover:text-white">비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

