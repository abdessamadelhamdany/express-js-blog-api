import fileSize from 'filesize';
import npmSlugify from 'slugify';
import { DefaultTheme } from 'styled-components';
import { Variants } from '../interfaces';

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const copyToClipboard = (str: string): void => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const slugify = (str: string): string => {
  return npmSlugify(str, { lower: true, strict: true });
};

export const readableFileSize = (size?: number): string => {
  return fileSize(size || 0);
};

/** Styled components helpets */
export function getVariantInfo(theme: DefaultTheme, variant?: Variants): string {
  return {
    secondary: theme.color.gray[900],
    info: theme.color.others.info[500],
    warn: theme.color.others.warning[500],
    danger: theme.color.others.danger[500],
    success: theme.color.others.success[500],
    primary: theme.color.blurredCircle.lightBlue,
  }[variant || 'primary'];
}

export const extractThemeColor = (theme: DefaultTheme, bgColor?: string) => {
  if (!bgColor) {
    return '';
  }

  const colorPath = bgColor.split('.');
  if (colorPath.length === 1) {
    return bgColor;
  }

  let color: any = theme['color'];
  colorPath.forEach((path) => {
    if (path === 'color') {
      return;
    }

    color = color[path];
  });

  return color;
};
