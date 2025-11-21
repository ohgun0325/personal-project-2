import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // 서버와 클라이언트에서 동일한 초기값 사용 (hydration mismatch 방지)
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // 클라이언트에서만 실행
    if (typeof window === "undefined") return;
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
