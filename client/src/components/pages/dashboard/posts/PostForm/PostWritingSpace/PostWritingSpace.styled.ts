import styled from 'styled-components';
import { size } from '@/src/styles/screens';
import { FormError, Input } from '@/src/core-ui/forms';

export const WritingSpace = styled.div`
  width: 100%;
  flex-grow: 1;
`;

export const TitleInputWrapper = styled.div`
  width: 100%;
  margin: 0 auto 1rem;
  background-color: ${({ theme }) => theme.color.global.white};
  max-width: ${size.laptop};

  ${FormError} {
    display: block;
    margin: 0 auto;
    max-width: ${size.tablet};
  }
`;

export const TitleInput = styled(Input).attrs({ type: 'text', placeholder: 'Post title', role: 'title' })`
  &[role='title'] {
    width: 100%;
    border: none;
    margin: 0 auto;
    padding: 1rem;
    display: block;
    max-width: ${size.tablet};
    font-size: ${({ theme }) => theme.font.size.h2.size};
    line-height: ${({ theme }) => theme.font.size.h2.lineHeight};
    font-weight: ${({ theme }) => theme.font.size.h2.weight[700]};
  }
`;
