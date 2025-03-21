'use client';

import { useState, useEffect } from 'react';

export const useMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // 초기 체크
    checkIfMobile();

    // 리사이즈 이벤트 구독
    window.addEventListener('resize', checkIfMobile);

    // 클린업 함수
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [breakpoint]);

  return isMobile;
};
