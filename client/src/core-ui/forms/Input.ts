import styled from 'styled-components';

export const Input = styled.input`
  padding: 11px;
  font-size: ${({ theme }) => theme.font.size.p.size};
  line-height: ${({ theme }) => theme.font.size.p.lineHeight};
  border: 1px solid ${({ theme }) => theme.color.gray[700]};
  background-color: ${({ theme }) => theme.color.global.white};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.brand.primary};
  }
`;
