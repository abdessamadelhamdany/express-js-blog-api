import styled from 'styled-components';
import { DefaultLayout } from '@/src/layouts/Default';
import { Container } from '@/src/core-ui/layouts';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.color.gray[900]};
`;

export default function Home() {
  return (
    <DefaultLayout>
      <Container>
        <Title>Welcome</Title>
      </Container>
    </DefaultLayout>
  );
}
