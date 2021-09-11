import styled from 'styled-components';
import { screens } from '@/src/styles/screens';

export const Wrapper = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.global.white};
`;
/* box-shadow: ${({ theme: { boxShadow } }) => boxShadow.shadow1}; */

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.color.gray[900]};
`;

export const WrapperContent = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;

  @media ${screens.tablet} {
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${screens.laptop} {
    grid-gap: 24px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${screens.laptopL} {
    grid-gap: 30px;
    grid-template-columns: repeat(4, 1fr);
  }
`;
