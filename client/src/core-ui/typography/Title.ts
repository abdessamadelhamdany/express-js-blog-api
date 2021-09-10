import styled from 'styled-components';

export const Title = styled.h1`
  margin-bottom: 30px;
  color: ${({ theme }) => theme.color.gray[900]};
  font-size: ${({ theme }) => theme.font.size.h2.size};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: ${({ theme }) => theme.font.size.h2.lineHeight};
`;
