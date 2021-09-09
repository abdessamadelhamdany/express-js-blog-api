import { NavLinks } from '@/src/views/dashboard/components/posts';
import { Layout, Main, Container, Header, Title, Section } from '@/src/views/dashboard/Layout';

export default function PostsDrafted() {
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
            <Title>Drafted Posts</Title>
          </Container>
        </Section>
      </Main>
    </Layout>
  );
}
