'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Lock } from 'lucide-react';

interface ResourceUnlockProps {
  onUnlock: (isSuccess: boolean) => void;
}

export const ResourceUnlock = ({ onUnlock }: ResourceUnlockProps) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = () => {
    // 실제 앱에서는 백엔드 API를 통해 비밀번호를 검증합니다
    if (password === '1234') {
      onUnlock(true);
      setShowPasswordModal(false);
      setError('');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <LockedContent>
        <LockIcon>
          <Lock size={32} />
        </LockIcon>
        <LockedText>이 콘텐츠는 잠겨 있습니다</LockedText>
        <LockedDescription>전체 내용을 보려면 비밀번호를 입력하세요.</LockedDescription>
        <UnlockButton onClick={() => setShowPasswordModal(true)}>잠금 해제하기</UnlockButton>
      </LockedContent>

      {showPasswordModal && (
        <ModalOverlay>
          <PasswordModal>
            <ModalTitle>비밀번호 입력</ModalTitle>
            <PasswordInput
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ModalButtons>
              <CancelButton onClick={() => setShowPasswordModal(false)}>취소</CancelButton>
              <ConfirmButton onClick={handleUnlock}>확인</ConfirmButton>
            </ModalButtons>
          </PasswordModal>
        </ModalOverlay>
      )}
    </>
  );
};

const LockedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 40px 20px;
  margin: 24px 0;
  text-align: center;
`;

const LockIcon = styled.div`
  color: #8b95a1;
  margin-bottom: 16px;
`;

const LockedText = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #191f28;
  margin-bottom: 8px;
`;

const LockedDescription = styled.p`
  font-size: 14px;
  color: #4e5968;
  margin-bottom: 24px;
`;

const UnlockButton = styled.button`
  background-color: #3182f6;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1c6fdc;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PasswordModal = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #191f28;
  margin-bottom: 24px;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;

  &:focus {
    border-color: #3182f6;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: #e03131;
  font-size: 14px;
  margin-bottom: 16px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled.button`
  background-color: #f2f4f6;
  color: #4e5968;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  background-color: #3182f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
