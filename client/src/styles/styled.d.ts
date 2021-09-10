import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      family: {
        primary: string;
        heading: string;
      };
      weight: {
        regular: number;
        medium: number;
        bold: number;
      };
      size: {
        h1: { size: string; lineHeight: string; weight: { [key: string]: number } };
        h2: { size: string; lineHeight: string; weight: { [key: string]: number } };
        h3: { size: string; lineHeight: string; weight: { [key: string]: number } };
        h4: { size: string; lineHeight: string; weight: { [key: string]: number } };
        h5: { size: string; lineHeight: string; weight: { [key: string]: number } };
        h6: { size: string; lineHeight: string; weight: { [key: string]: number } };
        sm: { size: string; lineHeight: string; weight: { [key: string]: number } };
        xs: { size: string; lineHeight: string; weight: { [key: string]: number } };
        p: { size: string; lineHeight: string; weight: { [key: string]: number } };
      };
    };
    color: {
      global: {
        white: string;
        opacitiedGray: string;
        opacitiedWhite: string;
      };
      gray: {
        900: string;
        800: string;
        700: string;
        600: string;
        500: string;
        400: string;
        300: string;
        200: string;
        100: string;
      };
      brand: {
        primary: string;
        secondary: string;
        tertiary: string;
        light: string;
      };
      blurredCircle: {
        lightBlue: string;
        NavyBlue: string;
        Purple: string;
      };
      gradients: {
        scrollBackground: string;
      };
      others: {
        success: {
          300: string;
          500: string;
        };
        info: {
          300: string;
          500: string;
        };
        warning: {
          300: string;
          500: string;
        };
        danger: {
          300: string;
          500: string;
        };
      };
    };
    shadow: {
      base: string;
      small: string;
      medium: string;
      large: string;
      xLarge: string;
      xxLarge: string;
    };
  }
}
