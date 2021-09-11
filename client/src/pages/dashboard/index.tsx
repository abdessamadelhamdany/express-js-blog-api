import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { User } from '@/src/interfaces';
import { initAuth, Protected } from '@/src/hocs';
import { Title } from '@/src/styles/pages/dashboard';
import { Layout, Main } from '@/src/views/dashboard/Layout';
import { Suggestions } from '@/src/components/pages/dashboard/widgets';

interface Props {
  user: User;
}

const Home: FC<Props> = ({ user }) => {
  return (
    <Protected user={user}>
      <Layout>
        <Main>
          <Title>User Email: {user.email}</Title>
          <div>
            <Title>Suggestions</Title>
            <Suggestions />
          </div>
        </Main>
      </Layout>
    </Protected>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { user, redirect } = await initAuth(context.req.cookies.token);

  if (redirect) {
    return {
      redirect,
    };
  }

  return {
    props: { user },
  };
};
