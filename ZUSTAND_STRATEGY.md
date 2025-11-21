# 프로젝트 마이그레이션 및 아키텍처 전략

## 📋 프로젝트 개요

### 참고 프로젝트 분석 (koicagpt/koicalogin)
- **기존 구조**: React 독립 앱 (Vite 기반으로 추정)
- **주요 특징**:
  - `main.tsx`에서 `createRoot`로 앱 마운트
  - 각 앱별로 독립된 컴포넌트 구조
  - Radix UI 컴포넌트 라이브러리 활용
  - Figma 에셋 통합 (`figma:asset/...` 형식)

### 목표 프로젝트 (Next.js 16 + React 19)
- **새로운 구조**: Next.js App Router 기반
- **장점**:
  - SSR/ISR/SSG 지원으로 SEO 최적화
  - 파일 기반 라우팅
  - API Routes 통합
  - 자동 코드 스플리팅

---

## 🎯 마이그레이션 전략

### 1단계: 프로젝트 구조 설계

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/              # 인증 관련 라우트 그룹
│   │   │   └── login/
│   │   │       └── page.tsx     # koicalogin 마이그레이션
│   │   ├── (main)/              # 메인 앱 라우트 그룹
│   │   │   ├── page.tsx         # koicagpt 메인 페이지
│   │   │   └── chat/
│   │   │       └── page.tsx     # 채팅 인터페이스
│   │   ├── api/                 # API Routes
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   └── news/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── auth/                # 로그인 관련 컴포넌트
│   │   ├── chat/                # 채팅 인터페이스 컴포넌트
│   │   ├── news/                # 뉴스 섹션 컴포넌트
│   │   ├── ui/                  # shadcn/ui 컴포넌트
│   │   └── shared/              # 공통 컴포넌트
│   ├── lib/
│   │   ├── utils.ts             # 유틸리티 함수
│   │   └── cn.ts                # className 병합 헬퍼
│   ├── hooks/                   # 커스텀 훅
│   ├── store/                   # Zustand 상태 관리
│   │   ├── authStore.ts
│   │   ├── chatStore.ts
│   │   └── newsStore.ts
│   ├── types/                   # TypeScript 타입 정의
│   ├── services/                # API 서비스 레이어
│   └── assets/                  # 정적 에셋
└── public/                      # 공개 정적 파일
```

---

## 🗄️ Zustand 상태 관리 전략

### 왜 Zustand인가?
1. **경량성**: Redux보다 훨씬 작은 번들 크기
2. **단순성**: Boilerplate 코드 최소화
3. **React 19 호환성**: Hooks 기반 설계로 완벽 호환
4. **TypeScript 친화적**: 강타입 지원
5. **DevTools 지원**: Redux DevTools 통합 가능

### 주요 Store 설계

#### 1. Auth Store (`store/authStore.ts`)
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}
```

**사용 케이스**: 
- koicalogin 페이지에서 로그인 처리
- 전역 인증 상태 관리
- Protected Routes 구현

#### 2. Chat Store (`store/chatStore.ts`)
```typescript
interface ChatState {
  messages: Message[];
  uploadedFiles: File[];
  isGenerating: boolean;
  
  // Actions
  addMessage: (message: Message) => void;
  generateProposal: (prompt: string) => Promise<void>;
  uploadFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  clearChat: () => void;
}
```

**사용 케이스**:
- koicagpt ChatInterface 상태 관리
- 파일 업로드 드로어 상태
- 제안서 생성 프로세스 추적

#### 3. News Store (`store/newsStore.ts`)
```typescript
interface NewsState {
  activeRegion: Region;
  news: Record<Region, NewsItem[]>;
  isLoading: boolean;
  
  // Actions
  setActiveRegion: (region: Region) => void;
  fetchNews: (region: Region) => Promise<void>;
  refreshNews: () => Promise<void>;
}
```

**사용 케이스**:
- NewsSection 지역별 뉴스 필터링
- 서버에서 뉴스 데이터 페칭
- 캐싱 및 갱신 관리

#### 4. UI Store (`store/uiStore.ts`)
```typescript
interface UIState {
  isDrawerOpen: boolean;
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  
  // Actions
  toggleDrawer: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
}
```

**사용 케이스**:
- FileUploadDrawer 열기/닫기
- 다크 모드 토글
- 사이드바 상태 관리

---

## 🔄 컴포넌트 마이그레이션 계획

### koicalogin → `/app/(auth)/login/page.tsx`

**변경 사항**:
- ❌ `main.tsx` + `createRoot` 제거
- ✅ Next.js Server Component로 전환 (필요시 'use client')
- ✅ Zustand authStore 통합
- ✅ Next.js Router (`useRouter`) 사용
- ✅ 에셋 경로 `/public`으로 변경

**상태 관리 리팩토링**:
```typescript
// Before (useState)
const [userId, setUserId] = useState('');
const [password, setPassword] = useState('');

// After (Zustand)
const { login, isLoading } = useAuthStore();
```

### koicagpt → `/app/(main)/page.tsx`

**변경 사항**:
- ✅ ChatInterface → `components/chat/ChatInterface.tsx`
- ✅ NewsSection → `components/news/NewsSection.tsx`
- ✅ Navbar → `components/shared/Navbar.tsx`
- ✅ 상태를 Zustand Store로 이동
- ✅ API 호출을 서비스 레이어로 분리

**예시**:
```typescript
// Before
const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

// After
const { uploadedFiles, uploadFiles, removeFile } = useChatStore();
```

---

## 🎨 UI 컴포넌트 전략

### shadcn/ui 활용
- 기존 `components/ui/*` 파일들을 그대로 활용
- 필요시 추가 컴포넌트는 `npx shadcn@latest add` 명령으로 설치
- 중복된 UI 컴포넌트 통합 (koicagpt/koicalogin 공통화)

### 컴포넌트 분류
1. **Page Components** (`app/**/page.tsx`): 라우트별 페이지
2. **Feature Components** (`components/chat`, `components/news`): 기능별 컴포넌트
3. **Shared Components** (`components/shared`): 공통 컴포넌트 (Navbar, Footer 등)
4. **UI Components** (`components/ui`): shadcn/ui 기본 컴포넌트

---

## 🌐 API 통합 전략

### Backend 연동 (Spring Boot)
```typescript
// services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 10000,
});

// 인터셉터로 토큰 자동 추가
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### Next.js API Routes 활용
```typescript
// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Spring Boot API 호출
  const response = await fetch('http://localhost:8080/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  const data = await response.json();
  return NextResponse.json(data);
}
```

**장점**:
- CORS 문제 해결
- 민감한 API 키 서버 측에서 관리
- 요청 로깅 및 에러 핸들링 중앙화

---

## 🔐 인증 전략

### JWT 토큰 기반 인증
```typescript
// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      
      login: async (credentials) => {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
        const { token, user } = await response.json();
        set({ token, user });
      },
      
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
```

### Protected Routes 구현
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/app/:path*',
};
```

---

## 📊 데이터 페칭 전략

### Server Components vs Client Components

#### Server Components (권장)
- 초기 데이터 로딩
- SEO가 중요한 페이지
- 사용자 인터랙션이 적은 콘텐츠

```typescript
// app/(main)/page.tsx (Server Component)
async function getInitialNews() {
  const res = await fetch('http://localhost:8080/api/news', {
    cache: 'no-store', // 또는 { next: { revalidate: 3600 } }
  });
  return res.json();
}

export default async function HomePage() {
  const news = await getInitialNews();
  
  return <NewsSection initialData={news} />;
}
```

#### Client Components
- 실시간 업데이트가 필요한 부분
- 사용자 인터랙션이 많은 UI
- Zustand Store를 사용하는 컴포넌트

```typescript
'use client';

import { useChatStore } from '@/store/chatStore';

export function ChatInterface() {
  const { messages, addMessage } = useChatStore();
  // ...
}
```

---

## 🚀 성능 최적화 전략

### 1. 코드 스플리팅
```typescript
import dynamic from 'next/dynamic';

const FileUploadDrawer = dynamic(
  () => import('@/components/chat/FileUploadDrawer'),
  { ssr: false } // 클라이언트에서만 로드
);
```

### 2. 이미지 최적화
```typescript
import Image from 'next/image';

<Image
  src="/assets/koica-logo.png"
  alt="KOICA Logo"
  width={200}
  height={80}
  priority // LCP 개선
/>
```

### 3. Zustand Selector 최적화
```typescript
// ❌ 나쁜 예 - 전체 store 구독
const store = useChatStore();

// ✅ 좋은 예 - 필요한 값만 구독
const messages = useChatStore((state) => state.messages);
const addMessage = useChatStore((state) => state.addMessage);
```

### 4. React Compiler 활용
- 이미 `--use-react-compiler` 플래그로 활성화됨
- 자동 메모이제이션으로 리렌더링 최적화
- `useMemo`, `useCallback` 사용 최소화 가능

---

## 📦 의존성 전략

### 핵심 라이브러리
- **상태 관리**: `zustand` (이미 설치됨)
- **HTTP 클라이언트**: `axios` (이미 설치됨)
- **폼 관리**: `react-hook-form` (이미 설치됨)
- **UI 컴포넌트**: Radix UI (이미 설치됨)
- **스타일링**: Tailwind CSS + CVA (이미 설치됨)

### 추가 권장 라이브러리
```bash
npm install zod                    # 스키마 검증
npm install @tanstack/react-query  # 서버 상태 관리 (선택사항)
npm install date-fns               # 날짜 포맷팅
```

---

## 🧪 테스트 전략

### 단위 테스트 (Jest + Testing Library)
```typescript
// __tests__/store/authStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/store/authStore';

describe('AuthStore', () => {
  it('should login user', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    await act(async () => {
      await result.current.login({ userId: 'test', password: 'pass' });
    });
    
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

---

## 📅 구현 로드맵

### Phase 1: 기반 구축 (1-2주)
- [x] Next.js 프로젝트 초기화
- [x] package.json 의존성 설정
- [ ] 폴더 구조 생성
- [ ] Zustand Store 기본 구조 작성
- [ ] shadcn/ui 컴포넌트 복사

### Phase 2: 로그인 기능 (1주)
- [ ] koicalogin 마이그레이션
- [ ] authStore 구현
- [ ] JWT 인증 로직 구현
- [ ] Protected Routes 설정

### Phase 3: 메인 앱 기능 (2-3주)
- [ ] koicagpt ChatInterface 마이그레이션
- [ ] chatStore 구현
- [ ] FileUploadDrawer 통합
- [ ] NewsSection 마이그레이션
- [ ] newsStore 구현

### Phase 4: API 통합 (1-2주)
- [ ] Spring Boot 백엔드 연동
- [ ] Next.js API Routes 구현
- [ ] 에러 핸들링 및 로딩 상태

### Phase 5: 최적화 및 배포 (1주)
- [ ] 성능 최적화
- [ ] SEO 최적화
- [ ] 빌드 및 배포 설정
- [ ] 환경변수 관리

---

## 🔧 개발 환경 설정

### 환경변수 (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=KOICA
NODE_ENV=development
```

### 스크립트 명령어
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 📚 참고 자료

- [Next.js 16 문서](https://nextjs.org/docs)
- [Zustand 공식 문서](https://zustand-demo.pmnd.rs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React 19 마이그레이션 가이드](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

## 💡 핵심 포인트

1. **점진적 마이그레이션**: 기존 코드를 한 번에 바꾸지 말고 단계적으로 이식
2. **Zustand 중심**: 컴포넌트 간 상태 공유는 무조건 Zustand Store 활용
3. **Server First**: 가능하면 Server Components로 구현하고, 필요할 때만 Client Components 사용
4. **타입 안정성**: TypeScript 타입을 명확히 정의하여 런타임 에러 방지
5. **재사용성**: UI 컴포넌트는 최대한 공통화하여 중복 제거

---

**작성일**: 2025.11.20  
**프로젝트**: ohgun.kr/api/frontend  
**버전**: Next.js 16.0.3 + React 19.2.0

