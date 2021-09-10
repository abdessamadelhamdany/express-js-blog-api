import styled from 'styled-components';

interface Props {
  invalid?: boolean;
}

export const FormError = styled.span<Props>`
  margin-top: 4px;
  color: ${({ theme }) => theme.color.others.danger[500]};
  font-size: ${({ theme }) => theme.font.size.xs.size};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  line-height: ${({ theme }) => theme.font.size.xs.lineHeight};

  & {
    visibility: ${({ invalid }) => (invalid ? 'visible' : 'hidden')};
  }
`;
