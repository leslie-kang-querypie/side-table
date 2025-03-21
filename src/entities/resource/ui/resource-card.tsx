'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Download, Star, Eye } from 'lucide-react';
import type { Resource } from '../model/types';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    router.push(`/resource/${resource.id}`);
  };

  return (
    <CardContainer
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardImage src={resource.thumbnail} alt={resource.title} />

      <CardContent>
        <CategoryBadge type={resource.category}>{resource.category === 'code' ? '코드' : '디자인'}</CategoryBadge>
        <CardTitle>{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardContent>

      <CardFooter>
        <CardStat>
          <Eye size={14} />
          <span>{resource.views}</span>
        </CardStat>
        <CardStat>
          <Download size={14} />
          <span>{resource.downloads}</span>
        </CardStat>
      </CardFooter>

      {isHovered && <ViewButton>자세히 보기</ViewButton>}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
  flex-grow: 1;
`;

const CategoryBadge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  background-color: ${props => (props.type === 'code' ? '#edf5ff' : '#fff0f6')};
  color: ${props => (props.type === 'code' ? '#3182f6' : '#e64980')};
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #191f28;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #4e5968;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid #f2f4f6;
  gap: 16px;
`;

const CardStat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #8b95a1;
`;

const ViewButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #3182f6;
  color: white;
  text-align: center;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
`;
