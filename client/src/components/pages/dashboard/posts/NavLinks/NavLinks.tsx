import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { Flex } from '@/src/core-ui/actions';
import { Wrapper, NavLink, Actions, Action } from './NavLinks.styled';

export default function NavLinks() {
  const { pathname } = useRouter();

  return (
    <Wrapper>
      <Flex>
        <Link href="/dashboard/posts" passHref>
          <NavLink className={pathname === '/dashboard/posts' ? 'active' : undefined}>Published</NavLink>
        </Link>
        <Link href="/dashboard/posts/drafted" passHref>
          <NavLink className={pathname.startsWith('/dashboard/posts/drafted') ? 'active' : undefined}>Drafted</NavLink>
        </Link>
        <Link href="/dashboard/posts/deleted" passHref>
          <NavLink className={pathname.startsWith('/dashboard/posts/deleted') ? 'active' : undefined}>Deleted</NavLink>
        </Link>
      </Flex>

      <Actions>
        <Link href="/dashboard/posts/new" passHref>
          <Action className={pathname.startsWith('/dashboard/posts/new') ? 'active' : undefined}>
            <DocumentAddIcon />
          </Action>
        </Link>
      </Actions>
    </Wrapper>
  );
}
