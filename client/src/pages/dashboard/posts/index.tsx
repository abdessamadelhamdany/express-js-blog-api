import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Post } from '@/src/interfaces';
import { DashboardLayout } from '@/src/layouts';
import NavLinks from '@/src/components/pages/dashboard/posts/NavLinks';
import { Main, Container, Header, Section } from '@/src/core-ui/layouts';
import PostsList from '@/src/components/pages/dashboard/posts/PostsList/PostsList';

export type Props = {
  posts: Post[];
};

export default function PostsHome({ posts }: Props) {
  return (
    <DashboardLayout>
      <Main>
        <Header>
          <Container>
            <NavLinks />
          </Container>
        </Header>
        <Section>
          <Container>
            <PostsList title="Published Post" posts={posts} />
          </Container>
        </Section>
      </Main>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await axios.get(`${process.env.APP_URL}/api/posts`, {});

  return {
    props: {
      posts: data.data.posts,
    },
  };
};
