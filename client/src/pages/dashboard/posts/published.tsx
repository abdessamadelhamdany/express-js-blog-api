import { GetServerSideProps } from 'next';
import { User } from '@/src/interfaces';
import { DashboardLayout } from '@/src/layouts';
import { initAuth, Protected } from '@/src/hocs';
import NavLinks from '@/src/components/pages/dashboard/posts/NavLinks';
import { Main, Container, Header, Title, Section } from '@/src/core-ui/layouts';

export default function PostsPublished({ user }: { user: User }) {
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
              <Title>Published Posts</Title>
            </Container>
          </Section>
        </Main>
      </DashboardLayout>
    </Protected>
  );
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { user, redirect } = await initAuth(context.req.cookies.token);

  return redirect
    ? {
        redirect,
      }
    : {
        props: { user },
      };
};
