import styled from 'styled-components';

export const Wrapper = styled.nav`
  width: 220px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

export const Header = styled.header`
  width: 100%;

  a {
    display: block;
    line-height: 0;
    padding: 18px;

    svg {
      height: 20px;
    }
  }
`;

export const Section = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Menu = styled.div`
  flex-grow: 1;
`;

export const MenuItem = styled.a`
  padding: 10px 14px;
  display: block;
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.color.gray[700]};
  font-weight: ${({ theme }) => theme.font.weight.medium};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray[200]};
  }

  &.active {
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.color.gray[900]};
  }
`;

export const MenuItemContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  svg {
    height: 20px;
  }

  span {
    flex-grow: 1;
    line-height: 1;
    margin-left: 8px;
  }
`;

export const Footer = styled.footer`
  padding: 20px 0 40px;
`;
