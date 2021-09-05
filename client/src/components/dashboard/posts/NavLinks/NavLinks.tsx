import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { Wrapper, NavLink, Actions, Action } from './NavLinks.styled';

export default function NavLinks() {
  const { pathname } = useRouter();

  return (
    <Wrapper>
      <Link href="/dashboard/posts" passHref>
        <NavLink className={pathname === '/dashboard/posts' && 'active'}>Overview</NavLink>
      </Link>
      <Link href="/dashboard/posts/all" passHref>
        <NavLink className={pathname.startsWith('/dashboard/posts/all') && 'active'}>All</NavLink>
      </Link>
      <Link href="/dashboard/posts/drafted" passHref>
        <NavLink className={pathname.startsWith('/dashboard/posts/drafted') && 'active'}>Drafted</NavLink>
      </Link>
      <Link href="/dashboard/posts/deleted" passHref>
        <NavLink className={pathname.startsWith('/dashboard/posts/deleted') && 'active'}>Deleted</NavLink>
      </Link>
      <Link href="/dashboard/posts/published" passHref>
        <NavLink className={pathname.startsWith('/dashboard/posts/published') && 'active'}>Published</NavLink>
      </Link>

      <Actions>
        <Link href="/dashboard/posts/new" passHref>
          <Action className={pathname.startsWith('/dashboard/posts/new') && 'active'}>
            <DocumentAddIcon />
          </Action>
        </Link>
      </Actions>
    </Wrapper>
  );
}
