import styled, { DefaultTheme } from 'styled-components';

type Variants = 'primary' | 'secondary' | 'info' | 'warn' | 'danger' | 'success';

interface LinkActionAttrs {
  variant?: Variants;
}

interface IconActionAttrs {
  variant?: Variants;
  isActive?: boolean;
}

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkAction = styled.a<LinkActionAttrs>`
  height: 34px;
  padding: 0 14px;
  display: flex;
  cursor: pointer;
  font-size: 15px;
  align-items: center;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme, variant }) => getVariantInfo(theme, variant)};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray[200]};
  }

  svg {
    height: 14px;
  }

  span {
    flex-grow: 1;
    line-height: 1;
    margin-left: 6px;
  }
`;

export const IconAction = styled.button<IconActionAttrs>`
  height: 34px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${({ theme, variant }) => getVariantInfo(theme, variant)};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray[200]};
  }

  svg {
    height: 18px;

    path:last-child {
      fill: ${({ isActive = false }) => (isActive ? 'currentColor' : 'transparent')};
    }
  }
`;

function getVariantInfo(theme: DefaultTheme, variant?: Variants): string {
  return {
    secondary: theme.color.gray[900],
    info: theme.color.others.info[500],
    warn: theme.color.others.warning[500],
    danger: theme.color.others.danger[500],
    success: theme.color.others.success[500],
    primary: theme.color.blurredCircle.lightBlue,
  }[variant || 'primary'];
}

// height: 34px;
//   padding: 0 16px;
//   min-width: 90px;
//   font-weight: 600;

//   &.publish {
//     color: ${({ theme }) => theme.color.others.success[500]};
//     transition: all 150ms;

//     &:hover {
//       color: ${({ theme }) => theme.color.others.success[300]};
//     }

//     &:active {
//       transform: translateY(3px);
//     }
//   }

//   &.draft {
//     color: ${({ theme }) => theme.color.others.info[500]};
//     transition: all 150ms;

//     &:hover {
//       color: ${({ theme }) => theme.color.others.info[300]};
//     }

//     &:active {
//       transform: translateY(3px);
//     }
