import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  background-color: white;
`;

export const NavLink = styled.a`
  display: block;
  padding: 8px 10px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.color.gray[700]};

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  &.active {
    color: ${({ theme }) => theme.color.gray[900]};
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const Action = styled(NavLink)`
  padding: 0 8px;

  svg {
    height: 22px;
  }
`;
