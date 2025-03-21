'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/widgets/sidebar';
import { useMobile } from '@/shared/hooks';
import { ThemeProvider } from '@/shared/ui';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMobile();
  const pathname = usePathname();

  // 페이지 변경 시 스크롤을 맨 위로 올립니다
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <ThemeProvider>
      <LayoutContainer>
        {isMobile && (
          <MobileHeader>
            <Logo>리소스 허브</Logo>
            <MenuButton onClick={toggleMobileMenu}>{isMobileMenuOpen ? '✕' : '☰'}</MenuButton>
          </MobileHeader>
        )}

        <Sidebar isOpen={!isMobile || isMobileMenuOpen} isMobile={isMobile} onClose={() => setIsMobileMenuOpen(false)} />

        <MainContent>{children}</MainContent>
      </LayoutContainer>
    </ThemeProvider>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

const MobileHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #3182f6;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #4e5968;
`;
