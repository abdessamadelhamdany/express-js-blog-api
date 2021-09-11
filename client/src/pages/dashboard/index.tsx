import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { User } from '@/src/interfaces';
import { Main } from '@/src/core-ui/layouts';
import { DashboardLayout } from '@/src/layouts';
import { initAuth, Protected } from '@/src/hocs';
import { Title } from '@/src/styles/pages/dashboard';
import { Suggestions } from '@/src/components/pages/dashboard/widgets';

interface Props {
  user: User;
}

const Home: FC<Props> = ({ user }) => {
  return (
    <Protected user={user}>
      <DashboardLayout>
        <Main>
          <Title>User Email: {user.email}</Title>
          <div>
            <Title>Suggestions</Title>
            <Suggestions />
          </div>
        </Main>
      </DashboardLayout>
    </Protected>
  );
};
export default Home;

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
