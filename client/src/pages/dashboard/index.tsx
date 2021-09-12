import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { Main } from '@/src/core-ui/layouts';
import { DashboardLayout } from '@/src/layouts';
import { Title } from '@/src/styles/pages/dashboard';
import { Suggestions } from '@/src/components/pages/dashboard/widgets';
import { useAuth } from '@/src/hooks';

const Dashboard: FC = () => {
  const { authUser } = useAuth();
  return (
    <DashboardLayout>
      <Main>
        <Title>User Email: {authUser?.email}</Title>
        <div>
          <Title>Suggestions</Title>
          <Suggestions />
        </div>
      </Main>
    </DashboardLayout>
  );
};
export default Dashboard;

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
