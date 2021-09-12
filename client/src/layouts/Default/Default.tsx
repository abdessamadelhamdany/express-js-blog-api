import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/src/hooks';
import { APP_TITLE } from '@/src/lib/constants';
import { Container } from '@/src/core-ui/layouts';
import { AppWrapper, Navbar } from './Default.styled';
import LogoutLink from '@/src/components/common/LogoutLink';

const Layout: FC = ({ children }) => {
  const { authUser } = useAuth();

  return (
    <AppWrapper>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>

      <Navbar>
        <Container>
          {authUser ? (
            <>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
              <LogoutLink />
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <a>Login</a>
              </Link>

              <Link href="/auth/register">
                <a>Register</a>
              </Link>
            </>
          )}
        </Container>
      </Navbar>

      {children}
    </AppWrapper>
  );
};

export default Layout;
