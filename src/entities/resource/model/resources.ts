import type { Resource } from './types';

export const resources: Resource[] = [
  {
    id: '1',
    title: '반응형 네비게이션 바 컴포넌트',
    description: '모바일과 데스크톱에 최적화된 현대적인 네비게이션 바 컴포넌트입니다.',
    category: 'code',
    thumbnail: '/placeholder.svg?height=400&width=600',
    preview:
      '이 네비게이션 바는 모바일과 데스크톱 환경에 모두 최적화되어 있으며, 다크 모드를 지원합니다. 스크롤 시 자동으로 숨겨지는 기능과 반응형 디자인이 적용되어 있습니다.',
    fullContent:
      '이 네비게이션 바는 React와 styled-components를 사용하여 구현되었습니다. 모바일 환경에서는 햄버거 메뉴로 변환되며, 스크롤 방향에 따라 자동으로 숨겨지거나 나타나는 기능이 포함되어 있습니다. 또한 다크 모드와 라이트 모드를 지원하며, 사용자의 시스템 설정에 따라 자동으로 적용됩니다.\n\n```jsx\nimport React, { useState, useEffect } from "react";\nimport styled from "styled-components";\n\nconst Navbar = () => {\n  const [isOpen, setIsOpen] = useState(false);\n  const [scrollDir, setScrollDir] = useState("up");\n\n  useEffect(() => {\n    // 스크롤 방향 감지 로직\n  }, []);\n\n  return (\n    <NavContainer scrollDir={scrollDir}>\n      {/* 네비게이션 컨텐츠 */}\n    </NavContainer>\n  );\n};\n```',
    downloads: 1245,
    views: 3210,
    author: '홍길동',
    createdAt: '2023-04-10',
    updatedAt: '2023-04-10',
    password: '1234',
  },
  {
    id: '2',
    title: '미니멀 대시보드 UI 키트',
    description: '깔끔하고 현대적인 대시보드 디자인 시스템입니다.',
    category: 'design',
    thumbnail: '/placeholder.svg?height=400&width=600',
    preview:
      '이 UI 키트는 관리자 대시보드를 위한 모든 필수 요소를 포함하고 있습니다. 차트, 테이블, 폼 요소 등 다양한 컴포넌트가 포함되어 있습니다.',
    fullContent:
      '이 미니멀 대시보드 UI 키트는 Figma로 제작되었으며, 다양한 관리자 패널 및 대시보드 디자인에 활용할 수 있습니다. 모든 컴포넌트는 Auto Layout을 사용하여 반응형으로 설계되었으며, 컴포넌트 라이브러리로 구성되어 있어 쉽게 재사용할 수 있습니다.\n\n포함된 컴포넌트:\n- 다양한 차트 및 그래프\n- 데이터 테이블\n- 폼 요소\n- 네비게이션 메뉴\n- 알림 및 모달\n- 프로필 카드\n- 통계 위젯\n\n모든 요소는 8px 그리드 시스템을 기반으로 설계되었으며, 색상 변수와 텍스트 스타일이 체계적으로 구성되어 있습니다.',
    downloads: 2890,
    views: 5420,
    author: '홍길동',
    createdAt: '2023-04-10',
    updatedAt: '2023-04-10',
  },
  {
    id: '3',
    title: '인터랙티브 슬라이더 컴포넌트',
    description: '터치와 드래그를 지원하는 고급 슬라이더 컴포넌트입니다.',
    category: 'code',
    thumbnail: '/placeholder.svg?height=400&width=600',
    preview: '이 슬라이더는 터치 제스처와 키보드 네비게이션을 지원하며, 다양한 애니메이션 효과를 포함하고 있습니다.',
    fullContent:
      '이 인터랙티브 슬라이더는 React와 Framer Motion을 사용하여 구현되었습니다. 터치 제스처, 드래그, 키보드 네비게이션을 지원하며, 접근성 표준을 준수합니다.\n\n주요 기능:\n- 무한 루프 슬라이딩\n- 자동 재생 옵션\n- 다양한 트랜지션 효과\n- 반응형 디자인\n- ARIA 속성 지원\n\n```jsx\nimport React from "react";\nimport { motion, AnimatePresence } from "framer-motion";\n\nconst Slider = ({ items }) => {\n  const [current, setCurrent] = useState(0);\n  \n  // 슬라이더 로직\n  \n  return (\n    <SliderContainer>\n      <AnimatePresence>\n        {/* 슬라이더 아이템 */}\n      </AnimatePresence>\n    </SliderContainer>\n  );\n};\n```',
    downloads: 1876,
    views: 4150,
    author: '홍길동',
    createdAt: '2023-04-10',
    updatedAt: '2023-04-10',
  },
  {
    id: '4',
    title: '그라디언트 아이콘 세트',
    description: '현대적인 앱을 위한 그라디언트 스타일의 아이콘 컬렉션입니다.',
    category: 'design',
    thumbnail: '/placeholder.svg?height=400&width=600',
    preview: '이 아이콘 세트는 다양한 그라디언트 스타일로 제작된 100개 이상의 아이콘을 포함하고 있습니다.',
    fullContent:
      '이 그라디언트 아이콘 세트는 SVG 형식으로 제공되며, 웹 및 모바일 앱 디자인에 완벽하게 어울립니다. 각 아이콘은 24x24 그리드에서 디자인되었으며, 다양한 크기로 확장 가능합니다.\n\n포함된 카테고리:\n- 인터페이스 요소\n- 소셜 미디어\n- 날씨\n- 파일 및 문서\n- 통신\n- 전자상거래\n- 미디어 컨트롤\n\n각 아이콘은 SVG 및 PNG 형식으로 제공되며, 색상을 쉽게 변경할 수 있도록 설계되었습니다. Figma, Sketch, Adobe XD 파일도 포함되어 있습니다.',
    downloads: 3450,
    views: 7890,
    author: '홍길동',
    createdAt: '2023-04-10',
    updatedAt: '2023-04-10',
    password: '1234',
  },
  {
    id: '5',
    title: '인증 시스템 보일러플레이트',
    description: 'Next.js와 Firebase를 사용한 완전한 인증 시스템입니다.',
    category: 'code',
    thumbnail: '/placeholder.svg?height=400&width=600',
    preview:
      '이 보일러플레이트는 이메일/비밀번호 로그인, 소셜 로그인, 비밀번호 재설정 등 모든 필수 인증 기능을 포함하고 있습니다.',
    fullContent:
      '이 인증 시스템은 Next.js와 Firebase Authentication을 사용하여 구현되었습니다. TypeScript로 작성되었으며, 모든 주요 인증 기능을 포함하고 있습니다.\n\n주요 기능:\n- 이메일/비밀번호 로그인\n- Google, Facebook, Twitter 소셜 로그인\n- 이메일 인증\n- 비밀번호 재설정\n- 사용자 프로필 관리\n- 보호된 라우트\n- 관리자 권한 시스템\n\n```jsx\nimport { useAuth } from "../hooks/useAuth";\n\nfunction ProtectedRoute({ children }) {\n  const { user, loading } = useAuth();\n  \n  if (loading) return <LoadingSpinner />;\n  \n  if (!user) {\n    // 로그인 페이지로 리다이렉트\n  }\n  \n  return children;\n}\n```',
    downloads: 2150,
    views: 4920,
    author: '홍길동',
    createdAt: '2023-04-10',
    updatedAt: '2023-04-10',
    password: '1234',
  },
];
