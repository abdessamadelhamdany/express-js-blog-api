import styled from 'styled-components';

export const Label = styled.label`
  margin-bottom: 7px;
  color: ${({ theme }) => theme.color.gray[900]};
  font-size: ${({ theme }) => theme.font.size.p.size};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: ${({ theme }) => theme.font.size.p.lineHeight};
`;
