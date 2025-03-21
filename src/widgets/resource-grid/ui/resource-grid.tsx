'use client';

import styled from 'styled-components';
import { ResourceCard } from '@/entities/resource';
import type { Resource } from '@/entities/resource';

interface ResourceGridProps {
  resources: Resource[];
}

export const ResourceGrid = ({ resources }: ResourceGridProps) => {
  return (
    <GridContainer>
      {resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
