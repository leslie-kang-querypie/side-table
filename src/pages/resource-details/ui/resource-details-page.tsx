'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ArrowLeft, Download, Eye, Calendar, Check, Copy } from 'lucide-react';
import { Layout } from '@/widgets/layout';
import { ResourceUnlock } from '@/features/resource-unlock';
import { resources } from '@/entities/resource';
import { format } from 'date-fns';

export const ResourceDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const resourceId = params?.id as string;
  const resource = resources.find(r => r.id === resourceId);

  // 페이지 로드 시 스크롤을 맨 위로 올립니다
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!resource) {
    return (
      <Layout>
        <Container>
          <h1>리소스를 찾을 수 없습니다.</h1>
          <BackButton onClick={() => router.back()}>
            <ArrowLeft size={16} />
            <span>돌아가기</span>
          </BackButton>
        </Container>
      </Layout>
    );
  }

  const handleUnlock = (isSuccess: boolean) => {
    setUnlocked(isSuccess);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 코드 블록을 포함한 콘텐츠 렌더링
  const renderContent = (content: string) => {
    // 코드 블록 패턴 찾기 (\`\`\`로 시작하고 \`\`\`로 끝나는 부분)
    const codeBlockRegex = /```(jsx|tsx|js|ts|html|css)?\n([\s\S]*?)```/g;

    // 콘텐츠를 일반 텍스트와 코드 블록으로 분리
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // 코드 블록 전의 텍스트 추가
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index),
        });
      }

      // 코드 블록 추가
      parts.push({
        type: 'code',
        language: match[1] || 'jsx',
        content: match[2],
      });

      lastIndex = match.index + match[0].length;
    }

    // 마지막 코드 블록 이후의 텍스트 추가
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex),
      });
    }

    return parts.map((part, index) => {
      if (part.type === 'text') {
        return <ContentText key={index}>{part.content}</ContentText>;
      } else {
        return (
          <CodeBlock key={index}>
            <CodeHeader>
              <CodeLanguage>{part.language}</CodeLanguage>
              <CopyButton onClick={() => handleCopyCode(part.content)}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? '복사됨' : '복사'}</span>
              </CopyButton>
            </CodeHeader>
            <CodeContent>{part.content}</CodeContent>
          </CodeBlock>
        );
      }
    });
  };

  return (
    <Layout>
      <Container>
        <BackButton onClick={() => router.back()}>
          <ArrowLeft size={16} />
          <span>돌아가기</span>
        </BackButton>

        <Header>
          <CategoryBadge type={resource.category}>{resource.category === 'code' ? '코드' : '디자인'}</CategoryBadge>
          <Title>{resource.title}</Title>

          <MetaInfo>
            <DateInfo>
              <Calendar size={14} />
              <span>{format(new Date(resource.createdAt), 'yyyy년 MM월 dd일')} 수정</span>
            </DateInfo>
            <StatsContainer>
              <Stat>
                <Eye size={16} />
                <span>{resource.views}</span>
              </Stat>
              <Stat>
                <Download size={16} />
                <span>{resource.downloads}</span>
              </Stat>
            </StatsContainer>
          </MetaInfo>
        </Header>

        <ImageContainer>
          <ResourceImage src={resource.thumbnail || '/placeholder.svg'} alt={resource.title} />
        </ImageContainer>

        <ContentSection>
          <SectionTitle>설명</SectionTitle>
          <Description>{resource.description}</Description>

          <SectionTitle>미리보기</SectionTitle>
          <PreviewContent>{resource.preview}</PreviewContent>

          {!unlocked ? (
            <ResourceUnlock onUnlock={handleUnlock} />
          ) : (
            <FullContent>
              <SectionTitle>전체 내용</SectionTitle>
              <ContentWrapper>{renderContent(resource.fullContent)}</ContentWrapper>

              <DownloadSection>
                <DownloadButton>
                  <Download size={18} />
                  <span>다운로드</span>
                </DownloadButton>
              </DownloadSection>
            </FullContent>
          )}
        </ContentSection>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #4e5968;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 24px;
  padding: 8px 0;

  &:hover {
    color: #3182f6;
  }
`;

const Header = styled.header`
  margin-bottom: 24px;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #8b95a1;
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

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #191f28;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #8b95a1;
  font-size: 14px;
`;

const ImageContainer = styled.div`
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
`;

const ResourceImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
`;

const ContentSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #191f28;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #4e5968;
  margin-bottom: 24px;
`;

const PreviewContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #4e5968;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px dashed #e5e8eb;
`;

const FullContent = styled.div`
  margin-top: 24px;
`;

const ContentWrapper = styled.div`
  margin-bottom: 32px;
`;
const ContentText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #4e5968;
  margin-bottom: 16px;
  white-space: pre-wrap;
`;

const CodeBlock = styled.div`
  margin: 24px 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e8eb;
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e8eb;
`;

const CodeLanguage = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #8b95a1;
  text-transform: uppercase;
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  font-size: 12px;
  color: #4e5968;
  cursor: pointer;

  &:hover {
    color: #3182f6;
  }
`;

const CodeContent = styled.pre`
  padding: 16px;
  background-color: #f2f4f6;
  overflow-x: auto;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #191f28;
  white-space: pre-wrap;
`;

const DownloadSection = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #3182f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1c64f2;
  }
`;

// 기본 내보내기 추가
export default ResourceDetailsPage;
