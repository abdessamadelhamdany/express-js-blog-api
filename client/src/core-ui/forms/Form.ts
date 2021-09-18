import styled, { css } from 'styled-components';

interface Props {
  variant?: 'full' | 'middle';
}

const variantStyles = {
  full: css`
    & {
      width: 100%;
    }
  `,
  middle: css`
    & {
      margin: 0 auto;
      max-width: 720px;
    }
  `,
};

export const Form = styled.form<Props>`
  width: 100%;
  padding: 14px;
  ${({ variant }) => variantStyles[variant || 'all']}
`;
