import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Circular Std';
    src: url(/assets/fonts/Circular-Std/Circular-Std-Regular.ttf);
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Circular Std';
    src: url(/assets/fonts/Circular-Std/Circular-Std-Medium.ttf);
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Circular Std';
    src: url(/assets/fonts/Circular-Std/Circular-Std-Bold.ttf);
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
  }
  
  /** Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.gray[200]};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.gray[400]};
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color.gray[600]};
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${({ theme }) => theme.font.family.primary};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6{
    margin: 0 0 .3em;
    font-family: ${({ theme }) => theme.font.family.heading};
    text-rendering: optimizeLegibility;
  }

  h1 {
    font-size: ${({ theme }) => theme.font.size.h1.size};
    line-height: ${({ theme }) => theme.font.size.h1.lineHeight};
    font-weight: ${({ theme }) => theme.font.size.h1.weight['700']};
  }

  h2 {
    font-size: ${({ theme }) => theme.font.size.h2.size};
    line-height: ${({ theme }) => theme.font.size.h2.lineHeight};
    font-weight: ${({ theme }) => theme.font.size.h2.weight['700']};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.font.size.h3.size};
    line-height: ${({ theme }) => theme.font.size.h3.lineHeight};
    font-weight: ${({ theme }) => theme.font.size.h3.weight['700']};
  }
 
  h4 {
    font-size: ${({ theme }) => theme.font.size.h4.size};
    line-height: ${({ theme }) => theme.font.size.h4.lineHeight};
    font-weight: ${({ theme }) => theme.font.size.h4.weight['700']};
  }
  
  h5 {
    font-size: ${({ theme }) => theme.font.size.h5.size};
    line-height: ${({ theme }) => theme.font.size.h5.lineHeight};
    font-weight: ${({ theme }) => theme.font.size.h5.weight['500']};
  }
  
  h6 {
    font-size: ${({ theme }) => theme.font.size.h6.size};
    line-height: ${({ theme }) => theme.font.size.h6.lineHeight};
    font-weight: ${({ theme }) => theme.font.size.h6.weight['500']};
  }

  a {
    text-decoration: none;
  }

  button {
    border: 1px solid transparent;
  }

  /** Forms */
  input[type=text],
  input[type=email],
  textarea{
    font-family: ${({ theme }) => theme.font.family.primary};
  }
`;

export default GlobalStyle;
