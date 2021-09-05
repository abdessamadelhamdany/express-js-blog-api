import styled from 'styled-components';

export const W3EditorWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const EditorWrapper = styled.div`
  flex: 1 1 0%;
  height: 0;
  padding: 16px;
  background-color: white;
`;

export const TitleInput = styled.input.attrs({ type: 'text', placeholder: 'Post title' })`
  width: 100%;
  border: none;
  padding: 20px 16px 34px;
  font-size: ${({ theme }) => theme.font.size.h1.size};
  line-height: ${({ theme }) => theme.font.size.h1.lineHeight};
  font-weight: ${({ theme }) => theme.font.size.h1.weight[700]};
  background-color: ${({ theme }) => theme.color.global.white};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.gray[400]};
  }
`;

export const EditorToolbarWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  z-index: 1000;
  justify-content: center;
  background: ${({ theme }) => theme.color.global.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

export const EditorToolbar = styled.div`
  gap: 4px;
  display: flex;
  padding: 4px;
  align-items: center;
`;

export const ToolbarSeparator = styled.div`
  width: 20px;
`;
