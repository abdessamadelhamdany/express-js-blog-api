import Link from 'next/link';
import { useRouter } from 'next/router';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuth } from '@/src/hooks';
import Logo from '@/src/components/Logo';
import { Wrapper, Header, Section, Menu, MenuItem, MenuItemContent, Footer } from './Navbar.styled';
import { HomeIcon, DocumentTextIcon, LogoutIcon, UserCircleIcon, AdjustmentsIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const router = useRouter();
  const { setAuthUser } = useAuth();
  const { pathname } = useRouter();

  return (
    <Wrapper>
      <Header>
        <Logo variant="dark" href="/" />
      </Header>

      <Section>
        <Menu>
          <Link href="/dashboard" passHref>
            <MenuItem className={pathname === '/dashboard' ? 'active' : undefined}>
              <MenuItemContent>
                <HomeIcon />
                <span>Home</span>
              </MenuItemContent>
            </MenuItem>
          </Link>

          <Link href="/dashboard/posts" passHref>
            <MenuItem className={pathname.startsWith('/dashboard/posts') ? 'active' : undefined}>
              <MenuItemContent>
                <DocumentTextIcon />
                <span>Posts</span>
              </MenuItemContent>
            </MenuItem>
          </Link>
        </Menu>

        <Footer>
          <Menu>
            <Link href="/" passHref>
              <MenuItem className={pathname.startsWith('/dashboard/profile') ? 'active' : undefined}>
                <MenuItemContent>
                  <UserCircleIcon />
                  <span>Profile</span>
                </MenuItemContent>
              </MenuItem>
            </Link>
            <MenuItem
              href="#"
              className={pathname.startsWith('/dashboard/profile') ? 'active' : undefined}
              onClick={(event) => {
                event.preventDefault();
                axios
                  .post('/api/logout')
                  .then((_: AxiosResponse) => {
                    router.push('/');
                    setAuthUser(null);
                  })
                  .catch((_: AxiosError) => {
                    console.error('Sorry something went wrong!');
                  });
              }}
            >
              <MenuItemContent>
                <LogoutIcon />
                <span>Logout</span>
              </MenuItemContent>
            </MenuItem>
            <Link href="/dashboard/settings" passHref>
              <MenuItem className={pathname.startsWith('/dashboard/settings') ? 'active' : undefined}>
                <MenuItemContent>
                  <AdjustmentsIcon />
                  <span>Project Settings</span>
                </MenuItemContent>
              </MenuItem>
            </Link>
          </Menu>
        </Footer>
      </Section>
    </Wrapper>
  );
};

export default Navbar;
