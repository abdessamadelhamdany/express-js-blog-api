import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/src/hooks';
import { APP_TITLE } from '@/src/lib/constants';
import { Container } from '@/src/core-ui/layouts';
import { AppWrapper, Navbar } from './Default.styled';
import AccountDropdown from '@/src/components/common/AccountDropdown';
import { Flex } from '@/src/core-ui/actions';

const Layout: FC = ({ children }) => {
  const { authUser } = useAuth();

  return (
    <AppWrapper>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>

      <Navbar>
        <Container>
          <Flex>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Flex>
          {authUser ? (
            <>
              <AccountDropdown avatar="/img/users/default/avatar.png" />
            </>
          ) : (
            <Flex>
              <Link href="/auth/login">
                <a>Login</a>
              </Link>

              <Link href="/auth/register">
                <a>Register</a>
              </Link>
            </Flex>
          )}
        </Container>
      </Navbar>

      {children}
    </AppWrapper>
  );
};

export default Layout;
