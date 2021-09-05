import styled from 'styled-components';

interface Attrs {
  items?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

export const Flex = styled.div<Attrs>`
  display: flex;
  ${({ items }) => (items ? `align-items: ${items};` : '')}
  ${({ justify }) => (justify ? `justify-content: ${justify};` : '')}
`;
