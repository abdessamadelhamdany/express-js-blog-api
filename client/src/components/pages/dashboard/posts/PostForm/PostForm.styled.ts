import styled from 'styled-components';

export const Status = styled.span`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-left: 14px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.color.gray[500]};
`;
