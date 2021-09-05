import styled from 'styled-components';

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  resize: none;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.color.gray[200]};
  background-color: ${({ theme }) => theme.color.global.white};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.gray[400]};
  }
`;
