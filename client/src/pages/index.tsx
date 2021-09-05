import styled from 'styled-components';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.color.gray[900]};
`;

export default function Home() {
  return <Title>Welcome</Title>;
}
