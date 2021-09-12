import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { Container } from '@/src/core-ui/layouts';
import { DefaultLayout } from '@/src/layouts/Default';

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

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
