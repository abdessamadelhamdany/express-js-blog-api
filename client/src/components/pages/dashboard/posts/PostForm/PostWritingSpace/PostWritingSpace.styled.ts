import styled from 'styled-components';
import { size } from '@/src/styles/screens';
import { Input } from '@/src/core-ui/forms';

export const WritingSpace = styled.div`
  width: 100%;
  flex-grow: 1;
  margin: 0 auto;
  padding: 0 20px;
  max-width: ${size.laptopL};
`;

export const TitleInput = styled(Input).attrs({ type: 'text', placeholder: 'Post title', role: 'title' })`
  &[role='title'] {
    width: 100%;
    border: none;
    margin: 0 auto;
    padding: 24px;
    display: block;
    max-width: ${size.laptop};
    font-size: ${({ theme }) => theme.font.size.h2.size};
    line-height: ${({ theme }) => theme.font.size.h2.lineHeight};
    font-weight: ${({ theme }) => theme.font.size.h2.weight[700]};
  }
`;
