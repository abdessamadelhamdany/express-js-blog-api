import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/src/components/Logo';
import { Wrapper, Header, Section, Menu, MenuItem, MenuItemContent, Footer } from './Navbar.styled';
import { HomeIcon, DocumentTextIcon, UserCircleIcon, AdjustmentsIcon, CogIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <Wrapper>
      <Header>
        <Logo variant="dark" href="/dashboard" />
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
            <Link href="/" passHref>
              <MenuItem className={pathname.startsWith('/dashboard/profile/preferences') ? 'active' : undefined}>
                <MenuItemContent>
                  <CogIcon />
                  <span>Preferences</span>
                </MenuItemContent>
              </MenuItem>
            </Link>
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
