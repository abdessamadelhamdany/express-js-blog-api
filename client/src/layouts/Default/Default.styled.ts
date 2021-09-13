import { Container } from '@/src/core-ui/layouts';
import styled from 'styled-components';

export const AppWrapper = styled.div``;

export const Navbar = styled.nav`
  height: 60px;
  column-gap: 16px;
  margin-bottom: 20px;

  ${Container} {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  a {
    margin-right: 16px;
  }
`;
