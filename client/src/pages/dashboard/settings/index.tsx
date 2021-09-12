import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { Main } from '@/src/core-ui/layouts';
import { DashboardLayout } from '@/src/layouts';

export const Title = styled.h1`
  font-size: 50px;
`;

export default function Settings() {
  return (
    <DashboardLayout>
      <Main>
        <Title>Settings</Title>
      </Main>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
