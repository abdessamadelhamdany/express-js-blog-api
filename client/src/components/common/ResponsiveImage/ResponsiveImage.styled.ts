import styled from 'styled-components';

export const ResponsiveImageWrapper = styled.div<{ aspectRatio?: string }>`
  width: 100%;
  position: relative;
  aspect-ratio: ${({ aspectRatio = '5/3.5' }) => aspectRatio};
`;

// export const ResponsiveImageWrapper = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   padding-top: 50%;
// `;
