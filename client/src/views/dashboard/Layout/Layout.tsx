import { FC } from 'react';
import Head from 'next/head';
import { AppWrapper } from './Layout.styled';
import { Navbar } from '@/src/views/dashboard/Layout';

interface Props {
  hasNavbar?: boolean;
}

const Layout: FC<Props> = ({ children, hasNavbar = true }) => {
  return (
    <AppWrapper>
      <Head>
        <title>Dashboard</title>
      </Head>

      {hasNavbar && <Navbar />}

      {children}
    </AppWrapper>
  );
};

export default Layout;
