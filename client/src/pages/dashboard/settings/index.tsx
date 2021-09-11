import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { User } from '@/src/interfaces';
import { Main } from '@/src/core-ui/layouts';
import { initAuth, Protected } from '@/src/hocs';
import { DashboardLayout } from '@/src/layouts';

export const Title = styled.h1`
  font-size: 50px;
`;

export default function SettingsHome({ user }: { user: User }) {
  return (
    <Protected user={user}>
      <DashboardLayout>
        <Main>
          <Title>SettingsHome</Title>
        </Main>
      </DashboardLayout>
    </Protected>
  );
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { user, redirect } = await initAuth(context.req.cookies.token);

  return redirect
    ? {
        redirect,
      }
    : {
        props: { user },
      };
};
