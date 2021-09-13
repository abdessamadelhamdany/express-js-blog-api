import styled from 'styled-components';
import { size } from '@/src/styles/screens';

export const Editor = styled.div`
  margin: 0 auto;
  font-size: 16px;
  max-width: ${size.laptop};
  background-color: ${({ theme }) => theme.color.global.white};

  .ql-editor {
    padding: 20px 16px;
  }
`;
