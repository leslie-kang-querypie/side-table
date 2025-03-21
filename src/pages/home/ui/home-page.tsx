'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Layout } from '@/widgets/layout';
import { ResourceGrid } from '@/widgets/resource-grid';
import { ResourceFilter } from '@/features/resource-filter';
import { resources } from '@/entities/resource';

export const HomePage = () => {
  const [filter, setFilter] = useState('all');

  const filteredResources = filter === 'all' ? resources : resources.filter(resource => resource.category === filter);

  return (
    <Layout>
      <PageContainer>
        <Header>
          <Title>리소스 라이브러리</Title>
          <Subtitle>코드와 디자인 리소스를 찾아보세요</Subtitle>
        </Header>

        <ResourceFilter activeFilter={filter} onFilterChange={setFilter} />

        <ResourceGrid resources={filteredResources} />
      </PageContainer>
    </Layout>
  );
};

export default HomePage;

const PageContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #191f28;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #8b95a1;
`;
