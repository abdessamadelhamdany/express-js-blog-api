import { GetServerSideProps } from 'next';
import { PostProvider } from '@/src/contexts';
import { DashboardLayout } from '@/src/layouts';
import PostForm from '@/src/components/pages/dashboard/posts/PostForm';

export default function NewPost() {
  return (
    <PostProvider>
      <DashboardLayout hasNavbar={false}>
        <PostForm />
      </DashboardLayout>
    </PostProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
