import { GetServerSideProps } from 'next';
import { DashboardLayout } from '@/src/layouts';
import NavLinks from '@/src/components/pages/dashboard/posts/NavLinks';
import { Main, Container, Header, Title, Section } from '@/src/core-ui/layouts';

export default function PostsDrafted() {
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
            <Title>Drafted Posts</Title>
          </Container>
        </Section>
      </Main>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};
