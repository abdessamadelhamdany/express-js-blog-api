import styled from 'styled-components';
import { IconAction } from '@/src/core-ui/actions';

export const MediaLibraryModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem 5rem;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 9999;
`;

export const MediaLibraryModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const MediaLibraryModalClose = styled(IconAction).attrs({ variant: 'secondary' })`
  width: 34px;
  padding: 0;
`;

export const MediaLibraryModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-height: 100%;
  max-width: 58rem;
  background-color: white;
`;

export const MediaLibraryModalTabs = styled.div`
  display: flex;
  padding: 14px 1rem;
  align-items: center;
  background-color: white;
`;

export const MediaLibraryModalTab = styled.button`
  border: none;
  padding: 0.68rem 1.15rem;
  border-bottom: 1px solid transparent;
  background-color: transparent;

  &.active {
    background-color: ${({ theme }) => theme.color.gray[200]};
    border-bottom-color: ${({ theme }) => theme.color.gray[300]};
  }
`;

export const UploadMediaFormWrapper = styled.div``;

export const MediaFilesWrapper = styled.div`
  flex-grow: 1;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;
