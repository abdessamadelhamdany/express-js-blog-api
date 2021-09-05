import { DefaultTheme } from 'styled-components';

const defaultTheme: DefaultTheme = {
  font: {
    family: {
      primary: "'DM Sans', sans-serif",
      heading: "'Circular Std', sans-serif",
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    size: {
      h1: { size: '52px', lineHeight: '64px', weight: { 700: 700 } },
      h2: { size: '32px', lineHeight: '40px', weight: { 500: 500, 700: 700 } },
      h3: { size: '28px', lineHeight: '36px', weight: { 700: 700 } },
      h4: { size: '23px', lineHeight: '28px', weight: { 500: 500, 700: 700 } },
      h5: { size: '16px', lineHeight: '30px', weight: { 400: 400, 500: 500 } },
      h6: { size: '14px', lineHeight: '24px', weight: { 400: 400, 500: 500, 700: 700 } },
      p: { size: '12px', lineHeight: '16px', weight: { 400: 400 } },
      sm: { size: '14px', lineHeight: '16px', weight: { 400: 400 } },
    },
  },
  color: {
    global: {
      white: '#ffffff',
      opacitiedGray: 'rgba(161, 164, 165, 0.4)',
      opacitiedWhite: 'rgba(255, 255, 255, 0.32)',
    },
    gray: {
      900: '#1a1c1e',
      800: '#373e44',
      700: '#5d646d',
      600: '#818d99',
      500: '#a6b4bd',
      400: '#b6c4cb',
      300: '#d1dfe3',
      200: '#edf1f2',
      100: '#f9fcfe',
    },
    brand: {
      primary: '#1778f2',
      secondary: '#73bafa',
      tertiary: '#a1d5fd',
      light: '#f4fafe',
    },
    blurredCircle: {
      lightBlue: '#1c77fd',
      NavyBlue: '#4912ff',
      Purple: '#a633ff',
    },
    gradients: {
      scrollBackground: 'linear-gradient(to bottom, rgba(249, 250, 251, 0) 0%, rgba(249, 250, 251, 1) 100%)',
    },
    others: {
      success: {
        300: '#5feca1',
        500: '#07c380',
      },
      info: {
        300: '#bbacff',
        500: '#8978ff',
      },
      warning: {
        300: '#fbd984',
        500: '#f7b136',
      },
      danger: {
        300: '#ff9d86',
        500: '#fe3839',
      },
    },
  },
  shadow: {
    base: '0 4px 12px -4px rgb(26 28 30 / 6%)',
    small: '0 24px 64px -12px rgb(26 28 30 / 4%)',
    medium: '0 6px 32px -4px rgb(26 28 30 / 8%)',
    large: '0 32px 128px -32px rgb(26 28 30 / 8%)',
    xLarge: '0 32px 108px -12px rgb(26 28 30 / 10%)',
    xxLarge: '0 0.5px 1px 0 rgb(26 28 30 / 12%), 0 16px 64px -12px rgb(26 28 30 / 16%)',
  },
};

export default defaultTheme;
