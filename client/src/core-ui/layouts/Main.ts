import styled from 'styled-components';
import { extractThemeColor } from '@/src/lib/helpers';

export const Main = styled.main<{ bgColor?: string }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  ${({ theme, bgColor }) => `background-color: ${extractThemeColor(theme, bgColor)};`}
`;

export const Header = styled.header<{ p?: string; bgColor?: string }>`
  position: sticky;
  top: 0;
  padding: ${({ p = '16px 0' }) => p};
  ${({ theme, bgColor = '#ffffff' }) => `background-color: ${extractThemeColor(theme, bgColor)};`}
  z-index: 1000;
`;

export const Title = styled.h2`
  flex-grow: 1;
  margin-bottom: 0;
`;

export const Section = styled.section<{ canGrow?: boolean; bgColor?: string }>`
  padding: 16px 0;
  ${({ canGrow = false }) => (canGrow ? 'flex-grow: 1;' : '')}
  ${({ theme, bgColor }) => `background-color: ${extractThemeColor(theme, bgColor)};`}
`;
