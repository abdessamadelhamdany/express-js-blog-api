import styled from 'styled-components';

interface Props {
  invalid?: boolean;
}

export const Input = styled.input<Props>`
  padding: 11px;
  font-size: ${({ theme }) => theme.font.size.p.size};
  line-height: ${({ theme }) => theme.font.size.p.lineHeight};
  border: 1px solid ${({ invalid, theme }) => (invalid ? theme.color.others.danger[500] : theme.color.gray[700])};
  background-color: ${({ theme }) => theme.color.global.white};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.brand.primary};
  }
`;
