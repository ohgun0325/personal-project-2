'use client';

import dynamic from "next/dynamic";

// LoginForm을 클라이언트에서만 동적으로 로드하여 hydration mismatch 방지
const LoginForm = dynamic(() => import("@/components/auth/LoginForm").then(mod => ({ default: mod.LoginForm })), {
  ssr: false,
});

export default function LoginPage() {
  return <LoginForm />;
}

