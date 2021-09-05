import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 16px;
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
