import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Post } from '@/src/interfaces';
import { PostProvider } from '@/src/contexts';
import { DashboardLayout } from '@/src/layouts';
import PostForm from '@/src/components/pages/dashboard/posts/PostForm';

export default function EditPost({ originalPost }: { originalPost: Post }) {
  return (
    <PostProvider>
      <DashboardLayout hasNavbar={false}>
        <PostForm originalPost={originalPost} />
      </DashboardLayout>
    </PostProvider>
  );
}

export const getServerSideProps: GetServerSideProps<{ originalPost: Post }> = async function ({ req, query }) {
  const { data } = await axios.get(`${process.env.APP_URL}/api/posts/${query.id}`);
  return {
    props: {
      originalPost: data.data.post,
    },
  };
};
