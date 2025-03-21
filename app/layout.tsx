import '@/shared/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '리소스 라이브러리',
  description: '코드와 디자인 리소스를 찾아보세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
