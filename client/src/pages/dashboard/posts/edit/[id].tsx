import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { User } from '@/src/interfaces';
import { DashboardLayout } from '@/src/layouts';
import { initAuth, Protected } from '@/src/hocs';
import NavLinks from '@/src/components/pages/dashboard/posts/NavLinks';
import { Main, Container, Header, Title, Section } from '@/src/core-ui/layouts';

export default function PostsEdit({ user }: { user: User }) {
  const {
    query: { id },
  } = useRouter();

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
              <Title>Posts edit: {id}</Title>;
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
