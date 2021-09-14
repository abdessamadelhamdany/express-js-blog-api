import { GetServerSideProps } from 'next';
import { Main } from '@/src/core-ui/layouts';
import { DashboardLayout } from '@/src/layouts';

export default function MediaLibrary() {
  return (
    <DashboardLayout>
      <Main>
        <h2>Media library</h2>
      </Main>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
