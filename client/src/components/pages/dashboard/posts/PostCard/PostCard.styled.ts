import styled from 'styled-components';

export const Wrapper = styled.a`
  display: block;
  border: 1px solid ${({ theme }) => theme.color.gray[200]};
  background-color: ${({ theme }) => theme.color.global.white};
`;

export const CardHeader = styled.div`
  padding-bottom: 8px;
`;

export const CardContent = styled.div``;

export const Title = styled.h3`
  color: ${({ theme }) => theme.color.gray[900]};
  padding: 14px 10px;
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.font.size.sm.size};
  line-height: ${({ theme }) => theme.font.size.sm.lineHeight};
  font-weight: ${({ theme }) => theme.font.size.sm.weight['500']};
`;
