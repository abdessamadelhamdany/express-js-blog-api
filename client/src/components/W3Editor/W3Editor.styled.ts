import styled from 'styled-components';
import { size } from '@/src/styles/screens';

export const EditorWrapper = styled.div`
  height: 100%;
  display: flex;
  margin: 0 auto;
  max-width: ${size.laptop};
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.global.white};
`;

export const Editor = styled.div`
  font-size: 16px;

  &.ql-container.ql-snow {
    border: none;
  }

  .ql-editor {
    margin: -10px 0;
    padding: 36px 24px;

    &.ql-blank::before {
      left: 24px;
      right: 24px;
    }
  }
`;

export const EditorToolbar = styled.div`
  &.ql-toolbar.ql-snow {
    display: flex;
    column-gap: 20px;
    border: none;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;

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

    .ql-formats {
      margin: 0;
      display: flex;
      column-gap: 14px;
      align-items: center;
      justify-content: center;
    }

    .ql-separator {
      width: 1px;
      height: 22px;
      margin: 0 14px;
      background-color: ${({ theme }) => theme.color.gray[500]};
    }
  }
`;
