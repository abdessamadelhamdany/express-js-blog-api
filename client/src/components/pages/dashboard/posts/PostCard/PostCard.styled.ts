import styled from 'styled-components';

export const Wrapper = styled.a`
  display: block;
  border: 1px solid ${({ theme }) => theme.color.gray[200]};
  background-color: ${({ theme }) => theme.color.global.white};
`;

export const CardHeader = styled.div`
  padding-bottom: 8px;
`;

export const CardContent = styled.div`
  padding-top: 14px;
`;

export const Title = styled.h3`
  padding: 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray[900]};
`;
