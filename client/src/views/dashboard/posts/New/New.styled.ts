import styled from 'styled-components';
import { Input } from '@/src/styles/common/Input';
import { size } from '@/src/styles/screens';

export const Status = styled.span`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-left: 14px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.color.gray[500]};
`;

export const WritingSpace = styled.div`
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  max-width: ${size.laptop};
`;

export const TitleInput = styled.input.attrs({ type: 'text', placeholder: 'Post title' })`
  width: 100%;
  border: none;
  padding: 20px 16px 34px;
  font-size: ${({ theme }) => theme.font.size.h1.size};
  line-height: ${({ theme }) => theme.font.size.h1.lineHeight};
  font-weight: ${({ theme }) => theme.font.size.h1.weight[700]};
  background-color: ${({ theme }) => theme.color.global.white};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.gray[400]};
  }
`;
