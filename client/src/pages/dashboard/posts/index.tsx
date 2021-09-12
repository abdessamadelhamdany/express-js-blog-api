import { GetServerSideProps } from 'next';
import { DashboardLayout } from '@/src/layouts';
import { Post, PostStatus, User } from '@/src/interfaces';
import NavLinks from '@/src/components/pages/dashboard/posts/NavLinks';
import { Main, Container, Header, Section } from '@/src/core-ui/layouts';
import RecentPosts from '@/src/components/pages/dashboard/posts/RecentPosts/RecentPosts';

export type Props = {
  recentPosts: Post[];
};

export default function PostsHome({ recentPosts }: Props) {
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
            <RecentPosts posts={recentPosts} />
          </Container>
        </Section>
      </Main>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
      recentPosts,
    },
  };
};
