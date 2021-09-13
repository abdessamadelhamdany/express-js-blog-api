import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

export const Dropdown = styled.div`
  z-index: 30;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 8px 0;
  margin-top: 14px;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0 0 14px -4px rgba(0, 0, 0, 0.08);
`;

export const DropdownMenu = styled.div``;

export const DropdownMenuItem = styled.a`
  display: block;
  color: ${({ theme }) => theme.color.gray[500]};
  font-size: 14px;
  font-weight: 500;
  transition: color 150ms;
  padding: 8px 20px 8px 14px;

  &:hover {
    color: ${({ theme }) => theme.color.gray[900]};
  }
`;

export const DropdownMenuItemContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  svg {
    height: 18px;
  }

  span {
    flex: 1 1 0%;
    line-height: 1;
    margin-left: 4px;
  }
`;

export const DropdownMenuDevider = styled.div`
  height: 7px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  &::after {
    width: calc(100% - 20px);
    height: 1px;
    content: '';
    display: block;
    position: absolute;
    background-color: ${({ theme }) => theme.color.gray[300]};
  }
`;
