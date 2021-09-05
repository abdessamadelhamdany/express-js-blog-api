import { RecentPosts } from '.';
import { Props } from '@/src/pages/dashboard/posts';
import NavLinks from '@/src/components/dashboard/posts/NavLinks';
import { Layout, Main, Container, Header, Section } from '@/src/views/dashboard/Layout';

export default function PostsHome({ recentPosts }: Props) {
  return (
    <Layout>
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
    </Layout>
  );
}
