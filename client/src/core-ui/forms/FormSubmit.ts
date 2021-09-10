import styled from 'styled-components';

export const FormSubmit = styled.button.attrs({ type: 'submit' })`
  padding: 11px 14px;
  min-width: 120px;
  font-size: ${({ theme }) => theme.font.size.sm.size};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  line-height: ${({ theme }) => theme.font.size.sm.lineHeight};
  border: 1px solid ${({ theme }) => theme.color.gray[700]};
  color: ${({ theme }) => theme.color.gray[900]};
  background-color: ${({ theme }) => theme.color.global.white};
  transition: all 100ms;

  &:hover {
    color: ${({ theme }) => theme.color.global.white};
    background-color: ${({ theme }) => theme.color.gray[900]};
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.brand.primary};
  }
`;
