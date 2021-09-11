import { FC } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import { AppWrapper } from './Dashboard.styled';

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
