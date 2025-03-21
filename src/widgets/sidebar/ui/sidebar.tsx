'use client';

import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { Home, Grid, Star, User, Settings, X } from 'lucide-react';
import { SearchForm } from '@/shared/ui';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, isMobile, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearchItemClick = (resourceId: string) => {
    if (isMobile) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <SidebarContainer $isOpen={isOpen} $isMobile={isMobile}>
      <SidebarHeader>
        <SidebarLogo>리소스 허브</SidebarLogo>
        {isMobile && (
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        )}
      </SidebarHeader>

      <SearchContainer>
        <SearchForm onSearchItemClick={handleSearchItemClick} />
      </SearchContainer>

      <NavSection>
        <SectionTitle>메뉴</SectionTitle>
        <NavList>
          <NavItem>
            <NavLink href="/" $active={isActive('/')} onClick={isMobile ? onClose : undefined}>
              <Home size={18} />
              <NavText>홈</NavText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/explore" $active={isActive('/explore')} onClick={isMobile ? onClose : undefined}>
              <Grid size={18} />
              <NavText>탐색</NavText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/favorites" $active={isActive('/favorites')} onClick={isMobile ? onClose : undefined}>
              <Star size={18} />
              <NavText>즐겨찾기</NavText>
            </NavLink>
          </NavItem>
        </NavList>
      </NavSection>

      <NavSection>
        <SectionTitle>계정</SectionTitle>
        <NavList>
          <NavItem>
            <NavLink href="/profile" $active={isActive('/profile')} onClick={isMobile ? onClose : undefined}>
              <User size={18} />
              <NavText>프로필</NavText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/settings" $active={isActive('/settings')} onClick={isMobile ? onClose : undefined}>
              <Settings size={18} />
              <NavText>설정</NavText>
            </NavLink>
          </NavItem>
        </NavList>
      </NavSection>

      <SidebarFooter>
        <FooterText>© 2023 리소스 허브</FooterText>
      </SidebarFooter>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.aside<{ $isOpen: boolean; $isMobile: boolean }>`
  width: 240px;
  background-color: white;
  border-right: 1px solid #e5e8eb;
  height: 100vh;
  position: ${props => (props.$isMobile ? 'fixed' : 'sticky')};
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  transform: translateX(${props => (props.$isOpen ? '0' : '-100%')});
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #e5e8eb;
`;

const SidebarLogo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #3182f6;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #4e5968;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  padding: 16px;
  position: relative;
`;

const NavSection = styled.div`
  padding: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  text-transform: uppercase;
  color: #8b95a1;
  margin-bottom: 12px;
  font-weight: 500;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 4px;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${props => (props.$active ? '500' : '400')};
  color: ${props => (props.$active ? '#3182f6' : '#4e5968')};
  background-color: ${props => (props.$active ? '#edf5ff' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: ${props => (props.$active ? '#edf5ff' : '#f2f4f6')};
  }
`;

const NavText = styled.span``;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 16px;
  border-top: 1px solid #e5e8eb;
`;

const FooterText = styled.p`
  font-size: 12px;
  color: #8b95a1;
  text-align: center;
`;
