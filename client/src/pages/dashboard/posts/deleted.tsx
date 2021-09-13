import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Post } from '@/src/interfaces';
import { PostProvider } from '@/src/contexts';
import { DashboardLayout } from '@/src/layouts';
import NavLinks from '@/src/components/pages/dashboard/posts/NavLinks';
import { Main, Container, Header, Section } from '@/src/core-ui/layouts';
import PostsList from '@/src/components/pages/dashboard/posts/PostsList/PostsList';

export type Props = {
  posts: Post[];
};

export default function PostsDeleted({ posts }: Props) {
  return (
    <PostProvider>
      <DashboardLayout>
        <Main>
          <Header>
            <Container>
              <NavLinks />
            </Container>
          </Header>
          <Section>
            <Container>
              <PostsList title="Deleted Post" posts={posts} />
            </Container>
          </Section>
        </Main>
      </DashboardLayout>
    </PostProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let posts: Post[] = [];

  try {
    const { data } = await axios.get(`${process.env.APP_URL}/api/posts/deleted`, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });
    posts = data.data.posts;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return {
        redirect: {
          destination: '/dashboard/posts',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      posts,
    },
  };
};
