import styled from 'styled-components';
import { Input } from '@/src/styles/common/Input';

export const Wrapper = styled.aside`
  width: 372px;
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.global.white};
  border-left: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

export const Title = styled.h4`
  margin-bottom: 0;
  color: ${({ theme }) => theme.color.gray[700]};
  font-size: ${({ theme }) => theme.font.size.h5.size};
  line-height: ${({ theme }) => theme.font.size.h5.lineHeight};
  font-weight: ${({ theme }) => theme.font.size.h5.weight['500']};
`;

export const SlugInput = styled(Input)`
  padding-right: 52px !important;
`;

export const InputWrapper = styled.div`
  margin-top: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray[200]};
  background-color: ${({ theme }) => theme.color.global.white};

  &.has-toggler {
    position: relative;
    display: flex;
    align-items: center;
  }

  &.full-hight {
    flex-grow: 1;
  }
`;

export const Toggler = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  width: 52px;
  height: 52px;
  background-color: transparent;
  color: ${({ theme }) => theme.color.brand.primary};

  &:hover {
    color: ${({ theme }) => theme.color.brand.secondary};
  }

  &:focus {
    border: none;
  }

  svg {
    height: 18px;
  }
`;
