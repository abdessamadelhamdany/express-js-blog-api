import styled from 'styled-components';

export const ToolbarButton = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
  border: 1px solid ${({ theme }) => theme.color.gray[300]};

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.gray[500]};
  }

  &:hover,
  &.active {
    svg {
      fill: ${({ theme }) => theme.color.gray[900]};
    }
  }

  svg {
    width: 24px;
    height: 24px;
    transition: all 0.3s;
    fill: ${({ theme }) => theme.color.gray[500]};
  }
`;
