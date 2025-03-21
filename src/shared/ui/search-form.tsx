'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { resources } from '@/entities/resource/model/resources';

interface SearchFormProps {
  onSearchItemClick?: (resourceId: string) => void;
}

export const SearchForm = ({ onSearchItemClick }: SearchFormProps = {}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredResources = resources.filter(
    resource =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSearchItemClick = (resourceId: string) => {
    if (onSearchItemClick) {
      onSearchItemClick(resourceId);
    } else {
      router.push(`/resource/${resourceId}`);
    }
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <SearchContainer ref={searchRef}>
      <FormElement onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="리소스 검색..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            if (e.target.value.trim()) {
              setShowResults(true);
            } else {
              setShowResults(false);
            }
          }}
          onFocus={() => searchQuery.trim() && setShowResults(true)}
        />
        <SearchButton type="submit">
          <Search size={16} />
        </SearchButton>
      </FormElement>

      {showResults && searchQuery.trim() && (
        <SearchResults>
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <SearchResultItem key={resource.id} onClick={() => handleSearchItemClick(resource.id)}>
                <SearchResultCategory type={resource.category}>
                  {resource.category === 'code' ? '코드' : '디자인'}
                </SearchResultCategory>
                <SearchResultTitle>{resource.title}</SearchResultTitle>
              </SearchResultItem>
            ))
          ) : (
            <NoResults>검색 결과가 없습니다</NoResults>
          )}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const FormElement = styled.form`
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 36px 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e8eb;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3182f6;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #8b95a1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #3182f6;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
`;

const SearchResultItem = styled.div`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #f2f4f6;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

const SearchResultCategory = styled.span<{ type: string }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 4px;
  background-color: ${props => (props.type === 'code' ? '#edf5ff' : '#fff0f6')};
  color: ${props => (props.type === 'code' ? '#3182f6' : '#e64980')};
`;

const SearchResultTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #191f28;
`;

const NoResults = styled.div`
  padding: 16px;
  text-align: center;
  color: #8b95a1;
  font-size: 14px;
`;
