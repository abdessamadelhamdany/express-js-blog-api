import { GetServerSideProps } from 'next';
import { DashboardLayout } from '@/src/layouts';
import { Post, PostStatus, User } from '@/src/interfaces';
import NavLinks from '@/src/components/pages/dashboard/posts/NavLinks';
import { Main, Container, Header, Section } from '@/src/core-ui/layouts';
import RecentPosts from '@/src/components/pages/dashboard/posts/RecentPosts/RecentPosts';
import { initAuth, Protected } from '@/src/hocs';

export type Props = {
  user: User;
  recentPosts: Post[];
};

export default function PostsHome({ recentPosts, user }: Props) {
  return (
    <Protected user={user}>
      <DashboardLayout>
        <Main>
          <Header>
            <Container>
              <NavLinks />
            </Container>
          </Header>
          <Section>
            <Container>
              <RecentPosts posts={recentPosts} />
            </Container>
          </Section>
        </Main>
      </DashboardLayout>
    </Protected>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, redirect } = await initAuth(context.req.cookies.token);

  if (redirect) {
    return {
      redirect,
    };
  }

  let recentPosts: any[] = require('@/src/assets/dummy/posts.json');

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  recentPosts = recentPosts
    .map((post) => ({
      status: PostStatus.PUBLIC,
      viewCount: getRandomInt(50, 5000),
      updatedAt: new Date().toString(),
      createdAt: new Date().toString(),
      ...post,
    }))
    .slice(0, 4);

  return {
    props: {
      user,
      recentPosts,
    },
  };
};
