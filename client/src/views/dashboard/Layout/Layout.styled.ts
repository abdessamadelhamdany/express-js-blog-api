import { size } from '@/src/styles/screens';
import styled from 'styled-components';

export const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  max-width: ${size.laptopL};
`;

export const ContainerFluid = styled.div`
  width: 100%;
  padding: 0 20px;
`;

export const Header = styled.header<{ p?: string; bgColor?: string }>`
  position: sticky;
  top: 0;
  padding: ${({ p = '16px 0' }) => p};
  background-color: ${({ bgColor = '#ffffff' }) => bgColor};
  z-index: 1000;
`;

export const Title = styled.h2`
  flex-grow: 1;
  margin-bottom: 0;
`;

export const Section = styled.section<{ canGrow?: boolean }>`
  padding: 16px 0;
  ${({ canGrow = false }) => (canGrow ? 'flex-grow: 1;' : '')}
`;
