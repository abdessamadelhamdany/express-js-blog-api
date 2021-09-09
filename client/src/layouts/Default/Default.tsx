import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { APP_TITLE } from '@/src/lib/constants';
import { AppWrapper, Navbar } from './Default.styled';
import { Container } from '@/src/views/dashboard/Layout/Layout.styled';

const Layout: FC = ({ children }) => {
  return (
    <AppWrapper>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>

      <Navbar>
        <Container>
          <Link href="/auth/login">
            <a>Login</a>
          </Link>
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </Container>
      </Navbar>

      {children}
    </AppWrapper>
  );
};

export default Layout;
