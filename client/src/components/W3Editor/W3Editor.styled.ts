import styled from 'styled-components';
import { size } from '@/src/styles/screens';

export const EditorWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  max-width: ${size.laptop};
  background-color: ${({ theme }) => theme.color.global.white};
`;

export const EditorToolbar = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 50%;
  transform: translateY(50%);
  background: white;
  z-index: 10;

  &.ql-toolbar.ql-snow {
    display: flex;
    column-gap: 20px;
    border: ${({ theme }) => theme.color.gray[400]};
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 24px 12px;

    button {
      width: auto;
      height: 34px;
      padding: 0;
      display: flex;
      align-items: center;

      svg {
        height: 18px;

        .ql-stroke {
          stroke: ${({ theme }) => theme.color.gray[500]};
        }

        .ql-fill,
        .ql-stroke.ql-fill {
          fill: ${({ theme }) => theme.color.gray[500]};
        }
      }

      &:hover {
        svg {
          .ql-stroke {
            stroke: ${({ theme }) => theme.color.gray[700]};
          }

          .ql-fill,
          .ql-stroke.ql-fill {
            fill: ${({ theme }) => theme.color.gray[700]};
          }
        }
      }
    }

    .ql-picker-label {
      color: ${({ theme }) => theme.color.gray[500]};
      font-weight: ${({ theme }) => theme.font.weight.bold};

      &:hover {
        color: ${({ theme }) => theme.color.gray[700]};
      }
    }

    .ql-formats {
      margin: 0;
      display: flex;
      column-gap: 14px;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }

    .ql-picker.ql-header {
      width: 34px;
      svg {
        display: none;
      }
    }

    .ql-separator {
      width: 1px;
      height: 22px;
      margin: 0 14px;
      background-color: ${({ theme }) => theme.color.gray[500]};
    }
  }
`;

export const Editor = styled.div`
  flex-grow: 1;
  font-size: 16px;
  width: 100%;
  margin: 0 auto;
  max-width: ${size.tablet};

  &.ql-container.ql-snow {
    border: none;

    img {
      height: 480px;
      max-width: ${size.tablet};
      margin: 0 auto 1.5rem;
      display: block;
      object-fit: cover;
      object-position: center;
    }

    iframe {
      width: 100%;
      height: 420px;
      margin: 0 auto;
      max-width: ${size.tablet};
    }
  }

  .ql-editor {
    height: 100%;
    padding: 2rem 1rem 14rem;

    &.ql-blank::before {
      left: 1rem;
      right: 1rem;
    }
  }
`;
