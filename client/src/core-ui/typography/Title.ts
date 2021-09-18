import styled from 'styled-components';

interface Attrs {
  marginless: boolean;
}

export const Title = styled.h1<Attrs>`
  color: ${({ theme }) => theme.color.gray[900]};
  font-size: ${({ theme }) => theme.font.size.h2.size};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: ${({ theme }) => theme.font.size.h2.lineHeight};
  margin-bottom: ${({ marginless }) => (marginless ? 0 : '30px')};
`;
