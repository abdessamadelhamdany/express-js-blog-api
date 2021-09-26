import { getVariantInfo } from '@/src/lib/helpers';
import { screens } from '@/src/styles/screens';
import styled from 'styled-components';

export const MediaFiles = styled.div`
  gap: 1rem;
  padding: 6px;
  display: grid;
  grid-template-columns: 1fr;

  @media ${screens.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${screens.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${screens.laptopL} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const MediaFile = styled.div`
  width: 100%;
  height: 100%;
  row-gap: 5px;
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  background-color: #ffffff;
`;

export const MediaFileDetail = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
`;

export const MediaFileTitle = styled.h5`
  flex-grow: 1;
  word-break: break-all;
  margin-bottom: 0;
  text-transform: capitalize;
  font-size: ${({ theme }) => theme.font.size.h6.size};
  font-weight: ${({ theme }) => theme.font.size.h6.weight[500]};
  line-height: ${({ theme }) => theme.font.size.sm.lineHeight};
`;

export const MediaFileSize = styled.div`
  white-space: nowrap;
  font-size: ${({ theme }) => theme.font.size.sm.size};
  line-height: ${({ theme }) => theme.font.size.h5.lineHeight};
  color: ${({ theme }) => theme.color.gray[600]};
`;

export const MediaFileActions = styled.div`
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: end;
`;

type Variants = 'primary' | 'secondary' | 'info' | 'warn' | 'danger' | 'success';

export const MediaFileAction = styled.button<{ variant?: Variants }>`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  column-gap: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: transparent;
  color: ${({ theme, variant }) => getVariantInfo(theme, variant)};
  font-size: ${({ theme }) => theme.font.size.sm.size};
  line-height: ${({ theme }) => theme.font.size.h5.lineHeight};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray[200]};
  }

  svg {
    height: 17px;
  }
`;
