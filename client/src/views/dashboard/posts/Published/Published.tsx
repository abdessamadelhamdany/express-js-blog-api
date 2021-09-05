import NavLinks from '@/src/components/dashboard/posts/NavLinks';
import { Layout, Main, Container, Header, Title, Section } from '@/src/views/dashboard/Layout';

export default function PostsPublished() {
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
            <Title>Published Posts</Title>
          </Container>
        </Section>
      </Main>
    </Layout>
  );
}
