'use client';

import styled from 'styled-components';

interface ResourceFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const ResourceFilter = ({ activeFilter, onFilterChange }: ResourceFilterProps) => {
  return (
    <FilterContainer>
      <FilterButton
        className={activeFilter === 'all' ? 'active' : ''}
        data-active={activeFilter === 'all'}
        onClick={() => onFilterChange('all')}
      >
        전체
      </FilterButton>
      <FilterButton
        className={activeFilter === 'code' ? 'active' : ''}
        data-active={activeFilter === 'code'}
        onClick={() => onFilterChange('code')}
      >
        코드
      </FilterButton>
      <FilterButton
        className={activeFilter === 'design' ? 'active' : ''}
        data-active={activeFilter === 'design'}
        onClick={() => onFilterChange('design')}
      >
        디자인
      </FilterButton>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f2f4f6;
  color: #4e5968;
  border: none;

  &.active,
  &[data-active='true'] {
    background-color: #3182f6;
    color: white;
  }

  &:hover {
    background-color: ${props => (props.className === 'active' ? '#3182f6' : '#e5e8eb')};
  }
`;
